<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  isReady: boolean
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
  <div class="relative w-full" style="padding-bottom: 56.25%">
    <video
      ref="videoRef"
      class="absolute top-0 left-0 w-full h-full object-cover rounded-[25px]"
      autoplay
      playsinline
      :controls="false"
      preload="auto"
      src="https://pub-715e1058d62e45dca1d7229ecb1e7480.r2.dev/original.mp4"
    />
    <button
      v-if="showMuteButton"
      @click="toggleMute"
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-black/60 border-none rounded-full w-20 h-20 flex items-center justify-center cursor-pointer text-white transition-opacity duration-300"
    >
      <template v-if="isMuted">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      </template>
      <template v-else>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      </template>
    </button>
  </div>
</template> 