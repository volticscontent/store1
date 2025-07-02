// 🛒 CONFIGURAÇÃO CENTRAL DO SHOPIFY
// Este arquivo controla TODAS as configurações do Shopify no projeto

// 🎯 CONFIGURAÇÕES ATIVAS (MUDE AQUI PARA TROCAR DE LOJA)
export const SHOPIFY_CONFIG = {
  domain: 's1qbpp-6n.myshopify.com',
  storefrontAccessToken: 'f8b561a2fc2d25e9124114d58c0b7643',
  apiVersion: '2024-01'
}

// 📦 PRODUTOS ATIVOS (MUDE AQUI PARA TROCAR IDS)
export const PRODUCTS = {
  main: {
    id: '14698442916205',
    nodeIds: [
      'product-component-1750959272674',
      'product-component-1750658269915'
    ],
    name: 'Produto Principal',
    sku: 'OKCTYZ0013',
    price: 49.99
  },
  cap: {
    id: '14698443342189',
    nodeId: 'product-component-1750960182776',
    name: 'Boné Thunder',
    type: 'cap'
  },
  ball: {
    id: '14698443932013',
    nodeId: 'product-component-1750960235069',
    name: 'Bola Championship',
    type: 'ball'
  },
  pack: {
    id: '14698444128621',
    nodeId: 'product-component-1750960334759',
    name: 'Official Finals Pack',
    type: 'pack'
  }
}

// 🎨 ESTILOS DOS BOTÕES
export const BUTTON_STYLES = {
  backgroundColor: '#20a714',
  hoverColor: '#20a714',
  borderRadius: '40px'
}

// 🔧 FUNÇÕES UTILITÁRIAS
export const getProductsArray = () => {
  return [
    // Produto principal (aparece 2x)
    {
      id: PRODUCTS.main.id,
      nodeId: PRODUCTS.main.nodeIds[0],
      isRelated: false
    },
    {
      id: PRODUCTS.main.id,
      nodeId: PRODUCTS.main.nodeIds[1],
      isRelated: false
    },
    // Produtos relacionados
    {
      id: PRODUCTS.cap.id,
      nodeId: PRODUCTS.cap.nodeId,
      isRelated: true,
      type: 'cap'
    },
    {
      id: PRODUCTS.ball.id,
      nodeId: PRODUCTS.ball.nodeId,
      isRelated: true,
      type: 'ball'
    },
    {
      id: PRODUCTS.pack.id,
      nodeId: PRODUCTS.pack.nodeId,
      isRelated: true,
      type: 'pack'
    }
  ]
}

// 🏪 CONFIGURAÇÕES ALTERNATIVAS (PARA FÁCIL TROCA)
export const STORE_CONFIGS = {
  // Loja antiga (backup)
  old: {
    domain: 'sryxr0-ff.myshopify.com',
    storefrontAccessToken: 'cf54ba84fb3eeca3e76d2a30c008b2dc',
    products: {
      main: { id: '9791906021662' },
      cap: { id: '9792409469214' },
      ball: { id: '9792414712094' },
      pack: { id: '9792418545950' }
    }
  },
  
  // Loja nova (atual)
  new: {
    domain: 's1qbpp-6n.myshopify.com',
    storefrontAccessToken: 'f8b561a2fc2d25e9124114d58c0b7643',
    products: {
      main: { id: '14698442916205' },
      cap: { id: '14698443342189' },
      ball: { id: '14698443932013' }, //14698443932013
      pack: { id: '14698444128621' } //14698444128621
    }
  }
}

// 🔄 FUNÇÃO PARA TROCAR DE LOJA RAPIDAMENTE
export const switchToStore = (storeName) => {
  if (STORE_CONFIGS[storeName]) {
    const config = STORE_CONFIGS[storeName]
    console.log(`🔄 Trocando para loja: ${storeName}`)
    console.log(`📍 Domain: ${config.domain}`)
    console.log('⚠️ Atualize manualmente SHOPIFY_CONFIG e PRODUCTS com estes valores')
    return config
  } else {
    console.error('❌ Loja não encontrada:', storeName)
    return null
  }
}

// 📊 STATUS ATUAL
export const getCurrentStatus = () => {
  return {
    domain: SHOPIFY_CONFIG.domain,
    mainProductId: PRODUCTS.main.id,
    totalProducts: Object.keys(PRODUCTS).length,
    lastUpdated: new Date().toISOString()
  }
} 