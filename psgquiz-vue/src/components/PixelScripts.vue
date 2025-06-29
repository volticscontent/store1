<!-- PixelScripts.vue -->
<script setup lang="ts">
import { onMounted } from 'vue'

// Declare tipos globais para os pixels
declare global {
  interface Window {
    TiktokAnalyticsObject?: string
    ttq?: any
    _fbq?: any
    fbq?: any
    pixelId?: string
  }
}

// Função para inicializar o UTMify Pixel
const initUtmifyPixel = () => {
  window.pixelId = "685891b70625ccf1fd3a54bc"
  const script = document.createElement("script")
  script.setAttribute("async", "")
  script.setAttribute("defer", "")
  script.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js")
  document.head.appendChild(script)
}

// Função para inicializar o UTMify UTM Tracking
const initUtmifyTracking = () => {
  const script = document.createElement("script")
  script.setAttribute("src", "https://cdn.utmify.com.br/scripts/utms/latest.js")
  script.setAttribute("data-utmify-prevent-xcod-sck", "")
  script.setAttribute("data-utmify-prevent-subids", "")
  script.setAttribute("async", "")
  script.setAttribute("defer", "")
  document.head.appendChild(script)
}

// Função para inicializar o Meta Pixel
const initMetaPixel = () => {
  ;(function(f,b,e,v,n,t,s) {
    if(f.fbq)return
    n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)}
    if(!f._fbq)f._fbq=n
    n.push=n
    n.loaded=!0
    n.version='2.0'
    n.queue=[]
    t=b.createElement(e)
    t.async=!0
    t.src=v
    s=b.getElementsByTagName(e)[0]
    s.parentNode?.insertBefore(t,s)
  })(window, document,'script','https://connect.facebook.net/en_US/fbevents.js')
  window.fbq?.('init', '10005843282818404')
  window.fbq?.('track', 'p3PageView')
}

// Função para inicializar o TikTok Pixel
const initTikTokPixel = () => {
  !function (w: any, d: Document, t: string) {
    w.TiktokAnalyticsObject = t
    var ttq = w[t] = w[t] || []
    ttq.methods = ["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"]
    ttq.setAndDefer = function(t: any, e: string) {
      t[e] = function() {
        t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
      }
    }
    for(var i = 0; i < ttq.methods.length; i++) {
      ttq.setAndDefer(ttq, ttq.methods[i])
    }
    ttq.instance = function(t: any) {
      for(var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) {
        ttq.setAndDefer(e, ttq.methods[n])
      }
      return e
    }
    ttq.load = function(e: string, n?: any) {
      var r = "https://analytics.tiktok.com/i18n/pixel/events.js"
      var o = n && n.partner
      ttq._i = ttq._i || {}
      ttq._i[e] = []
      ttq._i[e]._u = r
      ttq._t = ttq._t || {}
      ttq._t[e] = +new Date()
      ttq._o = ttq._o || {}
      ttq._o[e] = n || {}
      var i = document.createElement("script")
      i.type = "text/javascript"
      i.async = true
      i.src = r + "?sdkid=" + e + "&lib=" + t
      var s = document.getElementsByTagName("script")[0]
      s.parentNode?.insertBefore(i, s)
    }
  }(window, document, 'ttq')

  // Inicializa o pixel do TikTok com seu ID
  window.ttq?.load('CQI0UF3C77UBN1SEFPV0')
  window.ttq?.page()
}

// Função para disparar eventos
const trackEvent = (eventName: string) => {
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

// Função para carregar o script do Facebook Pixel
const loadFacebookPixel = () => {
  const script = document.createElement('script')
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1234567890');
    fbq('track', 'PageView');
  `
  document.head.appendChild(script)
}

// Função para carregar o script do TikTok Pixel
const loadTikTokPixel = () => {
  const script = document.createElement('script')
  script.innerHTML = `
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
      ttq.load('1234567890');
      ttq.page();
    }(window, document, 'ttq');
  `
  document.head.appendChild(script)
}

onMounted(() => {
  initUtmifyPixel()
  initUtmifyTracking()
  initMetaPixel()
  initTikTokPixel()
  loadFacebookPixel()
  loadTikTokPixel()
})

// Expor a função trackEvent para outros componentes
defineExpose({
  trackEvent
})
</script>

<template>
  <div style="display: none">
    <!-- Facebook Pixel Code -->
    <noscript>
      <img
        height="1"
        width="1"
        style="display: none"
        src="https://www.facebook.com/tr?id=1234567890&ev=PageView&noscript=1"
      />
    </noscript>

    <!-- TikTok Pixel Code -->
    <noscript>
      <img
        height="1"
        width="1"
        style="display: none"
        src="https://analytics.tiktok.com/i18n/pixel/1234567890.gif"
      />
    </noscript>
  </div>
</template> 