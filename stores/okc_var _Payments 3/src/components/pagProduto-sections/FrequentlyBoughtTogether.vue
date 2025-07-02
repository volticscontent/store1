# Criando um novo componente FrequentlyBoughtTogether.vue
<template>
  <div class="frequently-bought-together">
    <h2 class="fbt-title">🏀 Compre Junto e Economize!</h2>
    
    <div class="fbt-container">
      <!-- Produto Principal -->
      <div class="fbt-product main-product">
        <div class="fbt-product-image">
          <div class="thunder-logo"></div>
        </div>
        <div class="fbt-product-info">
          <h3>SHAI Jersey</h3>
          <p class="fbt-price">$49.99</p>
        </div>
        <div class="fbt-check">
          <input type="checkbox" checked disabled>
        </div>
      </div>

      <!-- Símbolo + -->
      <div class="fbt-plus">+</div>
      
      <!-- Produto Adicional 1 -->
      <div class="fbt-product">
        <div class="fbt-product-image">
          <div class="thunder-logo-small"></div>
        </div>
        <div class="fbt-product-info">
          <h3>Thunder Cap</h3>
          <p class="fbt-price">$29.99</p>
        </div>
        <div class="fbt-check">
          <input type="checkbox" v-model="selectedProducts" value="cap">
        </div>
      </div>

      <!-- Símbolo + -->
      <div class="fbt-plus">+</div>
      
      <!-- Produto Adicional 2 -->
      <div class="fbt-product">
        <div class="fbt-product-image">
          <div class="thunder-logo-small"></div>
        </div>
        <div class="fbt-product-info">
          <h3>Thunder Shorts</h3>
          <p class="fbt-price">$39.99</p>
        </div>
        <div class="fbt-check">
          <input type="checkbox" v-model="selectedProducts" value="shorts">
        </div>
      </div>
    </div>

    <!-- Total e Botão -->
    <div class="fbt-total">
      <div class="fbt-total-price">
        <span>Total do Pacote:</span>
        <span class="total-value">${{ totalPrice }}</span>
      </div>
      <button 
        class="fbt-add-all"
        @click="addSelectedToCart"
        :disabled="isAddingToCart"
      >
        🎯 {{ addButtonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCart } from '@/composables/useCart'

const selectedProducts = ref([])
const isAddingToCart = ref(false)

// Preços dos produtos
const prices = {
  jersey: 49.99,
  cap: 29.99,
  shorts: 39.99
}

// Calcular preço total
const totalPrice = computed(() => {
  let total = prices.jersey // Jersey sempre incluída
  
  if (selectedProducts.value.includes('cap')) {
    total += prices.cap
  }
  
  if (selectedProducts.value.includes('shorts')) {
    total += prices.shorts
  }
  
  return total.toFixed(2)
})

// Texto do botão
const addButtonText = computed(() => {
  if (isAddingToCart.value) {
    return '🔄 ADICIONANDO...'
  }
  return '🎯 ADICIONAR SELECIONADOS'
})

// Função para adicionar ao carrinho
const addSelectedToCart = async () => {
  if (isAddingToCart.value) return
  isAddingToCart.value = true
  
  try {
    // Preparar itens selecionados
    const items = [
      {
        name: 'SHAI Jersey',
        price: prices.jersey
      }
    ]
    
    if (selectedProducts.value.includes('cap')) {
      items.push({
        name: 'Thunder Cap',
        price: prices.cap
      })
    }
    
    if (selectedProducts.value.includes('shorts')) {
      items.push({
        name: 'Thunder Shorts',
        price: prices.shorts
      })
    }
    
    // Tracking do evento
    if (window.UnifiedTracking) {
      window.UnifiedTracking.track('add_to_cart_bundle', {
        items,
        value: parseFloat(totalPrice.value),
        currency: 'USD',
        num_items: items.length,
        event_source: 'frequently_bought_together'
      })
    }
    
    // TODO: Implementar adição real ao carrinho
    alert('Produtos selecionados adicionados ao carrinho!')
    
  } catch (error) {
    console.error('Erro ao adicionar produtos:', error)
    alert('Erro ao adicionar produtos ao carrinho')
  } finally {
    isAddingToCart.value = false
  }
}
</script>

<style scoped>
.frequently-bought-together {
  margin: 30px auto;
  padding: 20px;
  max-width: 800px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.fbt-title {
  font-size: 24px;
  font-weight: 900;
  color: #002D62;
  text-align: center;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.fbt-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.fbt-product {
  flex: 1;
  min-width: 200px;
  padding: 15px;
  background: #f8fafc;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.fbt-product:hover {
  border-color: #002D62;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.fbt-product-image {
  width: 100px;
  height: 100px;
  background: #002D62;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  border: 2px solid #EF3524;
}

.thunder-logo,
.thunder-logo-small {
  width: 60px;
  height: 60px;
  background-image: url('/images/thunder_logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.thunder-logo-small {
  width: 40px;
  height: 40px;
}

.fbt-product-info {
  text-align: center;
}

.fbt-product-info h3 {
  font-size: 16px;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
}

.fbt-price {
  font-size: 18px;
  font-weight: 900;
  color: #059669;
  margin: 5px 0;
}

.fbt-plus {
  font-size: 24px;
  font-weight: bold;
  color: #002D62;
}

.fbt-check {
  margin-top: 10px;
}

.fbt-check input[type="checkbox"] {
  width: 20px;
  height: 20px;
  border: 2px solid #002D62;
  border-radius: 4px;
  cursor: pointer;
}

.fbt-total {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
}

.fbt-total-price {
  font-size: 20px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 15px;
}

.total-value {
  color: #059669;
  font-size: 24px;
  font-weight: 900;
  margin-left: 10px;
}

.fbt-add-all {
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 8px 25px rgba(5, 150, 105, 0.3);
}

.fbt-add-all:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(5, 150, 105, 0.4);
}

.fbt-add-all:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Mobile Responsivo */
@media (max-width: 768px) {
  .fbt-container {
    flex-direction: column;
  }

  .fbt-product {
    width: 100%;
    min-width: unset;
  }

  .fbt-plus {
    transform: rotate(90deg);
  }
}
</style> 