<template>
  <div class="product-showcase-container w-full">
          <h3 class="text-2xl font-poppins-bold text-slate-900 mb-8 text-center animate-fade-in-up">
        🎯 Exclusive Thunder Deals
      </h3>
    
          <!-- Carousel com efeito de profundidade -->
      <div class="carousel-wrapper relative w-full max-w-4xl mx-auto h-[550px] sm:h-[550px] overflow-visible">
      <!-- Cards em camadas com efeito de profundidade -->
      <div class="cards-container relative w-full h-full flex items-center justify-center overflow-hidden">
        <!-- Todos os cards com posicionamento dinâmico -->
        <div 
          v-for="(product, index) in products" 
          :key="product.id"
          class="depth-card absolute bg-white rounded-2xl shadow-xl border border-slate-200 cursor-pointer transition-all duration-700 ease-out"
          :class="getCardClasses(index)"
          :style="getCardStyles(index)"
          @click="selectProduct(index)"
                  >
           <div class="p-1 h-full flex flex-col relative">
             <!-- Imagem do produto -->
             <div class="relative mb-1 flex-shrink-0">
                             <div class="w-full h-[18rem] sm:h-[20rem] rounded-lg overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <img 
                  :src="product.local_image" 
                  :alt="product.name"
                  class="w-full h-full object-contain transition-transform duration-500"
                  @error="handleImageError"
                />
               </div>
               
               <!-- Badge de categoria -->
               <div class="absolute bottom-1 left-1 bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-medium">
                 {{ product.category }}
               </div>
             </div>
             
             <!-- Informações do produto -->
             <div class="space-y-1 mx-10">
               <h4 class="text-sm font-poppins-bold text-slate-900 line-clamp-2 leading-tight">
                 {{ product.name }}
               </h4>
               
               <!-- Seção de preços -->
               <div class="space-y-1 mx-10">
                 <div class="flex items-center justify-between">
                   <div class="flex items-center gap-1">
                     <span class="text-lg font-poppins-bold text-green-600">{{ product.final_price }}</span>
                     <span class="text-xs text-slate-500 line-through">{{ product.original_price }}</span>
                   </div>
                 </div>
                                  <div class="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded text-center">
                   SAVE {{ getDiscount(product) }}
                 </div>
               </div>
             </div>
           </div>
         </div>
        
      </div>
    </div>
    
    <!-- Timer de rotação -->
    <div class="flex justify-center mt-6">
      <div class="bg-gradient-to-r from-orange-100 to-orange-50 rounded-full px-6 py-3 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 relative">
            <svg class="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="#e2e8f0"
                stroke-width="2"
                fill="none"
              />
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="#f97316"
                stroke-width="2"
                fill="none"
                stroke-dasharray="87.96"
                :stroke-dashoffset="87.96 - (87.96 * (5 - timeLeft) / 5)"
                class="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-xs font-bold text-orange-600">{{ timeLeft }}</span>
            </div>
          </div>
          <span class="text-sm text-slate-600 font-medium">Next promotion</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Product {
  id: number
  name: string
  subtitle: string
  local_image: string
  original_price: string
  final_price: string
  discount: string
  category: string
}

interface Props {
  products: Product[]
  autoRotate?: boolean
  rotationInterval?: number
}

const props = withDefaults(defineProps<Props>(), {
  autoRotate: true,
  rotationInterval: 5000
})

const currentMain = ref(0)
const autoRotateTimer = ref<NodeJS.Timeout | null>(null)
const timeLeft = ref(5)
const countdownTimer = ref<NodeJS.Timeout | null>(null)

// Posicionamento e escala dos cards com efeito de profundidade
const getRelativePosition = (index: number) => {
  return index - currentMain.value
}

const getCardClasses = (index: number) => {
  const position = getRelativePosition(index)
  const totalCards = props.products.length
  const currentAngle = position * (2 * Math.PI / totalCards)
  const zDepth = Math.cos(currentAngle)
  
  return {
    'shadow-2xl': zDepth > 0.5, // Card principal na frente
    'shadow-lg': zDepth <= 0.5 && zDepth > -0.5, // Cards laterais
    'shadow-md': zDepth <= -0.5, // Cards atrás
  }
}

const getCardStyles = (index: number) => {
  const position = getRelativePosition(index)
  const totalCards = props.products.length
  
  // Configurações da circunferência vista de frente (como uma bola com logos)
  const radius = 180 // Raio menor para caber melhor
  const baseAngle = (2 * Math.PI / totalCards) // Ângulo entre cada card
  const currentAngle = position * baseAngle // Ângulo atual do card
  
  // Posições X e Y baseadas na circunferência - RESPONSIVO para não vazar
  const maxOffset = window.innerWidth < 768 ? 80 : 120 // Menor offset no mobile
  const xOffset = Math.sin(currentAngle) * Math.min(radius, maxOffset)
  const yOffset = -Math.cos(currentAngle) * radius * 0.25 // Achatado para vista frontal
  const zDepth = Math.cos(currentAngle) // Profundidade (frente/trás)
  
  // Scale baseado na profundidade (cards atrás ficam menores)
  const scale = 0.7 + (zDepth + 1) * 0.25 // Entre 0.7 e 1.2 (tamanhos mais moderados)
  
  // Opacidade baseada na profundidade
  const opacity = 0.5 + (zDepth + 1) * 0.5 // Entre 0.5 e 1.0
  
  // Blur para cards distantes
  const blurAmount = Math.max(0, (1 - zDepth) * 1.5)
  
  // Tamanho base do card - FOCO NO MOBILE
  const baseWidth = window.innerWidth < 640 ? 280 : Math.min(280, window.innerWidth * 0.7) // Mobile: 280px fixo
  const baseHeight = window.innerWidth < 640 ? 380 : 350 // Mobile: 380px / Desktop: 350px
  
  return {
    transform: `translateX(calc(-50% + ${xOffset}px)) translateY(calc(-50% + ${yOffset}px)) scale(${scale})`,
    opacity: opacity,
    width: `${baseWidth}px`,
    height: `${baseHeight}px`,
    left: '50%',
    top: '50%',
    transformOrigin: 'center center',
    filter: blurAmount > 0.1 ? `blur(${blurAmount}px)` : 'none',
    zIndex: Math.round((zDepth + 1) * 20) + 10 // Z-index dinâmico
  }
}

// Computed properties para cards adjacentes (mantido para compatibilidade)
const previousCard = computed(() => {
  if (props.products.length <= 1) return null
  const prevIndex = currentMain.value === 0 ? props.products.length - 1 : currentMain.value - 1
  return {
    index: prevIndex,
    product: props.products[prevIndex]
  }
})

const nextCard = computed(() => {
  if (props.products.length <= 1) return null
  const nextIndex = currentMain.value === props.products.length - 1 ? 0 : currentMain.value + 1
  return {
    index: nextIndex,
    product: props.products[nextIndex]
  }
})

// Cálculo de desconto
const getDiscount = (product: Product) => {
  const original = parseFloat(product.original_price.replace('$', ''))
  const final = parseFloat(product.final_price.replace('$', ''))
  return `$${(original - final).toFixed(2)}`
}



function selectProduct(index: number) {
  if (index === currentMain.value) return
  currentMain.value = index
  resetTimer()
}

function autoNextProduct() {
  currentMain.value = (currentMain.value + 1) % props.products.length
  resetTimer()
}

function resetTimer() {
  stopTimer()
  timeLeft.value = Math.floor(props.rotationInterval / 1000)
  startTimer()
}

function startTimer() {
  if (props.autoRotate) {
    // Timer de contagem regressiva
    countdownTimer.value = setInterval(() => {
      timeLeft.value--
      if (timeLeft.value <= 0) {
        timeLeft.value = Math.floor(props.rotationInterval / 1000)
      }
    }, 1000)
    
    // Timer de rotação automática
    autoRotateTimer.value = setInterval(() => {
      autoNextProduct()
    }, props.rotationInterval)
  }
}

function stopTimer() {
  if (autoRotateTimer.value) {
    clearInterval(autoRotateTimer.value)
    autoRotateTimer.value = null
  }
  if (countdownTimer.value) {
    clearInterval(countdownTimer.value)
    countdownTimer.value = null
  }
}

function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement
  target.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'
}

onMounted(() => {
  resetTimer()
})

onUnmounted(() => {
  stopTimer()
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Efeitos de profundidade */
.main-card {
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15));
}

.background-card-left,
.background-card-right {
  filter: blur(1px) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
}

.background-card-left:hover,
.background-card-right:hover {
  filter: blur(0px) drop-shadow(0 15px 30px rgba(0, 0, 0, 0.15));
}

/* Animações suaves */
.main-card,
.background-card-left,
.background-card-right {
  transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Responsividade */
@media (max-width: 768px) {
  .main-card {
    width: 18rem;
    height: 20rem;
  }
  
  .background-card-left,
  .background-card-right {
    width: 12rem;
    height: 14rem;
    transform: scale(0.8);
  }
  
  .background-card-left {
    left: 1rem;
    transform: scale(0.8) rotate(-8deg);
  }
  
  .background-card-right {
    right: 1rem;
    transform: scale(0.8) rotate(8deg);
  }
}

@media (max-width: 640px) {
  .background-card-left,
  .background-card-right {
    display: none;
  }
  
  .main-card {
    width: 20rem;
    height: 32rem;
  }
  
     .carousel-wrapper {
     height: 36rem;
   }
 }
 </style> 