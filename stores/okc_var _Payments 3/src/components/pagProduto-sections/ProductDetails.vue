<template>
  <div class="product-details">
    <!-- Mensagem especial para usuários do quiz -->
    <div v-if="isFromQuiz" class="quiz-success-banner">
      <div class="quiz-icon">🎯</div>
      <div class="quiz-message">
        <h3>Parabéns! Quiz Concluído com Sucesso! ⚡</h3>
        <p>Você desbloqueou o desconto de <strong>70% OFF</strong> na camisa oficial do Shai Gilgeous-Alexander!</p>
        <div class="discount-highlight">
          <span class="original-price">$149.99</span>
          <span class="arrow">→</span>
          <span class="final-price">$49.99</span>
        </div>
      </div>
    </div>  
    <!-- Shopify Buy Button Container -->
    <div class="shopify-button-container">
      <div id='product-component-1750658269915'></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCart } from '@/composables/useCart'

const {
  quantity,
  customName,
  customNumber,
  productInfo,
  increaseQuantity,
  decreaseQuantity,
  validateQuantity,
  addToShopifyCart
} = useCart()

const isAddingToCart = ref(false)
const shopifyButtonLoaded = ref(false)
const isFromQuiz = ref(false)
const quizData = ref({})

// Flag global para evitar múltiplas inicializações
let shopifyInitialized = false

// Verificar se o usuário veio do quiz
const checkQuizOrigin = () => {
  const savedQuizData = localStorage.getItem('thunder_quiz_data')
  if (savedQuizData) {
    try {
      const data = JSON.parse(savedQuizData)
      quizData.value = data
      isFromQuiz.value = data.source === 'thunder_quiz'
      console.log('🎯 Usuário detectado do quiz:', data)
    } catch (error) {
      console.warn('Erro ao parsear dados do quiz:', error)
    }
  }
}

// Título dinâmico baseado na origem
const productTitle = computed(() => {
  if (isFromQuiz.value) {
    return 'SHAI GILGEOUS-ALEXANDER Oklahoma City Thunder Autographed Jersey - Quiz Special 70% OFF!'
  }
  return 'SHAI GILGEOUS-ALEXANDER Oklahoma City Thunder Autographed Fanatics Authentic Nike 2025 NBA Finals Patch Blue Icon Authentic Jersey'
})

// Computed para informações seguras do produto
const safeProductInfo = computed(() => ({
  id: 'OKCTYZ0013',
  title: productInfo?.title || 'SHAI GILGEOUS-ALEXANDER Oklahoma City Thunder Autographed Fanatics Authentic Nike 2025 NBA Finals Patch Blue Icon Authentic Jersey',
  sku: productInfo?.sku || 'OKCTYZ0013',
  price: productInfo?.price || 49.99,
  category: 'Jersey',
  brand: 'OKC Thunder'
}))

// Função para adicionar ao carrinho com tracking
const addToCart = async () => {
  if (isAddingToCart.value) return
  
  isAddingToCart.value = true
  
  try {
    // Adicionar ao carrinho
    await addToShopifyCart()
    
    // 🎯 USAR SISTEMA UNIFICADO - SEM DUPLICAÇÕES
    if (window.UnifiedTracking) {
      window.UnifiedTracking.track('add_to_cart', {
        item_id: safeProductInfo.value.id,
        item_name: safeProductInfo.value.title,
        content_name: safeProductInfo.value.title,
        content_ids: [safeProductInfo.value.id],
        content_type: 'product',
        value: safeProductInfo.value.price,
        quantity: quantity.value,
        currency: 'USD',
        event_source: 'vue_component'
      })
    }
    
    console.log('✅ Produto adicionado com sucesso!')
  } catch (error) {
    console.error('❌ Erro ao adicionar produto:', error)
  } finally {
    isAddingToCart.value = false
  }
}

// Função para fazer tracking de visualização do produto
const trackProductView = () => {
  // 🎯 USAR SISTEMA UNIFICADO - APENAS UMA VEZ
  if (window.UnifiedTracking) {
    window.UnifiedTracking.track('view_item', {
      item_id: safeProductInfo.value.id,
      item_name: safeProductInfo.value.title,
      content_name: safeProductInfo.value.title,
      content_ids: [safeProductInfo.value.id],
      content_type: 'product',
      value: safeProductInfo.value.price,
      currency: 'USD',
      event_source: 'product_view'
    })
  }
}

// Função para interceptar o botão do Shopify
const interceptShopifyButton = () => {
  const button = document.querySelector('.shopify-buy__btn')
  if (!button) {
    console.warn('⚠️ Botão Shopify não encontrado')
    return
  }

  console.log('✅ Botão Shopify interceptado')
  button.addEventListener('click', () => {
    // Tracking unificado do clique no botão
    if (window.UnifiedTracking) {
      window.UnifiedTracking.track('add_to_cart', {
        item_id: safeProductInfo.value.id,
        item_name: safeProductInfo.value.title,
        content_name: safeProductInfo.value.title,
        content_ids: [safeProductInfo.value.id],
        content_type: 'product',
        value: safeProductInfo.value.price,
        currency: 'USD',
        event_source: 'shopify_button'
      })
    }
  })
}

onMounted(() => {
  console.log('🔄 Inicializando componente ProductDetails...')
  
  // Verificar se veio do quiz PRIMEIRO
  checkQuizOrigin()
  
  // Fazer tracking da visualização do produto APENAS UMA VEZ
  setTimeout(() => {
    trackProductView()
  }, 1000)
  
  // 🎯 AGUARDAR SHOPIFY ESTAR PRONTO E INTERCEPTAR BOTÃO
  // O Shopify agora é inicializado diretamente no index.html
  console.log('⏳ Aguardando Shopify estar pronto para interceptação...')
  
  // Interceptar cliques do botão para tracking UNIFICADO
  setTimeout(() => {
    interceptShopifyButton()
  }, 3000) // Aguardar mais tempo para garantir que o botão foi criado
})

onUnmounted(() => {
  console.log('🔄 Componente ProductDetails desmontado')
})
</script>

<style scoped>
.product-details {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-info h1 {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 12px;
  line-height: 1.3;
}

.title {
  font-size: px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 32px;
  line-height: 1.3;
  text-align: center;
}

.price {
  font-size: 28px;
  font-weight: 800;
  color: #353a38;
  margin-bottom: 24px;
  text-align: center;
}

.product-options {
  margin-bottom: 24px;
}

.quantity-selector {
  margin-bottom: 20px;
}

.quantity-selector label {
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 150px;
}

.qty-btn {
  background: #1e3a8a;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.qty-btn:hover {
  background: #1e40af;
  transform: scale(1.1);
}

.quantity-input {
  width: 60px;
  height: 40px;
  text-align: center;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
}

.quantity-input:focus {
  outline: none;
  border-color: #1e3a8a;
}

.custom-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-group label {
  font-weight: 600;
  color: #374151;
}

.field-group input {
  padding: 12px;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.field-group input:focus {
  outline: none;
  border-color: #1e3a8a;
}

.shopify-button-container {
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-bottom: 2px solid #f3f4f6;
}

.shopify-button-container #product-component-1750658269915 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px; /* Limitar largura máxima do botão */
}

/* Garantir que o botão Shopify mantenha seu estilo */
:deep(.shopify-buy__btn) {
  background-color: #008000 !important;
  padding-left: 60px !important;
  padding-right: 60px !important;
  font-size: 16px !important;
  font-weight: bold !important;
  border-radius: 8px !important;
  border: none !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
}

:deep(.shopify-buy__btn:hover) {
  background-color: #006400 !important;
  transform: translateY(-2px) !important;
}

.fallback-button-container {
  margin-top: 16px;
}

.add-to-cart-btn {
  width: 100%;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);
}

.add-to-cart-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(30, 58, 138, 0.4);
}

.add-to-cart-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 768px) {
  .product-details {
    margin: 10px;
  }
  
  .product-info h1 {
    font-size: 20px;
  }
  
  .title,.price {
    font-size: 35px;
  }
  
  .custom-fields {
    gap: 12px;
  }
}
</style> 