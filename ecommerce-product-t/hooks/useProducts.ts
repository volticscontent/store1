import { useState, useEffect } from 'react'

// Nova interface para o produto atualizado
export interface Product {
  id: number
  title: string
  description: string
  shortDescription: string
  price: {
    current: number
    original: number
    currency: string
    discount: number
  }
  rating: {
    average: number
    total: number
    stars: {
      "5": number
      "4": number
      "3": number
      "2": number
      "1": number
    }
  }
  images: {
    main: string
    gallery: string[]
    thumbnail: string
  }
  specifications: {
    material: string
    dimensions: string
    weight: string
    color: string
    warranty: string
  }
  category: string
  tags: string[]
  stock: {
    available: boolean
    quantity: number
    soldCount: number
  }
  shipping: {
    free: boolean
    cost?: number
    estimatedDays: string
  }
  featured: boolean
  trending: boolean
}

// Interface para categoria
export interface Category {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

// Interface para filtros
export interface Filters {
  priceRanges: Array<{
    min: number
    max: number
    label: string
  }>
  ratings: Array<{
    min: number
    label: string
  }>
  availability: Array<{
    value: string
    label: string
  }>
}

// Interface principal dos dados
export interface ProductsData {
  products: Product[]
  categories: Category[]
  filters: Filters
  settings: {
    currency: string
    language: string
    itemsPerPage: number
    enableFilters: boolean
    enableSearch: boolean
    enableWishlist: boolean
    enableQuickView: boolean
  }
  metadata: {
    lastUpdated: string
    version: string
    totalProducts: number
    totalCategories: number
    averageRating: number
    totalReviews: number
  }
}

// Interface para compatibilidade com código legado
export interface LegacyProduct {
  id: number
  name: string
  price: string
  originalPrice: string
  rating: number
  image: string
  category: string
  inStock: boolean
  discount: number
  soldCount: number
  trending?: boolean
}

export const useProducts = () => {
  const [data, setData] = useState<ProductsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        // Usando a API endpoint ao invés do arquivo estático
        const response = await fetch('/api/products')
        
        if (!response.ok) {
          throw new Error('Falha ao carregar dados dos produtos')
        }
        
        const productsData: ProductsData = await response.json()
        setData(productsData)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
        console.error('Erro ao carregar produtos:', err)
        
        // Fallback para arquivo estático se API falhar
        try {
          const fallbackResponse = await fetch('/data/products.json')
          if (fallbackResponse.ok) {
            const fallbackData: ProductsData = await fallbackResponse.json()
            setData(fallbackData)
            setError(null)
          }
        } catch (fallbackErr) {
          console.error('Fallback também falhou:', fallbackErr)
        }
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Função para converter produto novo para formato legado
  const convertToLegacyProduct = (product: Product): LegacyProduct => ({
    id: product.id,
    name: product.title,
    price: `${product.price.currency} ${product.price.current.toFixed(2)}`,
    originalPrice: `${product.price.currency} ${product.price.original.toFixed(2)}`,
    rating: product.rating.average,
    image: product.images.main,
    category: product.category,
    inStock: product.stock.available,
    discount: product.price.discount,
    soldCount: product.stock.soldCount,
    trending: product.trending
  })

  // Funções utilitárias para compatibilidade
  const getPopularProducts = (): LegacyProduct[] => {
    if (!data) return []
    return data.products
      .filter(product => product.featured)
      .map(convertToLegacyProduct)
  }

  const getTrendingProducts = (): LegacyProduct[] => {
    if (!data) return []
    return data.products
      .filter(product => product.trending)
      .map(convertToLegacyProduct)
  }

  const getAllProducts = (): LegacyProduct[] => {
    if (!data) return []
    return data.products.map(convertToLegacyProduct)
  }

  const getProductsByCategory = (category: string): LegacyProduct[] => {
    if (!data) return []
    return data.products
      .filter(product => product.category === category)
      .map(convertToLegacyProduct)
  }

  const getFeaturedProducts = (): Product[] => {
    if (!data) return []
    return data.products.filter(product => product.featured)
  }

  const getTrendingProductsNew = (): Product[] => {
    if (!data) return []
    return data.products.filter(product => product.trending)
  }

  const getProductById = (id: number): Product | undefined => {
    if (!data) return undefined
    return data.products.find(product => product.id === id)
  }

  const searchProducts = (query: string): Product[] => {
    if (!data || !query) return []
    const lowercaseQuery = query.toLowerCase()
    return data.products.filter(product => 
      product.title.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  }

  const filterProductsByPrice = (min: number, max: number): Product[] => {
    if (!data) return []
    return data.products.filter(product => 
      product.price.current >= min && product.price.current <= max
    )
  }

  const filterProductsByRating = (minRating: number): Product[] => {
    if (!data) return []
    return data.products.filter(product => product.rating.average >= minRating)
  }

  // Configurações do carrossel para compatibilidade
  const carouselSettings = {
    autoplay: {
      delay: 4000,
      stopOnInteraction: false
    },
    popularItems: {
      direction: "forward",
      theme: "orange",
      title: "Produtos Populares",
      icon: "fire"
    },
    trendingItems: {
      direction: "backward", 
      theme: "blue",
      title: "Em Alta",
      icon: "trending"
    }
  }

  return {
    // Dados originais
    data,
    products: data?.products || [],
    categories: data?.categories || [],
    filters: data?.filters,
    settings: data?.settings,
    metadata: data?.metadata,
    
    // Para compatibilidade com código legado
    popularProducts: getPopularProducts(),
    trendingProducts: getTrendingProducts(),
    allProducts: getAllProducts(),
    carouselSettings,
    
    // Novas funções
    getFeaturedProducts,
    getTrendingProductsNew,
    getProductById,
    getProductsByCategory,
    searchProducts,
    filterProductsByPrice,
    filterProductsByRating,
    
    // Estados
    loading,
    error
  }
} 