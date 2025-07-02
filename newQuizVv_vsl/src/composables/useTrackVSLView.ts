import { ref, onMounted } from 'vue'

// Função para disparar eventos nos pixels
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

// Hook para rastrear visualização da VSL apenas uma vez
export const useTrackVSLView = () => {
  const hasTracked = ref(false)

  onMounted(() => {
    if (!hasTracked.value) {
      setTimeout(() => {
        trackEvent('P2 VSL_View')
        hasTracked.value = true
      }, 1000)
    }
  })

  return {
    hasTracked
  }
}

export default useTrackVSLView 