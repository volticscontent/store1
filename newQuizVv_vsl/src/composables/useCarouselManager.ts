import { ref, reactive, computed } from 'vue'
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
}

interface CarouselConfig {
  id: string
  title: string
  products: Product[]
  autoPlay: boolean
  autoPlayInterval: number
  slidesToShow: number
  showOnPages: string[]
  enabled: boolean
}

export function useCarouselManager() {
  // Estado global dos carrosseis
  const carousels = reactive<Map<string, CarouselConfig>>(new Map())
  
  // Configurações padrão
  const defaultConfig = {
    autoPlay: true,
    autoPlayInterval: 4000,
    slidesToShow: 2,
    enabled: true
  }

  // Inicializar carrosseis padrão
  function initializeCarousels() {
    // Carrossel de produtos principais
    registerCarousel({
      id: 'main-products',
      title: '🎯 Outros Produtos Exclusivos Thunder',
      products: productsData as Product[],
      showOnPages: ['products', 'completed'],
      ...defaultConfig
    })

    // Carrossel de produtos relacionados
    registerCarousel({
      id: 'related-products',
      title: '🔥 Você Também Pode Gostar',
      products: (productsData as Product[]).slice().reverse(),
      showOnPages: ['quiz', 'initial'],
      autoPlayInterval: 5000,
      slidesToShow: 3,
      ...defaultConfig
    })

    // Carrossel de ofertas especiais
    const specialOffers = (productsData as Product[]).map(product => ({
      ...product,
      discount: product.discount === '25%' ? '50%' : product.discount,
      badge: 'Oferta Especial'
    }))

    registerCarousel({
      id: 'special-offers',
      title: '⚡ Ofertas Relâmpago',
      products: specialOffers,
      showOnPages: ['completed'],
      autoPlayInterval: 3000,
      slidesToShow: 1,
      ...defaultConfig
    })
  }

  // Registrar um novo carrossel
  function registerCarousel(config: CarouselConfig) {
    carousels.set(config.id, config)
  }

  // Obter carrossel por ID
  function getCarousel(id: string): CarouselConfig | undefined {
    return carousels.get(id)
  }

  // Obter carrosseis para uma página específica
  function getCarouselsForPage(pageName: string): CarouselConfig[] {
    return Array.from(carousels.values()).filter(
      carousel => carousel.enabled && carousel.showOnPages.includes(pageName)
    )
  }

  // Atualizar configuração de um carrossel
  function updateCarouselConfig(id: string, updates: Partial<CarouselConfig>) {
    const carousel = carousels.get(id)
    if (carousel) {
      Object.assign(carousel, updates)
    }
  }

  // Ativar/desativar carrossel
  function toggleCarousel(id: string, enabled?: boolean) {
    const carousel = carousels.get(id)
    if (carousel) {
      carousel.enabled = enabled !== undefined ? enabled : !carousel.enabled
    }
  }

  // Adicionar produto a um carrossel
  function addProductToCarousel(carouselId: string, product: Product) {
    const carousel = carousels.get(carouselId)
    if (carousel) {
      const exists = carousel.products.find(p => p.id === product.id)
      if (!exists) {
        carousel.products.push(product)
      }
    }
  }

  // Remover produto de um carrossel
  function removeProductFromCarousel(carouselId: string, productId: number) {
    const carousel = carousels.get(carouselId)
    if (carousel) {
      carousel.products = carousel.products.filter(p => p.id !== productId)
    }
  }

  // Filtrar produtos por categoria
  function getProductsByCategory(category: string): Product[] {
    return (productsData as Product[]).filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    )
  }

  // Criar carrossel dinâmico por categoria
  function createCategoryCarousel(category: string, pageName: string) {
    const products = getProductsByCategory(category)
    if (products.length > 0) {
      const carouselId = `${category.toLowerCase()}-carousel`
      registerCarousel({
        id: carouselId,
        title: `🏆 ${category} Thunder`,
        products,
        showOnPages: [pageName],
        ...defaultConfig
      })
      return carouselId
    }
    return null
  }

  // Analytics e tracking
  const carouselMetrics = reactive({
    views: new Map<string, number>(),
    interactions: new Map<string, number>(),
    clickThroughs: new Map<string, number>()
  })

  function trackCarouselView(carouselId: string) {
    const current = carouselMetrics.views.get(carouselId) || 0
    carouselMetrics.views.set(carouselId, current + 1)
  }

  function trackCarouselInteraction(carouselId: string) {
    const current = carouselMetrics.interactions.get(carouselId) || 0
    carouselMetrics.interactions.set(carouselId, current + 1)
  }

  function trackCarouselClickThrough(carouselId: string) {
    const current = carouselMetrics.clickThroughs.get(carouselId) || 0
    carouselMetrics.clickThroughs.set(carouselId, current + 1)
  }

  // Estado dos carrosseis
  const activeCarousels = computed(() => 
    Array.from(carousels.values()).filter(c => c.enabled)
  )

  const totalProducts = computed(() => 
    Array.from(carousels.values()).reduce((total, carousel) => 
      total + carousel.products.length, 0
    )
  )

  // Inicializar automaticamente
  initializeCarousels()

  return {
    // Estado
    carousels: carousels as ReadonlyMap<string, CarouselConfig>,
    activeCarousels,
    totalProducts,
    carouselMetrics,

    // Métodos de gerenciamento
    registerCarousel,
    getCarousel,
    getCarouselsForPage,
    updateCarouselConfig,
    toggleCarousel,

    // Métodos de produtos
    addProductToCarousel,
    removeProductFromCarousel,
    getProductsByCategory,
    createCategoryCarousel,

    // Métodos de tracking
    trackCarouselView,
    trackCarouselInteraction,
    trackCarouselClickThrough,

    // Configurações
    defaultConfig
  }
} 