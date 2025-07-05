<!-- PixelScripts.vue -->
<script setup lang="ts">
import { onMounted } from 'vue'

// Global types are declared in types/global.d.ts

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
  // @ts-ignore
  !(function (f: any, b: Document, e: string, v: string, n?: any, t?: any, s?: any) {
    if (f.fbq) return
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = !0
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e) as HTMLScriptElement
    t.async = !0
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode?.insertBefore(t, s)
  })(
    window,
    document,
    'script',
    'https://connect.facebook.net/en_US/fbevents.js'
  )

  window.fbq('init', '10005843282818404')
  window.fbq('track', 'PageView')
}

// Função para inicializar o TikTok Pixel
const initTikTokPixel = () => {
  // @ts-ignore
  !(function (w: any, d: Document, t: string) {
    w.TiktokAnalyticsObject = t
    const ttq = (w[t] = w[t] || [])
    ttq.methods = [
      'page',
      'track',
      'identify',
      'instances',
      'debug',
      'on',
      'off',
      'once',
      'ready',
      'alias',
      'group',
      'enableCookie',
      'disableCookie'
    ]
    ttq.setAndDefer = function (t: any, e: any) {
      t[e] = function () {
        t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
      }
    }
    for (let i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i])
         ttq.instance = function (t: any) {
       const e = ttq._i[t] || []
       for (let n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n])
       return e
     }
    ttq.load = function (e: any, n: any) {
      const i = 'https://analytics.tiktok.com/i18n/pixel/events.js'
      ttq._i = ttq._i || {}
      ttq._i[e] = []
      ttq._i[e]._u = i
      ttq._t = ttq._t || {}
      ttq._t[e] = +new Date()
      ttq._o = ttq._o || {}
      ttq._o[e] = n || {}
      const o = document.createElement('script') as HTMLScriptElement
      o.type = 'text/javascript'
      o.async = !0
      o.src = i + '?sdkid=' + e + '&lib=' + t
      const a = document.getElementsByTagName('script')[0]
      a.parentNode?.insertBefore(o, a)
    }

    ttq.load('D1G7RRRC77U9800H7TQ0')
    ttq.page()
  })(window, document, 'ttq')
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

onMounted(() => {
  initUtmifyPixel()
  initUtmifyTracking()
  initMetaPixel()
  initTikTokPixel()

  // Google Ads
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-10873800335'
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }
  gtag('js', new Date())
  gtag('config', 'AW-10873800335')

  // UTMify Pixel
  const utmifyScript = document.createElement('script')
  utmifyScript.async = true
  utmifyScript.src = 'https://pixel.utmify.com.br/pixel.js'
  document.head.appendChild(utmifyScript)

  console.log('✅ All pixels loaded successfully')
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
        src="https://www.facebook.com/tr?id=10005843282818404&ev=PageView&noscript=1"
      />
    </noscript>

    <!-- TikTok Pixel Code -->
    <noscript>
      <img
        height="1"
        width="1"
        style="display: none"
        src="https://analytics.tiktok.com/i18n/pixel/CQI0UF3C77UBN1SEFPV0.gif"
      />
    </noscript>
  </div>
</template> 