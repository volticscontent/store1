'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    pixelId: string
    utmify?: any
    __utmifyPixelInitialized: boolean
  }
}

interface UtmifyPixelProps {
  pixelId: string
}

export default function UtmifyPixel({ pixelId }: UtmifyPixelProps) {
  useEffect(() => {
    // Verificar se o pixel já foi inicializado globalmente
    if (window.__utmifyPixelInitialized || window.pixelId) {
      console.log('Utmify Pixel já foi inicializado, pulando...')
      return
    }

    // Marcar como inicializado para evitar múltiplas execuções
    window.__utmifyPixelInitialized = true

    // Configurar o Pixel ID
    window.pixelId = pixelId

    // Verificar se os scripts já existem
    const existingPixelScript = document.querySelector('script[src*="utmify.com.br/scripts/pixel/pixel.js"]')
    const existingUtmScript = document.querySelector('script[src*="utmify.com.br/scripts/utms/latest.js"]')

    if (existingPixelScript && existingUtmScript) {
      console.log('Scripts do Utmify já existem, pulando carregamento...')
      return
    }

    // Carregar o script do Utmify Pixel apenas se não existir
    if (!existingPixelScript) {
      const pixelScript = document.createElement('script')
      pixelScript.async = true
      pixelScript.defer = true
      pixelScript.src = 'https://cdn.utmify.com.br/scripts/pixel/pixel.js'
      pixelScript.setAttribute('data-pixel-id', pixelId) // Marcar com ID do pixel
      
      pixelScript.onload = () => {
        console.log('Utmify Pixel carregado com sucesso')
        console.log(`Utmify Pixel ID: ${pixelId}`)
      }

      pixelScript.onerror = () => {
        console.error('Erro ao carregar Utmify Pixel')
        // Resetar flag em caso de erro
        window.__utmifyPixelInitialized = false
      }

      document.head.appendChild(pixelScript)
    }

    // Carregar o script UTM padrão do Utmify apenas se não existir
    if (!existingUtmScript) {
      const utmScript = document.createElement('script')
      utmScript.async = true
      utmScript.defer = true
      utmScript.src = 'https://cdn.utmify.com.br/scripts/utms/latest.js'
      utmScript.setAttribute('data-utmify-prevent-xcod-sck', '')
      utmScript.setAttribute('data-utmify-prevent-subids', '')
      
      utmScript.onload = () => {
        console.log('Utmify UTM script carregado com sucesso')
      }

      utmScript.onerror = () => {
        console.error('Erro ao carregar Utmify UTM script')
        // Resetar flag em caso de erro
        window.__utmifyPixelInitialized = false
      }

      document.head.appendChild(utmScript)
    }

    return () => {
      // Cleanup apenas se necessário
      console.log('Limpando Utmify Pixel...')
    }
  }, [pixelId])

  return null
}

// Função para disparar evento InitiateCheckout no Utmify
export const trackUtmifyInitiateCheckout = (value: number, currency: string = 'BRL') => {
  if (typeof window !== 'undefined' && window.utmify && window.__utmifyPixelInitialized) {
    try {
      window.utmify.track('InitiateCheckout', {
        value: value,
        currency: currency
      })
      console.log(`Utmify - InitiateCheckout tracked: ${value} ${currency}`)
    } catch (error) {
      console.error('Erro ao rastrear InitiateCheckout no Utmify:', error)
    }
  } else {
    console.warn('Utmify Pixel não está inicializado para tracking')
  }
} 