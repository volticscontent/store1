<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { CurrencyDollarIcon } from '@heroicons/vue/24/outline'

interface Props {
  show: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const isVisible = ref(false)

watch(() => props.show, (newShow) => {
  if (newShow) {
    isVisible.value = true
    const timer = setTimeout(() => {
      isVisible.value = false
      setTimeout(() => {
        emit('close')
      }, 500) // Wait for exit animation
    }, 3000)

    return () => clearTimeout(timer)
  }
})
</script>

<template>
  <div
    v-if="show"
    :class="`fixed top-4 right-4 z-50 transition-all duration-500 transform ${
      isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'
    }`"
  >
    <div class="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-3 border border-green-400">
      <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center animate-pulse">
        <CurrencyDollarIcon class="h-6 w-6 text-green-500" />
      </div>
      <div>
        <p class="font-bold text-lg">Congratulations! 🎉</p>
        <p class="text-sm opacity-90">You earned $25 discount!</p>
      </div>
      <div class="w-2 h-2 bg-green-300 rounded-full animate-ping"></div>
    </div>
  </div>
</template> 