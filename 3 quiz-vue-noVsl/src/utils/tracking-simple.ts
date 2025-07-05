// Tipos globais
declare global {
  interface Window {
    TiktokAnalyticsObject?: string
    ttq?: any
    _fbq?: any
    fbq?: any
    gtag?: any
    pixelId?: string
    dataLayer?: any[]
    trackingLoaded?: boolean
  }
}

// Mapeamento simples TikTok
const tiktokMap: Record<string, string> = {
  'P2:PageInit': 'ViewContent',
  'P2:StartQuiz': 'Subscribe',
  'P2:Question1': 'ClickButton',
  'P2:Question2': 'ClickButton',
  'P2:Question3': 'ClickButton',
  'P2:Question4': 'ClickButton',
  'P2:QuizCompleted': 'CompleteRegistration',
  'P2:GoToStore': 'Purchase',
  'P2:RestartQuiz': 'ClickButton',
  'P2:PixelTest': 'Contact'
}

// Parâmetros simples TikTok
const getTikTokParams = (event: string) => ({
  content_id: 'thunder-jersey-quiz',
  content_name: `Thunder Quiz - ${event}`,
  currency: 'USD',
  value: 49.99
})

/**
 * FACEBOOK PIXEL - EXATO COMO NO REACT
 */
const loadFacebookPixel = () => {
  console.log('🔵 Carregando Facebook Pixel...')
  
  // Código exato do React
  const fbScript = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '10005843282818404');
    fbq('track', 'p2PageView');
  `
  
  const script = document.createElement('script')
  script.id = 'meta-pixel'
  script.innerHTML = fbScript
  document.head.appendChild(script)
  
  console.log('✅ Facebook Pixel carregado!')
}

/**
 * TIKTOK PIXEL - EXATO COMO NO REACT
 */
const loadTikTokPixel = () => {
  console.log('🟡 Carregando TikTok Pixel...')
  
  // Código exato do React
  const ttScript = `
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

      ttq.load('D1G7RRRC77U9800H7TQ0');
      ttq.track('p2PageView');
    }(window, document, 'ttq');
  `
  
  const script = document.createElement('script')
  script.id = 'tiktok-pixel'
  script.innerHTML = ttScript
  document.head.appendChild(script)
  
  console.log('✅ TikTok Pixel carregado!')
}

/**
 * GOOGLE ADS - MANTIDO
 */
const loadGoogleAds = () => {
  console.log('🟢 Carregando Google Ads...')
  
  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function(...args: any[]) {
    window.dataLayer?.push(args)
  }
  
  const script = document.createElement('script')
  script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-10873800335'
  script.async = true
  script.onload = () => {
    window.gtag('js', new Date())
    window.gtag('config', 'AW-10873800335')
    console.log('✅ Google Ads ativo!')
  }
  document.head.appendChild(script)
}

/**
 * UTMIFY - EXATO COMO NO REACT
 */
const loadUtmify = () => {
  console.log('🟠 Carregando UTMify...')
  
  // Código exato do React
  const utmifyScript = `
    window.pixelId = "685891b70625ccf1fd3a54bc";
    var a = document.createElement("script");
    a.setAttribute("async", "");
    a.setAttribute("defer", "");
    a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
    document.head.appendChild(a);
  `
  
  const script = document.createElement('script')
  script.id = 'utmify-pixel'
  script.innerHTML = utmifyScript
  document.head.appendChild(script)
  
  // UTM Tracking adicional
  const utmTracking = document.createElement('script')
  utmTracking.src = 'https://cdn.utmify.com.br/scripts/utms/latest.js'
  utmTracking.setAttribute('data-utmify-prevent-xcod-sck', '')
  utmTracking.setAttribute('data-utmify-prevent-subids', '')
  utmTracking.async = true
  utmTracking.defer = true
  document.head.appendChild(utmTracking)
  
  console.log('✅ UTMify carregado!')
}

/**
 * CARREGA TODOS OS PIXELS
 */
export const loadTracking = () => {
  if (window.trackingLoaded) {
    console.log('⚠️ Tracking já carregado')
    return
  }
  
  console.log('🚀 CARREGANDO PIXELS (FORMATO REACT)...')
  
  loadFacebookPixel()
  loadTikTokPixel()  
  loadGoogleAds()
  loadUtmify()
  
  window.trackingLoaded = true
  
  // Teste após 3 segundos
  setTimeout(() => {
    console.log('🧪 TESTE DOS PIXELS:')
    console.log('Facebook:', window.fbq ? '✅ Carregado' : '❌ Falha')
    console.log('TikTok:', window.ttq ? '✅ Carregado' : '❌ Falha')
    console.log('Google:', window.gtag ? '✅ Carregado' : '❌ Falha')
    console.log('UTMify:', window.pixelId ? '✅ Carregado' : '❌ Falha')
  }, 3000)
}

/**
 * FUNÇÃO TRACK - EXATO COMO NO REACT
 */
export const track = (eventName: string) => {
  try {
    console.log('🎯 Disparando evento:', eventName)
    
    if (window.fbq) {
      window.fbq('track', eventName)
      console.log('📘 FB:', eventName)
    } else {
      console.warn('📘 FB não carregado')
    }
    
    if (window.ttq) {
      window.ttq.track(eventName)
      console.log('📱 TT:', eventName)
    } else {
      console.warn('📱 TT não carregado')
    }
    
    if (window.gtag) {
      window.gtag('event', eventName, { send_to: 'AW-10873800335' })
      console.log('🔍 GA:', eventName)
    }
  } catch (error) {
    console.error('❌ Erro no tracking:', error)
  }
}

// AUTO-CARREGAMENTO
if (typeof window !== 'undefined') {
  const startTracking = () => {
    console.log('✅ Iniciando tracking...')
    loadTracking()
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startTracking)
  } else {
    setTimeout(startTracking, 100)
  }
} 