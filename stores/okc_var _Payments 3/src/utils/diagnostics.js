// 🔧 UTILITÁRIO DE DIAGNÓSTICO PARA HOSPEDAGEM COMPARTILHADA
// Este arquivo ajuda a identificar e resolver problemas específicos

import HostingerConfig from '@/config/hostinger.js'

export class HostingDiagnostics {
  constructor() {
    this.results = {}
    this.issues = []
    this.fixes = []
  }

  // 🎯 EXECUTAR DIAGNÓSTICO COMPLETO
  async runFullDiagnostic() {
    console.log('🔧 Iniciando diagnóstico completo...')
    
    // Testes básicos
    this.testEnvironment()
    this.testBrowserAPIs()
    this.testUTMCapture()
    this.testLocalStorage()
    this.testNetworking()
    
    // Testes específicos da Hostinger
    if (HostingerConfig.utils.isHostinger()) {
      this.testHostingerSpecific()
    }
    
    // Compilar relatório
    this.compileReport()
    
    return this.getReport()
  }

  // 🌐 TESTAR AMBIENTE
  testEnvironment() {
    console.log('🌐 Testando ambiente...')
    
    this.results.environment = {
      hostname: window.location.hostname,
      protocol: window.location.protocol,
      userAgent: navigator.userAgent,
      isLocalhost: window.location.hostname.includes('localhost'),
      isHostinger: HostingerConfig.utils.isHostinger(),
      timestamp: new Date().toISOString()
    }

    // Verificar se está em HTTPS
    if (window.location.protocol !== 'https:' && !this.results.environment.isLocalhost) {
      this.issues.push({
        type: 'security',
        message: 'Site não está usando HTTPS',
        severity: 'warning',
        fix: 'Configurar SSL/TLS no painel da Hostinger'
      })
    }
  }

  // 🔧 TESTAR APIs DO BROWSER
  testBrowserAPIs() {
    console.log('🔧 Testando APIs do browser...')
    
    this.results.browserAPIs = {
      localStorage: this.testAPI(() => {
        localStorage.setItem('test', 'test')
        localStorage.removeItem('test')
        return true
      }),
      
      sessionStorage: this.testAPI(() => {
        sessionStorage.setItem('test', 'test')
        sessionStorage.removeItem('test')
        return true
      }),
      
      urlSearchParams: this.testAPI(() => {
        new URLSearchParams('test=1')
        return true
      }),
      
      fetch: this.testAPI(() => {
        return typeof fetch !== 'undefined'
      }),
      
      console: this.testAPI(() => {
        console.log()
        return true
      }),
      
      json: this.testAPI(() => {
        JSON.parse('{"test": true}')
        JSON.stringify({test: true})
        return true
      })
    }

    // Verificar problemas
    Object.entries(this.results.browserAPIs).forEach(([api, result]) => {
      if (!result.success) {
        this.issues.push({
          type: 'api',
          message: `API ${api} não está funcionando`,
          severity: 'error',
          details: result.error,
          fix: `Usar fallback para ${api}`
        })
      }
    })
  }

  // 🎯 TESTAR CAPTURA DE UTM
  testUTMCapture() {
    console.log('🎯 Testando captura de UTM...')
    
    // Testar com URL de exemplo
    const testURL = '?utm_source=test&utm_medium=diagnostic&utm_campaign=hostinger_test'
    
    this.results.utmCapture = {
      currentURL: window.location.href,
      hasUTMParams: window.location.search.includes('utm_'),
      
      // Teste com URLSearchParams
      urlSearchParams: this.testAPI(() => {
        const params = new URLSearchParams(testURL)
        return {
          utm_source: params.get('utm_source'),
          utm_medium: params.get('utm_medium'),
          utm_campaign: params.get('utm_campaign')
        }
      }),
      
      // Teste com regex fallback
      regexFallback: this.testAPI(() => {
        const regex = /[?&](utm_[^=]+)=([^&]*)/g
        const utms = {}
        let match
        
        while ((match = regex.exec(testURL)) !== null) {
          utms[match[1]] = decodeURIComponent(match[2])
        }
        
        return utms
      })
    }

    // Verificar se pelo menos um método funciona
    if (!this.results.utmCapture.urlSearchParams.success && 
        !this.results.utmCapture.regexFallback.success) {
      this.issues.push({
        type: 'utm',
        message: 'Nenhum método de captura de UTM está funcionando',
        severity: 'critical',
        fix: 'Implementar método alternativo de captura'
      })
    }
  }

  // 💾 TESTAR LOCALSTORAGE
  testLocalStorage() {
    console.log('💾 Testando localStorage...')
    
    this.results.localStorage = {
      available: this.testAPI(() => 'localStorage' in window),
      
      write: this.testAPI(() => {
        localStorage.setItem('diagnostic_test', 'test_value')
        return true
      }),
      
      read: this.testAPI(() => {
        const value = localStorage.getItem('diagnostic_test')
        return value === 'test_value'
      }),
      
      delete: this.testAPI(() => {
        localStorage.removeItem('diagnostic_test')
        return localStorage.getItem('diagnostic_test') === null
      }),
      
      quota: this.testAPI(() => {
        // Tentar estimar quota do localStorage
        let data = ''
        let i = 0
        
        try {
          for (i = 0; i < 1000; i++) {
            data += '0123456789'
            localStorage.setItem('quota_test', data)
          }
        } catch (e) {
          localStorage.removeItem('quota_test')
          return `Aproximadamente ${i * 10} bytes`
        }
        
        localStorage.removeItem('quota_test')
        return 'Mais de 10KB disponível'
      })
    }

    // Verificar problemas com localStorage
    if (!this.results.localStorage.available.success) {
      this.issues.push({
        type: 'storage',
        message: 'localStorage não está disponível',
        severity: 'error',
        fix: 'Usar fallback com variáveis globais'
      })
    }
  }

  // 🌐 TESTAR CONECTIVIDADE
  testNetworking() {
    console.log('🌐 Testando conectividade...')
    
    this.results.networking = {
      online: navigator.onLine,
      
      // Testar se consegue fazer requests
      fetch: this.testAPI(async () => {
        if (typeof fetch === 'undefined') return false
        
        // Tentar fazer request para o próprio domínio
        const response = await fetch(window.location.origin, {
          method: 'HEAD',
          mode: 'no-cors'
        })
        
        return true
      }),
      
      // Verificar se scripts externos carregam
      externalScripts: this.testAPI(() => {
        const scripts = document.querySelectorAll('script[src]')
        return scripts.length > 0
      })
    }
  }

  // 🏠 TESTES ESPECÍFICOS DA HOSTINGER
  testHostingerSpecific() {
    console.log('🏠 Testando específicos da Hostinger...')
    
    this.results.hostinger = {
      detected: true,
      
      // Verificar limitações conhecidas
      phpSession: this.testAPI(() => {
        // Verificar se há cookies de sessão PHP
        return document.cookie.includes('PHPSESSID')
      }),
      
      // Verificar se há headers específicos
      serverHeaders: this.testAPI(() => {
        // Tentar detectar servidor via erro 404
        return fetch('/nonexistent-page-test-404')
          .then(response => response.text())
          .then(text => text.includes('hostinger') || text.includes('000webhost'))
          .catch(() => false)
      }),
      
      // Verificar limitações de recursos
      resourceLimits: this.testAPI(() => {
        const start = performance.now()
        
        // Tentar operação intensiva
        for (let i = 0; i < 100000; i++) {
          Math.random()
        }
        
        const duration = performance.now() - start
        return duration < 1000 // Deve completar em menos de 1 segundo
      })
    }

    // Adicionar recomendações específicas da Hostinger
    this.fixes.push({
      type: 'hostinger',
      message: 'Configurações recomendadas para Hostinger',
      steps: [
        'Ativar compressão GZIP no painel',
        'Configurar cache do browser',
        'Otimizar imagens para web',
        'Usar CDN se possível',
        'Minimizar uso de localStorage'
      ]
    })
  }

  // 🔧 TESTAR API INDIVIDUAL
  testAPI(testFunction) {
    try {
      const result = testFunction()
      
      // Se retornar uma Promise, aguardar
      if (result instanceof Promise) {
        return result
          .then(res => ({ success: true, result: res }))
          .catch(error => ({ success: false, error: error.message }))
      }
      
      return { success: true, result }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // 📊 COMPILAR RELATÓRIO
  compileReport() {
    console.log('📊 Compilando relatório...')
    
    // Contar problemas por severidade
    const issueCounts = {
      critical: this.issues.filter(i => i.severity === 'critical').length,
      error: this.issues.filter(i => i.severity === 'error').length,
      warning: this.issues.filter(i => i.severity === 'warning').length
    }

    // Determinar status geral
    let overallStatus = 'healthy'
    if (issueCounts.critical > 0) {
      overallStatus = 'critical'
    } else if (issueCounts.error > 0) {
      overallStatus = 'problematic'
    } else if (issueCounts.warning > 0) {
      overallStatus = 'needs_attention'
    }

    this.results.summary = {
      overallStatus,
      issueCounts,
      totalIssues: this.issues.length,
      totalFixes: this.fixes.length,
      timestamp: new Date().toISOString()
    }
  }

  // 📋 OBTER RELATÓRIO COMPLETO
  getReport() {
    return {
      summary: this.results.summary,
      environment: this.results.environment,
      browserAPIs: this.results.browserAPIs,
      utmCapture: this.results.utmCapture,
      localStorage: this.results.localStorage,
      networking: this.results.networking,
      hostinger: this.results.hostinger,
      issues: this.issues,
      fixes: this.fixes,
      generatedAt: new Date().toISOString()
    }
  }

  // 🖨️ IMPRIMIR RELATÓRIO NO CONSOLE
  printReport() {
    const report = this.getReport()
    
    console.group('🔧 RELATÓRIO DE DIAGNÓSTICO')
    
    console.log('📊 Status Geral:', report.summary.overallStatus)
    console.log('🌐 Ambiente:', report.environment)
    console.log('🔧 APIs do Browser:', report.browserAPIs)
    console.log('🎯 Captura UTM:', report.utmCapture)
    console.log('💾 LocalStorage:', report.localStorage)
    console.log('🌐 Rede:', report.networking)
    
    if (report.hostinger) {
      console.log('🏠 Hostinger:', report.hostinger)
    }
    
    if (report.issues.length > 0) {
      console.group('⚠️ PROBLEMAS ENCONTRADOS')
      report.issues.forEach(issue => {
        console.warn(`[${issue.severity.toUpperCase()}] ${issue.message}`)
        if (issue.fix) {
          console.log(`   💡 Solução: ${issue.fix}`)
        }
      })
      console.groupEnd()
    }
    
    if (report.fixes.length > 0) {
      console.group('🔧 CORREÇÕES RECOMENDADAS')
      report.fixes.forEach(fix => {
        console.log(`${fix.message}:`)
        if (fix.steps) {
          fix.steps.forEach(step => console.log(`  • ${step}`))
        }
      })
      console.groupEnd()
    }
    
    console.groupEnd()
    
    return report
  }
}

// 🎯 FUNÇÃO UTILITÁRIA PARA EXECUTAR DIAGNÓSTICO RÁPIDO
export const runQuickDiagnostic = async () => {
  const diagnostics = new HostingDiagnostics()
  const report = await diagnostics.runFullDiagnostic()
  diagnostics.printReport()
  
  // Adicionar ao window para acesso global
  window._diagnosticReport = report
  
  return report
}

// 🎯 FUNÇÃO PARA TESTAR APENAS UTMs
export const testUTMOnly = () => {
  console.log('🎯 Teste rápido de UTM...')
  
  const currentURL = window.location.href
  const hasUTMs = currentURL.includes('utm_')
  
  console.log('URL atual:', currentURL)
  console.log('Tem UTMs:', hasUTMs)
  
  if (hasUTMs) {
    // Testar captura
    try {
      const params = new URLSearchParams(window.location.search)
      const utms = {
        utm_source: params.get('utm_source'),
        utm_medium: params.get('utm_medium'),
        utm_campaign: params.get('utm_campaign'),
        utm_content: params.get('utm_content'),
        utm_term: params.get('utm_term')
      }
      
      console.log('UTMs capturados:', utms)
      return utms
    } catch (error) {
      console.error('Erro ao capturar UTMs:', error)
      return null
    }
  }
  
  return null
}

export default HostingDiagnostics 