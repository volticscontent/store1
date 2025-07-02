<template>
  <div class="hero-product-section bg-gradient-to-br from-blue-50 to-slate-100px-4 rounded-2xl mb-8">
    <div class="w-full max-w-4xl mx-auto">
     
      <!-- Product Showcase -->
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <!-- Product Image -->
        <div class="relative">
          <!-- Discount Badge -->
          <div class="absolute -top-4  z-20 bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg animate-pulse">
            -{{ featuredProduct.discount }}
          </div>
          
          <!-- Main Product Image -->
          <div class="relative bg-white rounded-2xl shadow-xl">
            <div class="w-full h-96 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center overflow-hidden">
              <img 
                :src="featuredProduct.local_image" 
                :alt="featuredProduct.name"
                class="w-full h-full object-contain"
              />
            </div>
            
            <!-- Category Badge -->
            <div class="absolute bottom-4 left-4 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {{ featuredProduct.category }}
            </div>
          </div>
        </div>

        <!-- Product Info -->
        <div class="space-y-6">
          <div>
            <h3 class="text-2xl mx-2 font-poppins-bold text-slate-900 mb-2">
              {{ featuredProduct.name }}
            </h3>
            <p class="text-slate-600 text-lg mx-2">
              {{ featuredProduct.subtitle }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import productsData from '@/data/products.json'

interface Product {
  id: number
  name: string
  subtitle: string
  local_image: string
  original_price: string
  final_price: string
  discount: string
  category: string
  featured?: boolean
}

// Produto em destaque (Jersey)
const featuredProduct = computed(() => {
  return (productsData as Product[]).find(p => p.featured) || (productsData as Product[])[0]
})

// Timer regressivo
const timeLeft = ref(47)

const timer = ref<NodeJS.Timeout | null>(null)

// Calcular economia
const getSavings = (product: Product) => {
  const original = parseFloat(product.original_price.replace('$', ''))
  const final = parseFloat(product.final_price.replace('$', ''))
  return `$${(original - final).toFixed(2)}`
}

// Timer countdown
function startTimer() {
  timer.value = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      timeLeft.value = 60 // Reset to 60
    }
  }, 60000) // Decrementa a cada minuto
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})
</script>

<style scoped>
/* Animações já definidas no style.css global */
</style> 