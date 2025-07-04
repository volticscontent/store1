import { useState, useEffect } from 'react'

// Interface para um review individual
export interface Review {
  id: number
  productId: number
  user: {
    name: string
    initial: string
    avatar: string
    verified: boolean
    badges: string[]
    totalReviews: number
    helpfulVotes: number
  }
  rating: number
  title: string
  content: string
  date: string
  dateFormatted: string
  helpful: {
    count: number
    total: number
  }
  verified: boolean
  photos: string[]
  pros: string[]
  cons: string[]
  tags: string[]
  category: 'Positive' | 'Mixed' | 'Negative'
  sentiment: 'very_positive' | 'positive' | 'neutral' | 'negative' | 'very_negative'
  language: string
}

// Interface para estatísticas dos reviews
export interface ReviewStatistics {
  totalReviews: number
  averageRating: number
  ratingDistribution: {
    [key: string]: number
  }
  verifiedPurchases: number
  reviewsWithPhotos: number
  totalPhotos: number
  totalHelpfulVotes: number
  languages: {
    [key: string]: number
  }
  sentimentAnalysis: {
    [key: string]: number
  }
}

// Interface para filtros
export interface ReviewFilters {
  ratings: Array<{
    value: string
    label: string
    count: number
  }>
  verified: Array<{
    value: string
    label: string
    count: number
  }>
  photos: Array<{
    value: string
    label: string
    count: number
  }>
  language: Array<{
    value: string
    label: string
    count: number
  }>
  sentiment: Array<{
    value: string
    label: string
    count: number
  }>
}

// Interface para dados completos dos reviews
export interface ReviewsData {
  reviews: Review[]
  statistics: ReviewStatistics
  filters: ReviewFilters
  sorting: {
    options: Array<{
      value: string
      label: string
    }>
    default: string
  }
  categories: Array<{
    id: string
    name: string
    description: string
    color: string
    count: number
  }>
  trending: {
    tags: Array<{
      tag: string
      count: number
      trend: string
    }>
    topics: Array<{
      topic: string
      sentiment: string
      count: number
    }>
  }
  moderation: {
    guidelines: string[]
    autoModeration: boolean
    humanReview: boolean
  }
  metadata: {
    lastUpdated: string
    version: string
    totalProducts: number
    dataSource: string
    qualityScore: number
    completenessScore: number
  }
}

export const useReviews = (productId?: number) => {
  const [data, setData] = useState<ReviewsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([])

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true)
        // Usando a API endpoint ao invés do arquivo estático
        const response = await fetch('/api/reviews')
        
        if (!response.ok) {
          throw new Error('Falha ao carregar dados dos reviews')
        }
        
        const reviewsData: ReviewsData = await response.json()
        setData(reviewsData)
        
        // Filtrar por produto se especificado
        const reviews = productId 
          ? reviewsData.reviews.filter(review => review.productId === productId)
          : reviewsData.reviews
          
        setFilteredReviews(reviews)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
        console.error('Erro ao carregar reviews:', err)
        
        // Fallback para arquivo estático se API falhar
        try {
          const fallbackResponse = await fetch('/data/reviews.json')
          if (fallbackResponse.ok) {
            const fallbackData: ReviewsData = await fallbackResponse.json()
            setData(fallbackData)
            const reviews = productId 
              ? fallbackData.reviews.filter(review => review.productId === productId)
              : fallbackData.reviews
            setFilteredReviews(reviews)
            setError(null)
          }
        } catch (fallbackErr) {
          console.error('Fallback também falhou:', fallbackErr)
        }
      } finally {
        setLoading(false)
      }
    }

    loadReviews()
  }, [productId])

  // Função para filtrar reviews
  const filterReviews = (filters: {
    rating?: string
    verified?: string
    photos?: string
    language?: string
    sentiment?: string
  }) => {
    if (!data) return []

    let filtered = data.reviews

    // Filtrar por produto se especificado
    if (productId) {
      filtered = filtered.filter(review => review.productId === productId)
    }

    // Aplicar filtros
    if (filters.rating && filters.rating !== 'all') {
      filtered = filtered.filter(review => review.rating.toString() === filters.rating)
    }

    if (filters.verified && filters.verified !== 'all') {
      if (filters.verified === 'verified') {
        filtered = filtered.filter(review => review.verified)
      } else {
        filtered = filtered.filter(review => !review.verified)
      }
    }

    if (filters.photos && filters.photos !== 'all') {
      if (filters.photos === 'with_photos') {
        filtered = filtered.filter(review => review.photos.length > 0)
      } else {
        filtered = filtered.filter(review => review.photos.length === 0)
      }
    }

    if (filters.language && filters.language !== 'all') {
      filtered = filtered.filter(review => review.language === filters.language)
    }

    if (filters.sentiment && filters.sentiment !== 'all') {
      if (filters.sentiment === 'positive') {
        filtered = filtered.filter(review => 
          review.sentiment === 'positive' || review.sentiment === 'very_positive'
        )
      } else if (filters.sentiment === 'negative') {
        filtered = filtered.filter(review => 
          review.sentiment === 'negative' || review.sentiment === 'very_negative'
        )
      } else {
        filtered = filtered.filter(review => review.sentiment === filters.sentiment)
      }
    }

    setFilteredReviews(filtered)
    return filtered
  }

  // Função para ordenar reviews
  const sortReviews = (sortBy: string) => {
    if (!filteredReviews.length) return []

    let sorted = [...filteredReviews]

    switch (sortBy) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case 'oldest':
        sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case 'highest_rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case 'lowest_rating':
        sorted.sort((a, b) => a.rating - b.rating)
        break
      case 'most_helpful':
        sorted.sort((a, b) => b.helpful.count - a.helpful.count)
        break
      case 'least_helpful':
        sorted.sort((a, b) => a.helpful.count - b.helpful.count)
        break
      default:
        // newest por padrão
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }

    setFilteredReviews(sorted)
    return sorted
  }

  // Função para buscar reviews por texto
  const searchReviews = (query: string) => {
    if (!data || !query.trim()) {
      setFilteredReviews(data?.reviews || [])
      return data?.reviews || []
    }

    const lowercaseQuery = query.toLowerCase()
    const filtered = data.reviews.filter(review =>
      review.title.toLowerCase().includes(lowercaseQuery) ||
      review.content.toLowerCase().includes(lowercaseQuery) ||
      review.user.name.toLowerCase().includes(lowercaseQuery) ||
      review.pros.some(pro => pro.toLowerCase().includes(lowercaseQuery)) ||
      review.cons.some(con => con.toLowerCase().includes(lowercaseQuery)) ||
      review.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )

    setFilteredReviews(filtered)
    return filtered
  }

  // Função para obter reviews por categoria
  const getReviewsByCategory = (category: string) => {
    if (!data) return []
    return data.reviews.filter(review => 
      review.category.toLowerCase() === category.toLowerCase()
    )
  }

  // Função para obter reviews com fotos
  const getReviewsWithPhotos = () => {
    if (!data) return []
    return data.reviews.filter(review => review.photos.length > 0)
  }

  // Função para obter reviews verificados
  const getVerifiedReviews = () => {
    if (!data) return []
    return data.reviews.filter(review => review.verified)
  }

  // Função para obter estatísticas resumidas
  const getSummaryStats = () => {
    if (!filteredReviews.length) return null

    const totalRating = filteredReviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = totalRating / filteredReviews.length

    const ratingCounts = filteredReviews.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1
      return acc
    }, {} as { [key: number]: number })

    return {
      totalReviews: filteredReviews.length,
      averageRating: Math.round(averageRating * 10) / 10,
      ratingDistribution: ratingCounts,
      withPhotos: filteredReviews.filter(r => r.photos.length > 0).length,
      verified: filteredReviews.filter(r => r.verified).length
    }
  }

  return {
    // Dados originais
    data,
    reviews: filteredReviews,
    allReviews: data?.reviews || [],
    statistics: data?.statistics,
    filters: data?.filters,
    sorting: data?.sorting,
    categories: data?.categories,
    trending: data?.trending,
    metadata: data?.metadata,
    
    // Funções de manipulação
    filterReviews,
    sortReviews,
    searchReviews,
    getReviewsByCategory,
    getReviewsWithPhotos,
    getVerifiedReviews,
    getSummaryStats,
    
    // Estados
    loading,
    error
  }
} 