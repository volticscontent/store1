'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import FacebookPixel, { trackInitiateCheckout } from './facebook-pixel'
import UtmifyPixel, { trackUtmifyInitiateCheckout } from './utmify-pixel'

// Configurações dos pixels ORIGINAIS (mantendo)
const FACEBOOK_PIXEL_ID_1 = '1258450491879496'
const FACEBOOK_ACCESS_TOKEN_1 = 'EAAHZCzh3mL4UBPHPRTlekoZAHi37RejrWfcTaNX9qumdlaiPFoSzCSc5KsZBV3PgKhg17xB7cYUVvbfk7vk0hxcIZAFPVSs0ZCsMJxHWZCUJle5Kw1StsFXbNLAZCNHpymUbREi0U35zXIHLNjct8W1X3fZB3UQO0x6zHybG7brKU09rmZCpNwku1XP6dTDO7lbMwVQZDZD'
const UTMIFY_PIXEL_ID_1 = '686750c6f365e00741fc1515'

// Configurações dos pixels NOVOS (adicionando)
const FACEBOOK_PIXEL_ID_2 = '2350369725357420'
const FACEBOOK_ACCESS_TOKEN_2 = 'EAAJ92ZCmLbAsBO36ghUOykRNs8Pi01i1jhJKxj3qBdqF4VF2rhVbpAIszOtzcDyZAysC0tvV9pBZBUV4ivTC7RCZBouZAsi8TscygZACHfs5uZAZALBqEUWPQPHPXhHrW9whEIqUoDKskpZA2yQZA0uMHtt6AxfMXmhxSY9tuZCxeZCRFWt68XjCxP9ml0THwZCZBiuwFQVwZDZD'
const UTMIFY_PIXEL_ID_2 = '6866499592b79dbafc78f878'

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
      {/* PIXELS ORIGINAIS - mantendo */}
      <FacebookPixel 
        pixelId={FACEBOOK_PIXEL_ID_1} 
        accessToken={FACEBOOK_ACCESS_TOKEN_1} 
      />
      <UtmifyPixel 
        pixelId={UTMIFY_PIXEL_ID_1} 
      />

      {/* SEGUNDO PIXEL DO FACEBOOK - adicionando */}
      <FacebookPixel 
        pixelId={FACEBOOK_PIXEL_ID_2} 
        accessToken={FACEBOOK_ACCESS_TOKEN_2} 
      />

      {/* SEGUNDA CONFIGURAÇÃO UTMIFY - adicionando */}
      <UtmifyPixel 
        pixelId={UTMIFY_PIXEL_ID_2} 
      />

      {/* Script UTMify Pixel personalizado adicional */}
      <Script
        id="utmify-pixel-custom"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.pixelId = "686750c6f365e00741fc1515";
            var a = document.createElement("script");
            a.setAttribute("async", "");
            a.setAttribute("defer", "");
            a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
            document.head.appendChild(a);
          `
        }}
      />

      {/* Script UTM padrão da UTMify adicional */}
      <Script
        src="https://cdn.utmify.com.br/scripts/utms/latest.js"
        data-utmify-prevent-xcod-sck="true"
        data-utmify-prevent-subids="true"
        strategy="afterInteractive"
        async
        defer
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
