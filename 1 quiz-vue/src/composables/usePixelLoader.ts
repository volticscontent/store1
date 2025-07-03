import { ref, onMounted } from 'vue'

export const usePixelLoader = () => {
  const isPixelsReady = ref(false)
  const pixelsInitialized = ref(false)

  onMounted(() => {
    if (pixelsInitialized.value) {
      isPixelsReady.value = true
      return
    }

    // Verifica se os pixels estão carregados
    const checkPixels = () => {
      return window.fbq && window.ttq
    }

    // Função que verifica tudo
    const checkAll = () => {
      if (checkPixels()) {
        isPixelsReady.value = true
        pixelsInitialized.value = true
        clearInterval(checkInterval)
      }
    }

    // Inicia verificação periódica
    const checkInterval = setInterval(checkAll, 500)

    // Timeout de segurança após 10 segundos
    const timeoutId = setTimeout(() => {
      isPixelsReady.value = true
      pixelsInitialized.value = true
      clearInterval(checkInterval)
    }, 10000)

    return () => {
      clearInterval(checkInterval)
      clearTimeout(timeoutId)
    }
  })

  return isPixelsReady
}

export default usePixelLoader 