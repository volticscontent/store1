import { useState, useEffect } from 'react'
import reviewsData from '@/data/reviews.json'

// Interface para um review individual (simplificada)
export interface Review {
  id: number
  name: string
  initial: string
  color: string
  rating: number
  date: string
  text: string
  photo?: string
}

// Interface para dados completos dos reviews (simplificada)
export interface ReviewsData {
  reviews: Review[]
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
        
        // Usando os dados importados diretamente
        const reviewsDataFormatted: ReviewsData = {
          reviews: reviewsData
        }
        
        setData(reviewsDataFormatted)
        setFilteredReviews(reviewsData)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        console.error('Error loading reviews:', err)
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

    // Aplicar filtros
    if (filters.rating && filters.rating !== 'all') {
      filtered = filtered.filter(review => review.rating.toString() === filters.rating)
    }

    if (filters.photos && filters.photos !== 'all') {
      if (filters.photos === 'with_photos') {
        filtered = filtered.filter(review => review.photo)
      } else {
        filtered = filtered.filter(review => !review.photo)
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
      review.text.toLowerCase().includes(lowercaseQuery) ||
      review.name.toLowerCase().includes(lowercaseQuery)
    )

    setFilteredReviews(filtered)
    return filtered
  }

  // Função para obter reviews com fotos
  const getReviewsWithPhotos = () => {
    if (!data) return []
    return data.reviews.filter(review => review.photo)
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
      withPhotos: filteredReviews.filter(r => r.photo).length,
      verified: filteredReviews.length
    }
  }

  return {
    // Dados originais
    data,
    reviews: filteredReviews,
    allReviews: data?.reviews || [],
    
    // Funções de manipulação
    filterReviews,
    sortReviews,
    searchReviews,
    getReviewsWithPhotos,
    getSummaryStats,
    
    // Estados
    loading,
    error
  }
} 