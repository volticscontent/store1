<template>
  <section class="related-products">
    <div class="related-container">
      <h2 class="related-title">You May Also Like</h2>
      
      <div class="products-carousel">
        <button 
          class="carousel-btn carousel-prev" 
          @click="previousSlide"
          :disabled="currentSlide === 0"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <div class="products-container" ref="productsContainer">
          <div 
            class="products-grid" 
            :style="{ transform: `translateX(-${currentSlide * slideWidth}px)` }"
          >
            <div 
              v-for="product in relatedProducts" 
              :key="product.id"
              class="product-card"
            >
              <!-- Sale Badge -->
              <div v-if="product.isOnSale" class="sale-badge">
                Sale
              </div>
              
              <!-- Image with Swap Effect -->
              <div class="image image-swap-effect">
                <div class="main-images-wrapper" :class="{ 'loading': product.loading }">
                  <!-- Loading Spinner -->
                  <div v-if="product.loading" class="b-spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                  </div>
                  
                  <!-- Main Image -->
                  <img 
                    :class="['mpt-image', 'swap-image', { 'b-loaded': !product.loading }]"
                    :src="product.image"
                    :alt="`${product.name} - Front View`"
                    @load="onImageLoad(product.id)"
                    @mouseenter="showSecondImage(product.id)"
                    @mouseleave="showFirstImage(product.id)"
                  />
                  
                  <!-- Secondary Image (for hover effect) -->
                  <img 
                    v-if="product.secondaryImage"
                    :class="['mpt-image', 'secondary-image', { 'visible': product.showSecondary }]"
                    :src="product.secondaryImage"
                    :alt="product.name"
                  />
                </div>
                
                <!-- Product Buttons -->
                <div class="product-item-buttons">
                  <button class="quick-view-btn" @click="quickView(product.id)">
                    Quick View
                  </button>
                </div>
              </div>
              
              <!-- Product Info -->
              <div class="product-info">
                <h3 class="product-name">{{ product.name }}</h3>
                <div class="price-container">
                  <span v-if="product.originalPrice && product.isOnSale" class="original-price">
                    ${{ product.originalPrice }}
                  </span>
                  <span class="current-price" :class="{ 'sale-price': product.isOnSale }">
                    ${{ product.price }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          class="carousel-btn carousel-next" 
          @click="nextSlide"
          :disabled="currentSlide >= maxSlides"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
const productsContainer = ref(null)
const slideWidth = ref(0)

const relatedProducts = ref([
  {
    id: 1,
    name: 'OKC THUNDER CHET HOLMGREN NAME & NUMBER T-SHIRT',
    price: '22.95',
    originalPrice: '34.99',
    isOnSale: true,
    image: 'https://nbathundershop.com/cdn/shop/products/NA---Mock-for-Draft_A-copy_1000x1000.jpg?v=1656098409',
    secondaryImage: 'https://nbathundershop.com/cdn/shop/products/OKC-PLAYER-TEE-Holmgren_D-copy_1000x1000.jpg?v=1656098409',
    loading: true,
    showSecondary: false
  },
  {
    id: 4,
    name: 'OKLAHOMA CITY THUNDER STATEMENT JERSEY 2024-25',
    price: '120.00',
    originalPrice: null,
    isOnSale: false,
    image: '/images/jersey_back_4.png',
    secondaryImage: '/images/jersey_back_2.png',
    loading: true,
    showSecondary: false
  },
  {
    id: 5,
    name: 'OKLAHOMA CITY THUNDER NIKE ASSOCIATION EDITION SHAI GILGEOUS-ALEXANDER NAME AND NUMBER TEE',
    price: '35.99',
    originalPrice: '50.00',
    isOnSale: true,
    image: '/images/sga_name_number_tee_back.jpg',
    secondaryImage: '/images/jersey_front_1.png',
    loading: true,
    showSecondary: false
  }
])

const maxSlides = computed(() => {
  return Math.max(0, relatedProducts.value.length - 2)
})

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

const nextSlide = () => {
  if (currentSlide.value < maxSlides.value) {
    currentSlide.value++
  }
}

const updateSlideWidth = () => {
  if (productsContainer.value) {
    const containerWidth = productsContainer.value.offsetWidth
    slideWidth.value = containerWidth / 2
  }
}

const onImageLoad = (productId) => {
  const product = relatedProducts.value.find(p => p.id === productId)
  if (product) {
    product.loading = false
  }
}

const showSecondImage = (productId) => {
  const product = relatedProducts.value.find(p => p.id === productId)
  if (product && product.secondaryImage) {
    product.showSecondary = true
  }
}

const showFirstImage = (productId) => {
  const product = relatedProducts.value.find(p => p.id === productId)
  if (product) {
    product.showSecondary = false
  }
}

const quickView = (productId) => {
  console.log('Quick view for product:', productId)
  // Implementar lógica de quick view
}

onMounted(() => {
  updateSlideWidth()
  window.addEventListener('resize', updateSlideWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSlideWidth)
})
</script>

<style scoped>
.related-products {
  background-color: #fff;
  padding: 60px 20px;
  border-top: 1px solid #e5e7eb;
}

.related-container {
  max-width: 1200px;
  margin: 0 auto;
}

.related-title {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  font-family: 'Arial', sans-serif;
}

.related-title::before,
.related-title::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 80px;
  height: 2px;
  background-color: #1e3a8a;
}

.related-title::before {
  left: calc(50% - 180px);
}

.related-title::after {
  right: calc(50% - 180px);
}

/* Carousel */
.products-carousel {
  position: relative;
  display: flex;
  align-items: center;
}

.carousel-btn {
  position: absolute;
  z-index: 10;
  width: 50px;
  height: 50px;
  background: #fff;
  border: 2px solid #e5e7eb;
  border-radius: 50%;
  color: #1e3a8a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.carousel-btn:hover:not(:disabled) {
  background: #1e3a8a;
  color: white;
  transform: scale(1.1);
}

.carousel-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel-prev {
  left: -25px;
}

.carousel-next {
  right: -25px;
}

.products-container {
  width: 100%;
  overflow: hidden;
  margin: 0 50px;
}

.products-grid {
  display: flex;
  gap: 30px;
  transition: transform 0.4s ease;
}

.product-card {
  flex: 0 0 calc(50% - 15px);
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f5f9;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

/* Sale Badge */
.sale-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background: #dc2626;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  z-index: 5;
  letter-spacing: 0.5px;
}

/* Image Container */
.image {
  position: relative;
  overflow: hidden;
}

.main-images-wrapper {
  position: relative;
  width: 100%;
  height: 300px;
  background-color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-images-wrapper.loading {
  background-color: #f1f5f9;
}

/* Loading Spinner */
.b-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.b-spinner > div {
  width: 12px;
  height: 12px;
  background-color: #1e3a8a;
  border-radius: 100%;
  display: inline-block;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.b-spinner .bounce1 {
  animation-delay: -0.32s;
}

.b-spinner .bounce2 {
  animation-delay: -0.16s;
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1.0);
  }
}

/* Images */
.mpt-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: all 0.3s ease;
  position: absolute;
  top: 0;
  left: 0;
}

.mpt-image.swap-image {
  opacity: 1;
  z-index: 2;
}

.secondary-image {
  opacity: 0;
  z-index: 3;
}

.secondary-image.visible {
  opacity: 1;
}

/* Product Buttons */
.product-item-buttons {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: all 0.3s ease;
}

.product-card:hover .product-item-buttons {
  opacity: 1;
}

.quick-view-btn {
  background: #1e3a8a;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.quick-view-btn:hover {
  background: #1e40af;
  transform: scale(1.05);
}

/* Product Info */
.product-info {
  padding: 24px 20px;
  text-align: center;
}

.product-name {
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 42px;
}

/* Price Container */
.price-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.original-price {
  font-size: 16px;
  color: #9ca3af;
  text-decoration: line-through;
  font-weight: 500;
}

.current-price {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
}

.current-price.sale-price {
  color: #dc2626;
}

/* Responsive */
@media (max-width: 768px) {
  .related-products {
    padding: 40px 15px;
  }
  
  .related-title {
    font-size: 28px;
    margin-bottom: 30px;
  }
  
  .related-title::before,
  .related-title::after {
    display: none;
  }
  
  .carousel-btn {
    width: 40px;
    height: 40px;
  }
  
  .carousel-prev {
    left: -20px;
  }
  
  .carousel-next {
    right: -20px;
  }
  
  .products-container {
    margin: 0 30px;
  }
  
  .products-grid {
    gap: 20px;
  }
  
  .product-card {
    flex: 0 0 calc(100% - 10px);
  }
  
  .main-images-wrapper {
    height: 250px;
  }
  
  .product-info {
    padding: 20px 16px;
  }
  
  .product-name {
    font-size: 14px;
    min-height: 38px;
  }
  
  .current-price {
    font-size: 18px;
  }
  
  .original-price {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .carousel-btn {
    display: none;
  }
  
  .products-container {
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    margin: 0;
  }
  
  .products-container::-webkit-scrollbar {
    display: none;
  }
  
  .products-grid {
    transform: none !important;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding: 0 10px;
  }
  
  .product-card {
    scroll-snap-align: start;
    flex: 0 0 280px;
  }
  
  .main-images-wrapper {
    height: 220px;
  }
}

/* Quick Links Section */
.quick-links {
  background-color: #f8fafc;
  padding: 40px 20px;
  margin-top: 40px;
  border-radius: 12px;
}

.quick-links h2 {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  text-align: center;
  margin-bottom: 30px;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.link-item {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
}

.link-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.link-item a {
  color: #1e3a8a;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.link-item a:hover {
  color: #1e40af;
}

/* Social Links */
.social-links {
  background-color: #1f2937;
  color: white;
  padding: 30px 20px;
  text-align: center;
  margin-top: 40px;
}

.social-links h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-icon {
  width: 40px;
  height: 40px;
  background: #374151;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: #1e3a8a;
  transform: scale(1.1);
}
</style> 