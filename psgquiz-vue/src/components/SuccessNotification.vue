<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const isVisible = ref(false)

watch(() => props.show, (newValue) => {
  if (newValue) {
    isVisible.value = true
    const timer = setTimeout(() => {
      isVisible.value = false
      setTimeout(() => {
        emit('close')
      }, 500) // Espera a animação de saída
    }, 3000)

    return () => clearTimeout(timer)
  }
})
</script>

<template>
  <div
    v-if="show"
    class="fixed top-4 right-4 z-50 transition-all duration-500 transform"
    :class="isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'"
  >
    <div class="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-3 border border-green-400">
      <div class="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
        <span class="text-2xl">✓</span>
      </div>
      <div>
        <h3 class="font-bold">Resposta Correta!</h3>
        <p class="text-sm text-green-100">+$25 de desconto desbloqueado</p>
      </div>
    </div>
  </div>
</template> 