'use client'

import { useEffect, useState } from 'react'
import FacebookPixel, { trackInitiateCheckout } from './facebook-pixel'
import UtmifyPixel, { trackUtmifyInitiateCheckout } from './utmify-pixel'

// Configurações dos pixels
const FACEBOOK_PIXEL_ID = '1258450491879496'
const FACEBOOK_ACCESS_TOKEN = 'EAAHZCzh3mL4UBPHPRTlekoZAHi37RejrWfcTaNX9qumdlaiPFoSzCSc5KsZBV3PgKhg17xB7cYUVvbfk7vk0hxcIZAFPVSs0ZCsMJxHWZCUJle5Kw1StsFXbNLAZCNHpymUbREi0U35zXIHLNjct8W1X3fZB3UQO0x6zHybG7brKU09rmZCpNwku1XP6dTDO7lbMwVQZDZD'
const UTMIFY_PIXEL_ID = '686750c6f365e00741fc1515'

// Singleton para garantir que os pixels sejam inicializados apenas uma vez
let pixelsInitialized = false

export default function TrackingPixels() {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    // Verificar se os pixels já foram inicializados
    if (pixelsInitialized) {
      console.log('Pixels já foram inicializados, pulando renderização...')
      return
    }

    // Marcar como inicializados
    pixelsInitialized = true
    setShouldRender(true)

    console.log('Inicializando pixels de tracking...')

    return () => {
      // Cleanup se necessário
      console.log('Limpando TrackingPixels...')
    }
  }, [])

  // Só renderizar se for a primeira vez
  if (!shouldRender) {
    return null
  }

  return (
    <>
      <FacebookPixel 
        pixelId={FACEBOOK_PIXEL_ID} 
        accessToken={FACEBOOK_ACCESS_TOKEN} 
      />
      <UtmifyPixel 
        pixelId={UTMIFY_PIXEL_ID} 
      />
    </>
  )
}

// Função para disparar evento InitiateCheckout em todos os pixels
export const trackAllInitiateCheckout = (value: number, currency: string = 'BRL') => {
  console.log(`Disparando InitiateCheckout em todos os pixels: ${value} ${currency}`)
  
  // Aguardar um pouco para garantir que os pixels estejam carregados
  setTimeout(() => {
    // Facebook Pixel
    trackInitiateCheckout(value, currency)
    
    // Utmify Pixel
    trackUtmifyInitiateCheckout(value, currency)
  }, 100)
}

// Exportar funções individuais também
export { trackInitiateCheckout, trackUtmifyInitiateCheckout } 