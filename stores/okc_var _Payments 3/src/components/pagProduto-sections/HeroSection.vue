<template>
  <section class="hero-section">
    <div class="product-container">
      <!-- Título do Produto -->
      <div class="product-title">
        <h1>SHAI GILGEOUS-ALEXANDER Oklahoma City Thunder Autographed Fanatics Authentic Nike 2025 NBA Finals Patch Blue Icon Authentic Jersey</h1>
      </div>
      
      <!-- SKU -->
      <div class="product-sku">
        <span class="sku-label">SKU:</span>
        <span class="sku-value">OKCPYZ001204</span>
      </div>
      
      <!-- Container da Imagem do Produto -->
      <div class="product-image-container">
        <!-- Navegação Esquerda -->
        <button class="nav-button nav-left" @click="previousImage">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <!-- Imagem Principal -->
        <div class="product-image">
          <img 
            :src="currentImage" 
            :alt="productTitle"
            class="product-img"
            @load="onImageLoad"
          />
        </div>
        
        <!-- Navegação Direita -->
        <button class="nav-button nav-right" @click="nextImage">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <!-- Badge de Desconto -->
        <div class="discount-badge">
          <span class="discount-text">GET 70% OFF</span>
        </div>
      </div>

      <!-- Miniaturas das Imagens -->
      <div class="image-thumbnails">
        <button 
          v-for="(image, index) in productImages" 
          :key="index"
          :class="['thumbnail-btn', { active: currentImageIndex === index }]"
          @click="setCurrentImage(index)"
        >
          <img 
            :src="image.src" 
            :alt="`${productTitle} - ${image.alt}`"
            class="thumbnail-img"
          />
        </button>
      </div>
      
      <!-- Price Container -->
      <div class="price-container">
        <span class="original-price">$149.99</span>
        <span class="discounted-price">$49.99</span>
      </div>

      <!-- Shopify Buy Button Container -->
      <div class="shopify-button-container">
        <div id="product-component-1750658269915"></div>
      </div>

      <!-- Carrossel de Produtos Relacionados -->
      <div class="related-products">
        <h3 class="related-title">Buy Together & Save 70%</h3>
        <div class="related-products-track">

          <div class="related-product-card">
            <div class="related-product-image">
              <img src="/buy_others/bone.avif" alt="Cap Finals" class="product-img" />
              <span class="discount-tag">-25%</span>
            </div>
            <h4>Thunder 2025 Champions Snapback – Official 
              <br>Locker Room Hat
            </h4>
            <div class="price-info">
              <span class="afinal">$39,99</span>
              <span class="final">$29.99</span>
            </div>
            <div id="product-component-1750960182776"></div>
          </div>

          <div class="related-product-card">
            <div class="related-product-image">
              <img src="/buy_others/bola.avif" alt="Finals Ball" class="product-img" />
              <span class="discount-tag">-80%</span>
            </div>
            <h4>Official 2025 Championship Ball – Signed by
              <br>Chet Holmgren
            </h4>
            <div class="price-info">
              <span class="afinal">$399,99</span>
              <span class="final">$79.99</span>
            </div>
            <div id="product-component-1750960235069"></div>
          </div>

          <div class="related-product-card">
            <div class="related-product-image">
              <img src="/buy_others/min.png" alt="Complete Pack" class="product-img" />
              <span class="discount-tag">-80%</span>
            </div>
            <h4>THE OFFICIAL FINALS 
              <br>PACK</h4>
            <div class="price-info">
              <span class="afinal">$439,99</span>
              <span class="final">$99.99</span>
            </div>
            <div id="product-component-1750960334759"></div>
          </div>
        </div>
      </div>
      
      <!-- Indicadores de Imagem -->
      <div class="image-indicators">
        <button 
          v-for="(image, index) in productImages" 
          :key="index"
          :class="{ active: currentImageIndex === index }"
          @click="setCurrentImage(index)"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCart } from '@/composables/useCart'

const productTitle = 'SHAI GILGEOUS-ALEXANDER Oklahoma City Thunder Autographed Fanatics Authentic Nike 2025 NBA Finals Patch Blue Icon Authentic Jersey'

// Usar o composable global para gestão do carrinho
const { 
  quantity, 
  increaseQuantity, 
  decreaseQuantity, 
  validateQuantity 
} = useCart()

const productImages = ref([
  {
    src: '/images/jersey_front_1.png',
    alt: 'Frente da camisa'
  },
  {
    src: '/images/jersey_back_2.png',
    alt: 'Costas da camisa'
  },
])

const currentImageIndex = ref(0)

const currentImage = computed(() => {
  return productImages.value[currentImageIndex.value]?.src || '/jersey-placeholder.jpg'
})

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % productImages.value.length
}

const previousImage = () => {
  currentImageIndex.value = currentImageIndex.value === 0 
    ? productImages.value.length - 1 
    : currentImageIndex.value - 1
}

const setCurrentImage = (index) => {
  currentImageIndex.value = index
}

const onImageLoad = () => {
  console.log('Imagem carregada')
}

const addToCart = (id, name, price) => {
  if (window.UnifiedTracking) {
    window.UnifiedTracking.track('add_to_cart', {
      item_id: id,
      item_name: name,
      content_name: name,
      content_ids: [id],
      content_type: 'product',
      value: price,
      quantity: 1,
      currency: 'USD',
      event_source: 'buy_others'
    })
  }
}

// Função para redirecionar ao quiz
const goToQuiz = () => {
  if (window.UnifiedTracking) {
    window.UnifiedTracking.track('quiz_click', {
      event_source: 'related_products',
      content_type: 'quiz_promotion',
      value: 0,
      currency: 'USD'
    })
  }
  window.location.href = 'https://quiz.nbathunder.shop'
}
</script>

<style scoped>
.hero-section {
  padding: 20px 16px;
  background: #ffffff;
  min-height: calc(100vh - 140px); /* Ajusta para header e footer */
}

.product-container {
  max-width: 500px;
  margin: 0 auto;
}

.product-title {
  margin-bottom: 16px;
  text-align: center;
}

.product-title h1 {
  margin-top: 10px;
  margin-bottom: 50px;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.4;
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-sku {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  font-size: 18px;
}

.sku-label {
  font-weight: 600;
  color: #666;
  font-weight: 800;
}

.sku-value {
  color: #333;
  font-family: monospace;
  font-weight: 800;
}

.product-image-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  min-height: 400px;
}

.nav-button {
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-button:hover {
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.nav-button:active {
  transform: scale(0.95);
}

.nav-left {
  left: 10px;
}

.nav-right {
  right: 10px;
}

.product-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
}

.product-img {
  width: 100%;
  max-width: 350px;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
}

.discount-badge {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: #20a714;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
}

/* Miniaturas das Imagens */
.image-thumbnails {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
  padding: 0 20px;
}

.thumbnail-btn {
  width: 60px;
  height: 60px;
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  padding: 4px;
}

.thumbnail-btn:hover {
  border-color: #1e3a8a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.15);
}

.thumbnail-btn.active {
  border-color: #1e3a8a;
  border-width: 3px;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.2);
}

.thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 4px;
}

/* Price Container */
.price-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-radius: 25px;
}

.original-price {
  font-size: 18px;
  font-weight: 500;
  color: #6c757d;
  text-decoration: line-through;
  text-decoration-color: #dc3545;
  text-decoration-thickness: 2px;
}

.discounted-price {
  font-size: 28px;
  font-weight: 800;
  color: #0c0c0c;
  text-shadow: 0 1px 2px rgba(40, 167, 69, 0.2);
  position: relative;
}

.discounted-price::after {
  position: absolute;
  top: -8px;
  right: -60px;
  background: #20a714;
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  animation: pulse 2s infinite;
}

.image-indicators {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: #d1d5db;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: #1e3a8a;
  transform: scale(1.2);
}

.indicator:hover {
  background: #9ca3af;
}

/* Seção de Quantidade */
.quantity-section {
  margin-top: 32px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.quantity-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.quantity-label {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.quantity-btn {
  width: 44px;
  height: 44px;
  border: none;
  background: #ffffff;
  color: #1e3a8a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-weight: 600;
}

.quantity-btn:hover:not(:disabled) {
  background: #f3f4f6;
  color: #1e40af;
}

.quantity-btn:active:not(:disabled) {
  background: #e5e7eb;
  transform: scale(0.95);
}

.quantity-btn:disabled {
  color: #d1d5db;
  cursor: not-allowed;
  opacity: 0.5;
}

.quantity-btn.decrease {
  border-right: 1px solid #e0e0e0;
}

.quantity-btn.increase {
  border-left: 1px solid #e0e0e0;
}

.quantity-input {
  width: 60px;
  height: 44px;
  border: none;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  background: #ffffff;
  outline: none;
  -moz-appearance: textfield;
}

.quantity-input::-webkit-outer-spin-button,
.quantity-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.quantity-input:focus {
  background: #f8f9fa;
}

.quantity-info {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.stock-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.stock-icon {
  color: #16a34a;
  font-weight: bold;
  font-size: 16px;
}

.stock-text {
  color: #16a34a;
  font-weight: 600;
}

.bulk-discount {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  border-radius: 6px;
  font-size: 13px;
  animation: pulse 2s infinite;
}

.bulk-icon {
  font-size: 16px;
}

.bulk-text {
  color: #1f2937;
  font-weight: 600;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

/* Estilos para produtos relacionados */
.related-products {
  margin-top: 12px;
  padding: 0;
  overflow: hidden;
  width: 100%;
  border-top: 1px solid #eee;
  padding-top: 12px;
}

.related-products-track {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  overflow-x: auto;
  padding: 0 4px;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.related-products-track::-webkit-scrollbar {
  display: none;
}

.related-product-card {
  width: calc(33.33% - 6px);
  min-width: 90px;
  max-width: 120px;
  flex: 1;
  background: white;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 4px;
  text-align: center;
  transition: transform 0.2s ease;
}

.related-product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.related-product-image {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  margin-bottom: 3px;
  border-radius: 3px;
  overflow: hidden;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.discount-tag {
  position: absolute;
  top: 2px;
  right: 2px;
  background: #20a714;
  color: white;
  padding: 1px 3px;
  font-size: 8px;
  font-weight: 600;
  border-radius: 2px;
}

.related-product-card h4 {
  font-size: 10px;
  font-weight: 500;
  color: #333;
  margin: 0 0 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.afinal {
  font-size: 10px;
  color: #ff0000;
  text-decoration: line-through;
  text-decoration-color: #666;
  display: block;
  margin-bottom: 1px;
  font-weight: 400;
}

.final {
  font-size: 15px;
  font-weight: 700;
  color: #000000;
  display: block;
  margin: 2px 0;
}

.price-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  margin: 4px 0;
}

.buy-btn {
  width: 100%;
  background: #002D62;
  color: white;
  border: none;
  padding: 3px;
  border-radius: 3px;
  font-size: 9px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 2px;
}

@media (max-width: 768px) {
  .related-product-card {
    min-width: 85px;
    max-width: 110px;
  }
  
  .related-products-track {
    gap: 6px;
  }
}

.related-title {
  margin-top: 10px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.special-combo {
  background: linear-gradient(135deg, #002D62 0%, #004694 100%);
  border: 1px solid #EF3524;
}

.special-combo h4,
.special-combo .combo-description,
.special-combo .original {
  color: white;
}

.combo-description {
  font-size: 8px;
  opacity: 0.9;
  margin: 2px 0;
  color: #fff;
}

.combo-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #EF3524;
  color: white;
  padding: 2px 4px;
  border-radius: 8px;
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.combo-btn {
  background: #EF3524;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.combo-btn:hover {
  background: #D62F1F;
}

.shopify-button-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style> 