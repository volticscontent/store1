<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  isReady: boolean
}>()

const emit = defineEmits<{
  'video-started': []
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const isMuted = ref(true)
const showMuteButton = ref(true)

const forcePlay = () => {
  const video = videoRef.value
  if (!video) return

  const playPromise = video.play()
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      if (video) {
        video.muted = true
        isMuted.value = true
        video.play().catch(() => {
          console.log("Não foi possível iniciar o vídeo automaticamente")
        })
      }
    })
  }
}

onMounted(() => {
  const video = videoRef.value
  if (!video) return

  // Emitir evento quando o vídeo começar
  video.addEventListener('play', () => {
    emit('video-started')
  })

  forcePlay()
  video.addEventListener('canplay', forcePlay)
  video.addEventListener('loadeddata', forcePlay)
  setTimeout(forcePlay, 1000)
})

onUnmounted(() => {
  const video = videoRef.value
  if (!video) return

  video.removeEventListener('canplay', forcePlay)
  video.removeEventListener('loadeddata', forcePlay)
  video.removeEventListener('play', () => {
    emit('video-started')
  })
})

const toggleMute = () => {
  const video = videoRef.value
  if (!video) return

  video.muted = !video.muted
  isMuted.value = video.muted
  if (!video.muted) {
    setTimeout(() => {
      showMuteButton.value = false
    }, 500)
  }
}
</script>

<template>
  <div class="relative w-full" style="padding-bottom: 65%">
    <video
      ref="videoRef"
      class="absolute top-0 left-0 w-full h-full object-cover rounded-[25px]"
      autoplay
      playsinline
      :controls="false"
      preload="auto"
      src="https://pub-715e1058d62e45dca1d7229ecb1e7480.r2.dev/original.mp4"
    />
  </div>
</template> 