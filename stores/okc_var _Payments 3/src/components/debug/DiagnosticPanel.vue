<template>
  <div class="diagnostic-panel" :class="{ 'minimized': isMinimized }">
    <!-- 🎛️ CONTROLES DO PAINEL -->
    <div class="panel-header" @click="toggleMinimized">
      <h3>🔧 Diagnóstico UTM</h3>
      <button class="minimize-btn">{{ isMinimized ? '▲' : '▼' }}</button>
    </div>

    <!-- 📊 CONTEÚDO DO PAINEL -->
    <div v-if="!isMinimized" class="panel-content">
      
      <!-- 🎯 TESTES RÁPIDOS -->
      <div class="quick-tests">
        <h4>🎯 Testes Rápidos</h4>
        <div class="test-buttons">
          <button @click="testUTMCapture" class="test-btn">
            🎯 Testar UTM
          </button>
          <button @click="runFullDiagnostic" class="test-btn">
            🔧 Diagnóstico Completo
          </button>
          <button @click="testEnvironment" class="test-btn">
            🌐 Testar Ambiente
          </button>
          <button @click="clearResults" class="test-btn clear">
            🗑️ Limpar
          </button>
        </div>
      </div>

      <!-- 📋 STATUS ATUAL -->
      <div class="current-status">
        <h4>📋 Status Atual</h4>
        <div class="status-grid">
          <div class="status-item" :class="utmStatus.class">
            <span class="status-icon">🎯</span>
            <span class="status-text">UTM: {{ utmStatus.text }}</span>
          </div>
          <div class="status-item" :class="environmentStatus.class">
            <span class="status-icon">🌐</span>
            <span class="status-text">Ambiente: {{ environmentStatus.text }}</span>
          </div>
          <div class="status-item" :class="storageStatus.class">
            <span class="status-icon">💾</span>
            <span class="status-text">Storage: {{ storageStatus.text }}</span>
          </div>
        </div>
      </div>

      <!-- 🎯 PARÂMETROS UTM ATUAIS -->
      <div v-if="currentUTMs" class="current-utms">
        <h4>🎯 UTMs Detectados</h4>
        <div class="utm-list">
          <div v-for="(value, key) in currentUTMs" :key="key" class="utm-item">
            <strong>{{ key }}:</strong> {{ value || 'N/A' }}
          </div>
        </div>
      </div>

      <!-- ⚠️ PROBLEMAS ENCONTRADOS -->
      <div v-if="issues.length > 0" class="issues-section">
        <h4>⚠️ Problemas Encontrados</h4>
        <div class="issues-list">
          <div 
            v-for="(issue, index) in issues" 
            :key="index" 
            class="issue-item"
            :class="issue.severity"
          >
            <div class="issue-header">
              <span class="issue-icon">
                {{ issue.severity === 'critical' ? '🚨' : 
                   issue.severity === 'error' ? '❌' : '⚠️' }}
              </span>
              <span class="issue-message">{{ issue.message }}</span>
            </div>
            <div v-if="issue.fix" class="issue-fix">
              💡 <strong>Solução:</strong> {{ issue.fix }}
            </div>
          </div>
        </div>
      </div>

      <!-- 🔧 CORREÇÕES SUGERIDAS -->
      <div v-if="fixes.length > 0" class="fixes-section">
        <h4>🔧 Correções Sugeridas</h4>
        <div class="fixes-list">
          <div v-for="(fix, index) in fixes" :key="index" class="fix-item">
            <h5>{{ fix.message }}</h5>
            <ul v-if="fix.steps">
              <li v-for="(step, stepIndex) in fix.steps" :key="stepIndex">
                {{ step }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 📊 RELATÓRIO DETALHADO -->
      <div v-if="diagnosticReport" class="detailed-report">
        <h4>📊 Relatório Detalhado</h4>
        <button @click="showDetailedReport = !showDetailedReport" class="toggle-btn">
          {{ showDetailedReport ? 'Ocultar' : 'Mostrar' }} Detalhes
        </button>
        
        <div v-if="showDetailedReport" class="report-content">
          <pre>{{ JSON.stringify(diagnosticReport, null, 2) }}</pre>
        </div>
      </div>

      <!-- 🎮 SIMULADOR DE UTM -->
      <div class="utm-simulator">
        <h4>🎮 Simulador de UTM</h4>
        <div class="simulator-controls">
          <input 
            v-model="simulatedUTM.source" 
            placeholder="utm_source" 
            class="utm-input"
          >
          <input 
            v-model="simulatedUTM.medium" 
            placeholder="utm_medium" 
            class="utm-input"
          >
          <input 
            v-model="simulatedUTM.campaign" 
            placeholder="utm_campaign" 
            class="utm-input"
          >
          <button @click="simulateUTM" class="test-btn">
            🎮 Simular UTM
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import HostingDiagnostics, { runQuickDiagnostic, testUTMOnly } from '@/utils/diagnostics.js'
import { useUTM } from '@/composables/useUTM.js'

export default {
  name: 'DiagnosticPanel',
  props: {
    showByDefault: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    // 🎛️ ESTADO DO PAINEL
    const isMinimized = ref(!props.showByDefault)
    const showDetailedReport = ref(false)
    
    // 📊 DADOS DE DIAGNÓSTICO
    const diagnosticReport = ref(null)
    const currentUTMs = ref(null)
    const issues = ref([])
    const fixes = ref([])
    
    // 🎮 SIMULADOR
    const simulatedUTM = reactive({
      source: 'facebook',
      medium: 'social',
      campaign: 'teste_hostinger'
    })

    // 🔧 INTEGRAÇÃO COM COMPOSABLE
    const { utmParams, hasValidUTMs, isLoading, loadingError } = useUTM()

    // 📊 STATUS COMPUTADOS
    const utmStatus = computed(() => {
      if (isLoading.value) {
        return { class: 'loading', text: 'Carregando...' }
      }
      
      if (loadingError.value) {
        return { class: 'error', text: 'Erro ao carregar' }
      }
      
      if (hasValidUTMs.value) {
        return { class: 'success', text: 'Detectados' }
      }
      
      return { class: 'warning', text: 'Não encontrados' }
    })

    const environmentStatus = computed(() => {
      const isLocalhost = window.location.hostname.includes('localhost')
      const isHTTPS = window.location.protocol === 'https:'
      
      if (isLocalhost) {
        return { class: 'info', text: 'Desenvolvimento' }
      }
      
      if (isHTTPS) {
        return { class: 'success', text: 'Produção (HTTPS)' }
      }
      
      return { class: 'warning', text: 'Produção (HTTP)' }
    })

    const storageStatus = computed(() => {
      try {
        localStorage.setItem('test', 'test')
        localStorage.removeItem('test')
        return { class: 'success', text: 'Funcionando' }
      } catch (error) {
        return { class: 'error', text: 'Indisponível' }
      }
    })

    // 🎯 MÉTODOS DE TESTE
    const testUTMCapture = async () => {
      console.log('🎯 Testando captura de UTM...')
      
      try {
        const utms = testUTMOnly()
        currentUTMs.value = utms || utmParams.value
        
        // Verificar se há UTMs válidos
        const hasUTMs = Object.values(currentUTMs.value || {}).some(value => value)
        
        if (!hasUTMs) {
          issues.value.push({
            severity: 'warning',
            message: 'Nenhum parâmetro UTM encontrado na URL atual',
            fix: 'Adicione parâmetros UTM à URL ou use o simulador'
          })
        } else {
          // Limpar issues relacionados a UTM
          issues.value = issues.value.filter(issue => issue.type !== 'utm')
        }
        
      } catch (error) {
        console.error('Erro no teste de UTM:', error)
        issues.value.push({
          severity: 'error',
          message: `Erro ao testar UTM: ${error.message}`,
          fix: 'Verificar console do navegador para mais detalhes'
        })
      }
    }

    const runFullDiagnostic = async () => {
      console.log('🔧 Executando diagnóstico completo...')
      
      try {
        const report = await runQuickDiagnostic()
        diagnosticReport.value = report
        
        // Extrair issues e fixes do relatório
        issues.value = report.issues || []
        fixes.value = report.fixes || []
        
        // Atualizar UTMs atuais
        if (report.utmCapture) {
          currentUTMs.value = report.utmCapture.urlSearchParams?.result || 
                             report.utmCapture.regexFallback?.result || 
                             null
        }
        
      } catch (error) {
        console.error('Erro no diagnóstico completo:', error)
        issues.value.push({
          severity: 'error',
          message: `Erro no diagnóstico: ${error.message}`,
          fix: 'Tentar novamente ou verificar console'
        })
      }
    }

    const testEnvironment = () => {
      console.log('🌐 Testando ambiente...')
      
      const envInfo = {
        hostname: window.location.hostname,
        protocol: window.location.protocol,
        userAgent: navigator.userAgent,
        isLocalhost: window.location.hostname.includes('localhost'),
        localStorage: !!window.localStorage,
        sessionStorage: !!window.sessionStorage,
        fetch: !!window.fetch,
        URLSearchParams: !!window.URLSearchParams
      }
      
      console.log('Informações do ambiente:', envInfo)
      
      // Verificar problemas comuns
      if (!envInfo.localStorage) {
        issues.value.push({
          severity: 'error',
          message: 'localStorage não está disponível',
          fix: 'Verificar configurações do navegador ou usar fallbacks'
        })
      }
      
      if (!envInfo.URLSearchParams) {
        issues.value.push({
          severity: 'error',
          message: 'URLSearchParams não está disponível',
          fix: 'Usar polyfill ou método alternativo de parsing'
        })
      }
    }

    const simulateUTM = () => {
      console.log('🎮 Simulando UTM...')
      
      // Construir URL com UTMs simulados
      const params = new URLSearchParams()
      if (simulatedUTM.source) params.set('utm_source', simulatedUTM.source)
      if (simulatedUTM.medium) params.set('utm_medium', simulatedUTM.medium)
      if (simulatedUTM.campaign) params.set('utm_campaign', simulatedUTM.campaign)
      
      const newURL = `${window.location.pathname}?${params.toString()}`
      
      // Atualizar URL sem recarregar a página
      window.history.pushState({}, '', newURL)
      
      // Simular UTMs capturados
      currentUTMs.value = {
        utm_source: simulatedUTM.source,
        utm_medium: simulatedUTM.medium,
        utm_campaign: simulatedUTM.campaign,
        utm_content: null,
        utm_term: null
      }
      
      console.log('UTMs simulados:', currentUTMs.value)
    }

    const clearResults = () => {
      diagnosticReport.value = null
      currentUTMs.value = null
      issues.value = []
      fixes.value = []
      showDetailedReport.value = false
    }

    const toggleMinimized = () => {
      isMinimized.value = !isMinimized.value
    }

    // 🚀 INICIALIZAÇÃO
    onMounted(() => {
      // Capturar UTMs atuais na inicialização
      testUTMCapture()
    })

    return {
      // Estado
      isMinimized,
      showDetailedReport,
      diagnosticReport,
      currentUTMs,
      issues,
      fixes,
      simulatedUTM,
      
      // Status computados
      utmStatus,
      environmentStatus,
      storageStatus,
      
      // Métodos
      testUTMCapture,
      runFullDiagnostic,
      testEnvironment,
      simulateUTM,
      clearResults,
      toggleMinimized
    }
  }
}
</script>

<style scoped>
.diagnostic-panel {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 400px;
  max-height: 80vh;
  background: #1a1a1a;
  border: 2px solid #333;
  border-radius: 12px;
  color: #fff;
  font-family: 'Courier New', monospace;
  z-index: 9999;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: all 0.3s ease;
}

.diagnostic-panel.minimized {
  height: 60px;
}

.panel-header {
  background: #2d2d2d;
  padding: 12px 16px;
  border-bottom: 1px solid #444;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}

.panel-header h3 {
  margin: 0;
  font-size: 16px;
  color: #00ff88;
}

.minimize-btn {
  background: none;
  border: none;
  color: #ccc;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
}

.minimize-btn:hover {
  background: #444;
  color: #fff;
}

.panel-content {
  padding: 16px;
  max-height: calc(80vh - 60px);
  overflow-y: auto;
}

.panel-content h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #00ff88;
  border-bottom: 1px solid #333;
  padding-bottom: 4px;
}

/* 🎯 TESTES RÁPIDOS */
.quick-tests {
  margin-bottom: 20px;
}

.test-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.test-btn {
  background: #333;
  border: 1px solid #555;
  color: #fff;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
}

.test-btn:hover {
  background: #444;
  border-color: #00ff88;
}

.test-btn.clear {
  background: #660000;
  border-color: #880000;
}

.test-btn.clear:hover {
  background: #880000;
}

/* 📊 STATUS */
.current-status {
  margin-bottom: 20px;
}

.status-grid {
  display: grid;
  gap: 8px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 6px;
  font-size: 12px;
}

.status-item.success {
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
}

.status-item.warning {
  background: rgba(255, 193, 7, 0.1);
  border: 1px solid rgba(255, 193, 7, 0.3);
}

.status-item.error {
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.3);
}

.status-item.info {
  background: rgba(13, 202, 240, 0.1);
  border: 1px solid rgba(13, 202, 240, 0.3);
}

.status-item.loading {
  background: rgba(108, 117, 125, 0.1);
  border: 1px solid rgba(108, 117, 125, 0.3);
}

/* 🎯 UTMs */
.current-utms {
  margin-bottom: 20px;
}

.utm-list {
  background: #2d2d2d;
  border-radius: 6px;
  padding: 12px;
}

.utm-item {
  font-size: 12px;
  margin-bottom: 4px;
  color: #ccc;
}

.utm-item strong {
  color: #00ff88;
}

/* ⚠️ PROBLEMAS */
.issues-section {
  margin-bottom: 20px;
}

.issues-list {
  display: grid;
  gap: 8px;
}

.issue-item {
  padding: 12px;
  border-radius: 6px;
  border-left: 4px solid;
}

.issue-item.critical {
  background: rgba(220, 53, 69, 0.1);
  border-left-color: #dc3545;
}

.issue-item.error {
  background: rgba(255, 107, 107, 0.1);
  border-left-color: #ff6b6b;
}

.issue-item.warning {
  background: rgba(255, 193, 7, 0.1);
  border-left-color: #ffc107;
}

.issue-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  font-size: 12px;
}

.issue-fix {
  margin-top: 8px;
  font-size: 11px;
  color: #ccc;
  padding-left: 20px;
}

/* 🔧 CORREÇÕES */
.fixes-section {
  margin-bottom: 20px;
}

.fix-item {
  background: #2d2d2d;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 8px;
}

.fix-item h5 {
  margin: 0 0 8px 0;
  color: #00ff88;
  font-size: 12px;
}

.fix-item ul {
  margin: 0;
  padding-left: 16px;
  font-size: 11px;
  color: #ccc;
}

/* 📊 RELATÓRIO */
.detailed-report {
  margin-bottom: 20px;
}

.toggle-btn {
  background: #444;
  border: 1px solid #666;
  color: #fff;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
  margin-bottom: 12px;
}

.report-content {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 6px;
  padding: 12px;
  max-height: 200px;
  overflow: auto;
}

.report-content pre {
  margin: 0;
  font-size: 10px;
  color: #ccc;
  white-space: pre-wrap;
}

/* 🎮 SIMULADOR */
.utm-simulator {
  margin-bottom: 20px;
}

.simulator-controls {
  display: grid;
  gap: 8px;
}

.utm-input {
  background: #2d2d2d;
  border: 1px solid #555;
  color: #fff;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
}

.utm-input:focus {
  outline: none;
  border-color: #00ff88;
}

/* 📱 RESPONSIVO */
@media (max-width: 480px) {
  .diagnostic-panel {
    width: calc(100vw - 40px);
    right: 20px;
    left: 20px;
  }
  
  .test-buttons {
    grid-template-columns: 1fr;
  }
}

/* 🎨 SCROLLBAR */
.panel-content::-webkit-scrollbar {
  width: 6px;
}

.panel-content::-webkit-scrollbar-track {
  background: #2d2d2d;
}

.panel-content::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 3px;
}

.panel-content::-webkit-scrollbar-thumb:hover {
  background: #777;
}
</style> 