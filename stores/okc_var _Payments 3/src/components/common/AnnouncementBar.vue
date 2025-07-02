<template>
  <div class="announcement-bar">
    <div class="announcement-container">
      <div class="announcement-slider" @mouseenter="pauseSlider" @mouseleave="resumeSlider">
        <div class="announcement-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div 
            v-for="(announcement, index) in announcements" 
            :key="index"
            class="announcement-slide"
          >
            <div class="announcement-message">
              <span class="announcement-text">{{ announcement.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
const isPaused = ref(false)
let slideInterval = null

const announcements = ref([
  {
    icon: '⚡',
    text: 'NEW NBA CHAMPION COLLECTION - Up to 70% OFF',
    link: '/collections/nba-finals',
    linkText: 'VIEW PRODUCTS'
  },
  {
    icon: '🏀',
    text: 'FREE SHIPPING on orders over $75',
    link: '/collections/all',
    linkText: 'SHOP NOW'
  },
  {
    icon: '🎯',
    text: 'THUNDER PLAYOFFS GEAR - Official Products',
    link: '/collections/okc-thunder-playoffs',
    linkText: 'EXPLORE'
  },
  {
    icon: '🔥',
    text: 'LAST PIECES - Authentic Jerseys on Sale',
    link: '/collections/jerseys',
    linkText: 'GET YOURS'
  }
])

const startSlider = () => {
  if (announcements.value.length > 1) {
    slideInterval = setInterval(() => {
      if (!isPaused.value) {
        nextSlide()
      }
    }, 4000)
  }
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % announcements.value.length
}

const goToSlide = (index) => {
  currentSlide.value = index
}

const pauseSlider = () => {
  isPaused.value = true
}

const resumeSlider = () => {
  isPaused.value = false
}

onMounted(() => {
  startSlider()
})

onUnmounted(() => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
})
</script>

<style scoped>
.announcement-bar {
  width: 100%;
  background: linear-gradient(135deg, rgb(66, 139, 202) 0%, rgb(66, 139, 202) 100%);
  color: white;
  position: relative;
  z-index: 50;
}

.announcement-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  padding: 12px 20px;
}

.announcement-slider {
  overflow: hidden;
  position: relative;
  width: 100%;
}

.announcement-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
}

.announcement-slide {
  flex: 0 0 100%;
  width: 100%;
}

.announcement-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: center;
}

.announcement-icon {
  font-size: 18px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-3px);
  }
  60% {
    transform: translateY(-2px);
  }
}

.announcement-text {
  flex: 1;
  text-align: center;
  color: white;
}

/* Dots Indicator */
.announcement-dots {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background-color: #fbbf24;
  transform: scale(1.3);
}

.dot:hover {
  background-color: rgba(255, 255, 255, 0.7);
}

/* Responsive */
@media (max-width: 768px) {
  .announcement-container {
    padding: 10px 15px;
  }
  
  .announcement-message {
    gap: 8px;
    font-size: 12px;
    flex-wrap: wrap;
  }
  
  .announcement-icon {
    font-size: 16px;
  }
  
  .announcement-text {
    font-size: 11px;
  }
  
  .announcement-dots {
    bottom: -25px;
  }
  
  .dot {
    width: 6px;
    height: 6px;
  }
}

@media (max-width: 480px) {
  .announcement-container {
    padding: 8px 10px;
  }
  
  .announcement-message {
    flex-direction: column;
    gap: 6px;
  }
  
  .announcement-text {
    font-size: 10px;
    line-height: 1.3;
  }
    
  .announcement-dots {
    bottom: -20px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .announcement-track {
    transition: none;
  }
  
  .announcement-icon {
    animation: none;
  }
}
</style> 