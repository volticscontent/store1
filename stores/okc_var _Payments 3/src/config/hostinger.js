// 🌐 CONFIGURAÇÃO ESPECÍFICA PARA HOSPEDAGEM COMPARTILHADA HOSTINGER
// Este arquivo contém workarounds e fallbacks para limitações comuns

export const HostingerConfig = {
  // 🎯 CONFIGURAÇÕES DE AMBIENTE
  environment: {
    isSharedHosting: true,
    provider: 'hostinger',
    limitations: [
      'localStorage pode ser limitado',
      'console.log pode ser desabilitado',
      'Alguns APIs podem não estar disponíveis',
      'Timeouts mais restritivos'
    ]
  },

  // 🎯 TIMEOUTS OTIMIZADOS PARA HOSPEDAGEM COMPARTILHADA
  timeouts: {
    utmLoad: 3000,        // 3 segundos para carregar UTMs
    fallback: 5000,       // 5 segundos para ativar fallback
    retry: 1000,          // 1 segundo entre tentativas
    maxRetries: 3         // Máximo 3 tentativas
  },

  // 🎯 FALLBACKS PARA APIs LIMITADAS
  fallbacks: {
    // Fallback para localStorage
    storage: {
      setItem: (key, value) => {
        try {
          localStorage.setItem(key, value)
          return true
        } catch (error) {
          console.warn('⚠️ localStorage não disponível, usando variável global')
          window[`_storage_${key}`] = value
          return false
        }
      },
      
      getItem: (key) => {
        try {
          return localStorage.getItem(key)
        } catch (error) {
          console.warn('⚠️ localStorage não disponível, usando variável global')
          return window[`_storage_${key}`] || null
        }
      },
      
      removeItem: (key) => {
        try {
          localStorage.removeItem(key)
        } catch (error) {
          delete window[`_storage_${key}`]
        }
      }
    },

    // Fallback para console (caso seja desabilitado)
    console: {
      log: (...args) => {
        try {
          console.log(...args)
        } catch (error) {
          // Silenciar se console não estiver disponível
        }
      },
      
      warn: (...args) => {
        try {
          console.warn(...args)
        } catch (error) {
          // Silenciar se console não estiver disponível
        }
      },
      
      error: (...args) => {
        try {
          console.error(...args)
        } catch (error) {
          // Silenciar se console não estiver disponível
        }
      }
    },

    // Fallback para URLSearchParams
    urlParams: {
      parse: (url) => {
        try {
          return new URLSearchParams(url)
        } catch (error) {
          // Usar regex como fallback
          const params = {}
          const regex = /[?&]([^=]+)=([^&]*)/g
          let match
          
          while ((match = regex.exec(url)) !== null) {
            params[decodeURIComponent(match[1])] = decodeURIComponent(match[2])
          }
          
          return {
            get: (key) => params[key] || null,
            has: (key) => key in params,
            entries: () => Object.entries(params)
          }
        }
      }
    }
  },

  // 🎯 VERIFICAÇÕES DE COMPATIBILIDADE
  compatibility: {
    // Verificar se localStorage funciona
    checkLocalStorage: () => {
      try {
        const testKey = '__hostinger_test__'
        localStorage.setItem(testKey, 'test')
        localStorage.removeItem(testKey)
        return true
      } catch (error) {
        return false
      }
    },

    // Verificar se URLSearchParams funciona
    checkURLSearchParams: () => {
      try {
        new URLSearchParams('test=1')
        return true
      } catch (error) {
        return false
      }
    },

    // Verificar se console funciona
    checkConsole: () => {
      try {
        console.log()
        return true
      } catch (error) {
        return false
      }
    },

    // Verificar se fetch funciona
    checkFetch: () => {
      return typeof fetch !== 'undefined'
    },

    // Verificar limitações gerais
    checkAll: () => {
      return {
        localStorage: HostingerConfig.compatibility.checkLocalStorage(),
        urlSearchParams: HostingerConfig.compatibility.checkURLSearchParams(),
        console: HostingerConfig.compatibility.checkConsole(),
        fetch: HostingerConfig.compatibility.checkFetch(),
        timestamp: new Date().toISOString()
      }
    }
  },

  // 🎯 UTILITÁRIOS ESPECÍFICOS
  utils: {
    // Executar função com fallback seguro
    safeExecute: (fn, fallback = null, context = 'unknown') => {
      try {
        return fn()
      } catch (error) {
        HostingerConfig.fallbacks.console.warn(`⚠️ Erro em ${context}:`, error.message)
        return fallback
      }
    },

    // Aguardar com timeout
    waitFor: (condition, timeout = 5000, interval = 100) => {
      return new Promise((resolve, reject) => {
        const startTime = Date.now()
        
        const check = () => {
          if (condition()) {
            resolve(true)
          } else if (Date.now() - startTime > timeout) {
            reject(new Error('Timeout aguardando condição'))
          } else {
            setTimeout(check, interval)
          }
        }
        
        check()
      })
    },

    // Detectar se está na Hostinger
    isHostinger: () => {
      const hostname = window.location.hostname || ''
      return hostname.includes('.hostinger') || 
             hostname.includes('.000webhostapp.com') ||
             hostname.includes('.hostingerapp.com')
    },

    // Obter informações do ambiente
    getEnvironmentInfo: () => {
      return {
        hostname: window.location.hostname,
        userAgent: navigator.userAgent,
        isHostinger: HostingerConfig.utils.isHostinger(),
        compatibility: HostingerConfig.compatibility.checkAll(),
        timestamp: new Date().toISOString()
      }
    }
  },

  // 🎯 CONFIGURAÇÕES DE DEBUG PARA PRODUÇÃO
  debug: {
    enabled: false, // Desabilitado por padrão em produção
    
    enable: () => {
      HostingerConfig.debug.enabled = true
      HostingerConfig.fallbacks.console.log('🔧 Debug habilitado para Hostinger')
    },
    
    log: (...args) => {
      if (HostingerConfig.debug.enabled) {
        HostingerConfig.fallbacks.console.log('[HOSTINGER DEBUG]', ...args)
      }
    },
    
    warn: (...args) => {
      if (HostingerConfig.debug.enabled) {
        HostingerConfig.fallbacks.console.warn('[HOSTINGER DEBUG]', ...args)
      }
    },
    
    getReport: () => {
      return {
        environment: HostingerConfig.utils.getEnvironmentInfo(),
        config: {
          timeouts: HostingerConfig.timeouts,
          debugEnabled: HostingerConfig.debug.enabled
        },
        timestamp: new Date().toISOString()
      }
    }
  }
}

// 🎯 INICIALIZAÇÃO AUTOMÁTICA
if (typeof window !== 'undefined') {
  // Verificar se está na Hostinger e configurar automaticamente
  if (HostingerConfig.utils.isHostinger()) {
    HostingerConfig.fallbacks.console.log('🌐 Hostinger detectado, aplicando configurações específicas...')
    
    // Substituir console se necessário
    if (!HostingerConfig.compatibility.checkConsole()) {
      window.console = HostingerConfig.fallbacks.console
    }
    
    // Adicionar informações globais
    window._hostingerConfig = HostingerConfig
    
    HostingerConfig.fallbacks.console.log('✅ Configurações Hostinger aplicadas')
  }
}

export default HostingerConfig 