import { ref, reactive, computed, watch } from 'vue'
import { PRODUCTS } from '@/config/shopify-config.js'

// Estado global do carrinho
const quantity = ref(1)
const customName = ref('')
const customNumber = ref('')
const cartItems = ref([])
const isCartOpen = ref(false)
const productInfo = reactive({
  title: PRODUCTS.main.name,
  price: PRODUCTS.main.price,
  sku: PRODUCTS.main.sku,
  shopifyProductId: PRODUCTS.main.id
})

// Carregar carrinho do localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('okc-cart')
    if (savedCart) {
      cartItems.value = JSON.parse(savedCart)
    }
  } catch (error) {
    console.error('Erro ao carregar carrinho:', error)
    cartItems.value = []
  }
}

// Salvar carrinho no localStorage
const saveCartToStorage = () => {
  try {
    localStorage.setItem('okc-cart', JSON.stringify(cartItems.value))
  } catch (error) {
    console.error('Erro ao salvar carrinho:', error)
  }
}

// Watcher para salvar automaticamente
watch(cartItems, saveCartToStorage, { deep: true })

// Inicializar carrinho
if (typeof window !== 'undefined') {
  loadCartFromStorage()
}

export function useCart() {
  // Funções de quantidade
  const increaseQuantity = () => {
    if (quantity.value < 99) {
      quantity.value++
    }
  }

  const decreaseQuantity = () => {
    if (quantity.value > 1) {
      quantity.value--
    }
  }

  const validateQuantity = () => {
    if (quantity.value < 1) {
      quantity.value = 1
    } else if (quantity.value > 99) {
      quantity.value = 99
    } else if (isNaN(quantity.value)) {
      quantity.value = 1
    }
  }

  const setQuantity = (newQuantity) => {
    quantity.value = newQuantity
    validateQuantity()
  }

  // Funções do carrinho
  const addToCart = (product = productInfo, qty = quantity.value) => {
    const existingItemIndex = cartItems.value.findIndex(
      item => item.sku === product.sku
    )

    if (existingItemIndex >= 0) {
      // Item já existe, aumentar quantidade
      cartItems.value[existingItemIndex].quantity += qty
    } else {
      // Novo item
      const cartItem = {
        id: Date.now(),
        title: product.title,
        price: product.price,
        sku: product.sku,
        quantity: qty,
        customName: customName.value,
        customNumber: customNumber.value,
        addedAt: new Date().toISOString()
      }
      cartItems.value.push(cartItem)
    }

    console.log('✅ Produto adicionado ao carrinho:', {
      product: product.title,
      quantity: qty,
      total: cartItems.value.length
    })

    // 🎯 USAR SISTEMA UNIFICADO - SEM DUPLICAÇÕES
    if (window.UnifiedTracking) {
      window.UnifiedTracking.track('add_to_cart', {
        item_id: product.sku,
        item_name: product.title,
        content_name: product.title,
        content_ids: [product.sku],
        content_type: 'product',
        value: product.price,
        quantity: qty,
        currency: 'USD',
        event_source: 'cart_composable'
      })
    }
  }

  const removeFromCart = (itemId) => {
    cartItems.value = cartItems.value.filter(item => item.id !== itemId)
    console.log('🗑️ Produto removido do carrinho')
  }

  const updateCartItemQuantity = (itemId, newQuantity) => {
    const item = cartItems.value.find(item => item.id === itemId)
    if (item) {
      if (newQuantity <= 0) {
        removeFromCart(itemId)
      } else {
        item.quantity = newQuantity
      }
    }
  }

  const clearCart = () => {
    cartItems.value = []
    console.log('�� Carrinho limpo')
  }

  const openCart = () => {
    isCartOpen.value = true
  }

  const closeCart = () => {
    isCartOpen.value = false
  }

  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value
    
    // 🎯 USAR SISTEMA UNIFICADO para initiate_checkout
    if (isCartOpen.value && cartItems.value.length > 0 && window.UnifiedTracking) {
      window.UnifiedTracking.track('initiate_checkout', {
        items: cartItems.value.map(item => ({
          item_id: item.sku,
          item_name: item.title,
          value: item.price,
          quantity: item.quantity
        })),
        value: cartTotal.value,
        currency: 'USD',
        num_items: cartItems.value.length,
        event_source: 'cart_toggle'
      })
      console.log('📊 Tracking: Initiate Checkout via sistema unificado')
    }
  }

  // Função para adicionar ao carrinho Shopify (mantida para compatibilidade)
  const addToShopifyCart = async () => {
    const product = {
      id: 'OKCTYZ0013',
      title: productInfo.title,
      sku: productInfo.sku,
      price: productInfo.price,
      quantity: quantity.value,
      customName: customName.value,
      customNumber: customNumber.value,
      category: 'Jersey',
      brand: 'OKC Thunder'
    }

    addToCart(product)
    
    // Não abrir o carrinho automaticamente, deixar o usuário decidir
    console.log('🛒 Produto preparado para Shopify')
  }

  // Computed properties
  const cartItemCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const isEmpty = computed(() => {
    return cartItems.value.length === 0
  })

  return {
    // Estado
    quantity,
    customName,
    customNumber,
    productInfo,
    cartItems,
    isCartOpen,
    
    // Computed
    cartItemCount,
    cartTotal,
    isEmpty,
    
    // Funções de quantidade
    increaseQuantity,
    decreaseQuantity,
    validateQuantity,
    setQuantity,
    
    // Funções do carrinho
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
    addToShopifyCart
  }
} 