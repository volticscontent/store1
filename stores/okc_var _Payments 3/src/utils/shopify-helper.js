// 🔧 HELPER PARA INDEX.HTML
// Este arquivo faz a ponte entre o config e o index.html

import { SHOPIFY_CONFIG, PRODUCTS, BUTTON_STYLES, getProductsArray } from '@/config/shopify-config.js'

// 🌍 EXPOR CONFIGURAÇÕES GLOBALMENTE PARA O INDEX.HTML
window.ShopifyHelper = {
  getConfig: () => SHOPIFY_CONFIG,
  getProducts: () => getProductsArray(),
  getButtonStyles: () => BUTTON_STYLES,
  getMainProduct: () => PRODUCTS.main,
  
  // Debug
  logCurrentConfig: () => {
    console.log('🛒 Configuração Atual do Shopify:', {
      domain: SHOPIFY_CONFIG.domain,
      products: Object.keys(PRODUCTS).length,
      mainProduct: PRODUCTS.main.id
    })
  }
}

// 🚀 AUTO-EXECUTAR QUANDO CARREGADO
console.log('✅ Shopify Helper carregado!')
window.ShopifyHelper.logCurrentConfig() 