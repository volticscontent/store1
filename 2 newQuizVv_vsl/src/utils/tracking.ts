// Global types are declared in types/global.d.ts

export const trackEvent = (eventName: string) => {
  try {
    if (window.fbq) {
      window.fbq('track', eventName)
    }
    if (window.ttq) {
      window.ttq.track(eventName)
    }
  } catch (error) {
    console.error('Error tracking event:', error)
  }
}

/**
 * Gera uma URL de teste para simular cliques do TikTok Ads
 * Documentação: https://ads.tiktok.com/help/article/utm-parameters
 */
export const generateTikTokTestUrl = (baseUrl: string = window.location.href) => {
  // Parâmetros de teste do TikTok
  const testParams = {
    tt_medium: 'paid_traffic',
    tt_campaign_id: 'test_campaign_123',
    tt_adgroup_id: 'test_adgroup_123',
    tt_ad_id: 'test_ad_123',
    ttclid: 'test_click_id_123',
    tt_source: 'tiktok_ads',
    tt_content: 'quiz_thunder'
  }

  const url = new URL(baseUrl)
  Object.entries(testParams).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  return url.toString()
}

/**
 * Extrai os parâmetros UTM e TikTok da URL atual
 */
export const extractTrackingParams = () => {
  const url = new URL(window.location.href)
  const params = url.searchParams

  return {
    // Parâmetros UTM padrão
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_content: params.get('utm_content'),
    
    // Parâmetros específicos do TikTok
    ttclid: params.get('ttclid'),
    tt_medium: params.get('tt_medium'),
    tt_campaign_id: params.get('tt_campaign_id'),
    tt_adgroup_id: params.get('tt_adgroup_id'),
    tt_ad_id: params.get('tt_ad_id'),
    tt_source: params.get('tt_source'),
    tt_content: params.get('tt_content')
  }
}

/**
 * Verifica se o acesso veio do TikTok Ads
 */
export const isFromTikTokAds = () => {
  const params = extractTrackingParams()
  return !!params.ttclid || params.utm_source === 'tiktok'
} 