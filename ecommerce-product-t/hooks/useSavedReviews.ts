import { useState, useEffect } from 'react'
import { Review } from './useReviews'

export const useSavedReviews = () => {
  const [savedReviews, setSavedReviews] = useState<Review[]>([])

  // Carregar reviews salvos do localStorage ao inicializar
  useEffect(() => {
    const saved = localStorage.getItem('savedReviews')
    if (saved) {
      try {
        setSavedReviews(JSON.parse(saved))
      } catch (error) {
        console.error('Erro ao carregar reviews salvos:', error)
      }
    }
  }, [])

  // Salvar um review
  const saveReview = (review: Review) => {
    const newSavedReviews = [...savedReviews, review]
    setSavedReviews(newSavedReviews)
    localStorage.setItem('savedReviews', JSON.stringify(newSavedReviews))
  }

  // Remover um review salvo
  const removeSavedReview = (reviewId: number) => {
    const newSavedReviews = savedReviews.filter(review => review.id !== reviewId)
    setSavedReviews(newSavedReviews)
    localStorage.setItem('savedReviews', JSON.stringify(newSavedReviews))
  }

  // Verificar se um review está salvo
  const isReviewSaved = (reviewId: number) => {
    return savedReviews.some(review => review.id === reviewId)
  }

  return {
    savedReviews,
    saveReview,
    removeSavedReview,
    isReviewSaved
  }
} 