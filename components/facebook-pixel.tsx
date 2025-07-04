'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    fbq: any
    _fbq: any
    __fbPixelInitialized: boolean
  }
}

interface FacebookPixelProps {
  pixelId: string
  accessToken?: string
}

export default function FacebookPixel({ pixelId, accessToken }: FacebookPixelProps) {
  useEffect(() => {
    // Verificar se o pixel já foi inicializado globalmente
    if (window.__fbPixelInitialized || window.fbq) {
      console.log('Facebook Pixel já foi inicializado, pulando...')
      return
    }

    // Marcar como inicializado para evitar múltiplas execuções
    window.__fbPixelInitialized = true

    // Configurar o Facebook Pixel
    const fbq: any = function(...args: any[]) {
      if (fbq.callMethod) {
        fbq.callMethod.apply(fbq, args)
      } else {
        fbq.queue.push(args)
      }
    }

    if (!window.fbq) {
      window.fbq = fbq
    }

    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = [] as any[]
    fbq.callMethod = null

    // Verificar se o script já existe
    const existingScript = document.querySelector('script[src*="fbevents.js"]')
    if (existingScript) {
      console.log('Script do Facebook Pixel já existe, apenas inicializando...')
      
      // Inicializar o pixel
      window.fbq('init', pixelId)
      
      // Disparar evento PageView apenas uma vez
      window.fbq('track', 'PageView')
      
      console.log(`Facebook Pixel inicializado: ${pixelId}`)
      return
    }

    // Carregar o script do Facebook Pixel apenas se não existir
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    script.setAttribute('data-pixel-id', pixelId) // Marcar com ID do pixel
    
    script.onload = () => {
      console.log('Facebook Pixel carregado com sucesso')
      
      // Inicializar o pixel
      window.fbq('init', pixelId)
      
      // Disparar evento PageView apenas uma vez
      window.fbq('track', 'PageView')
      
      console.log(`Facebook Pixel inicializado: ${pixelId}`)
    }

    script.onerror = () => {
      console.error('Erro ao carregar Facebook Pixel')
      // Resetar flag em caso de erro
      window.__fbPixelInitialized = false
    }

    document.head.appendChild(script)

    // Adicionar noscript fallback apenas se não existir
    const existingNoscript = document.querySelector('noscript img[src*="facebook.com/tr"]')
    if (!existingNoscript) {
      const noscript = document.createElement('noscript')
      const img = document.createElement('img')
      img.height = 1
      img.width = 1
      img.style.display = 'none'
      img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`
      noscript.appendChild(img)
      document.head.appendChild(noscript)
    }

    return () => {
      // Cleanup apenas se necessário
      console.log('Limpando Facebook Pixel...')
    }
  }, [pixelId, accessToken])

  return null
}

// Função para disparar evento InitiateCheckout
export const trackInitiateCheckout = (value: number, currency: string = 'BRL') => {
  if (window.fbq && window.__fbPixelInitialized) {
    window.fbq('track', 'InitiateCheckout', {
      value: value,
      currency: currency
    })
    console.log(`Facebook Pixel - InitiateCheckout tracked: ${value} ${currency}`)
  } else {
    console.warn('Facebook Pixel não está inicializado para tracking')
  }
}

// Funções helper para disparar eventos
export const trackPurchase = (value: number, currency: string = 'BRL') => {
  if (window.fbq && window.__fbPixelInitialized) {
    window.fbq('track', 'Purchase', {
      value: value,
      currency: currency
    })
    console.log(`Facebook Pixel - Purchase tracked: ${value} ${currency}`)
  } else {
    console.warn('Facebook Pixel não está inicializado para tracking')
  }
}

export const trackAddToCart = (contentName: string, value: number, currency: string = 'BRL') => {
  if (window.fbq && window.__fbPixelInitialized) {
    window.fbq('track', 'AddToCart', {
      content_name: contentName,
      value: value,
      currency: currency
    })
    console.log(`Facebook Pixel - AddToCart tracked: ${contentName}`)
  } else {
    console.warn('Facebook Pixel não está inicializado para tracking')
  }
}

export const trackViewContent = (contentName: string, value: number, currency: string = 'BRL') => {
  if (window.fbq && window.__fbPixelInitialized) {
    window.fbq('track', 'ViewContent', {
      content_name: contentName,
      value: value,
      currency: currency
    })
    console.log(`Facebook Pixel - ViewContent tracked: ${contentName}`)
  } else {
    console.warn('Facebook Pixel não está inicializado para tracking')
  }
} 