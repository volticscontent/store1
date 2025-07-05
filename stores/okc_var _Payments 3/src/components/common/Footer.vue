<template>
  <footer class="footer">
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const cartCount = ref(0)

const navigateTo = (route) => {
  console.log(`Navegando para: ${route}`)
  // Aqui você implementaria a navegação real
}
</script>

<style scoped>
.footer {
  background: #1e3a8a;
  color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.bottom-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 0;
  max-width: 100%;
}

.nav-item {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  min-height: 48px;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-item:active {
  transform: scale(0.95);
}

.cart-item {
  position: relative;
}

.cart-icon-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  min-width: 20px;
}

.home-item svg {
  fill: white;
}

/* Adicionar espaço no body para o footer fixo */
:global(body) {
  padding-bottom: 80px;
}

/* Responsive */
@media (min-width: 768px) {
  .bottom-nav {
    padding: 16px 0;
  }
  
  .nav-item {
    padding: 12px 20px;
  }
}
</style> 