<template>
  <div class="promo-banner" :class="{ 'visible': isVisible }" v-if="showBanner">
    <div class="banner-content">
      <div class="discount-text">
        <span class="get-text">GET</span>
        <span class="percentage">15%</span>
        <span class="off-text">OFF</span>
      </div>
      <p class="banner-message">Primeira compra!</p>
      <button class="close-btn" @click="closeBanner" aria-label="Fechar banner">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showBanner = ref(true)
const isVisible = ref(false)

const closeBanner = () => {
  isVisible.value = false
  setTimeout(() => {
    showBanner.value = false
  }, 300)
}

onMounted(() => {
  // Mostrar banner após 2 segundos
  setTimeout(() => {
    isVisible.value = true
  }, 2000)
  
  // Auto-fechar após 10 segundos
  setTimeout(() => {
    if (showBanner.value) {
      closeBanner()
    }
  }, 12000)
})
</script>

<style scoped>
.promo-banner {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  opacity: 0;
  transform: translateY(100px) scale(0.8);
  transition: all 0.3s ease;
  pointer-events: none;
}

.promo-banner.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: all;
}

.banner-content {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(30, 58, 138, 0.3);
  position: relative;
  text-align: center;
  min-width: 120px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 10px 30px rgba(30, 58, 138, 0.3);
  }
  50% {
    box-shadow: 0 15px 40px rgba(30, 58, 138, 0.5);
  }
}

.discount-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
}

.get-text, .off-text {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
}

.percentage {
  font-size: 32px;
  font-weight: 900;
  line-height: 1;
  margin: -2px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.banner-message {
  font-size: 12px;
  margin: 0;
  opacity: 0.9;
  font-weight: 500;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: background-color 0.2s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Responsividade */
@media (max-width: 768px) {
  .promo-banner {
    bottom: 15px;
    right: 15px;
  }
  
  .banner-content {
    padding: 15px;
    min-width: 100px;
  }
  
  .percentage {
    font-size: 28px;
  }
  
  .get-text, .off-text {
    font-size: 12px;
  }
  
  .banner-message {
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .promo-banner {
    bottom: 10px;
    right: 10px;
  }
  
  .banner-content {
    padding: 12px;
    min-width: 90px;
  }
  
  .percentage {
    font-size: 24px;
  }
}
</style> 