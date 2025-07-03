"use client"

import { useState } from "react"
import { X, Star, Filter, Search, Bookmark } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Review, ReviewStatistics } from "@/hooks/useReviews"
import { useSavedReviews } from "@/hooks/useSavedReviews"

interface ReviewsModalProps {
  reviews: Review[]
  stats?: ReviewStatistics
  onClose: () => void
  filters?: any
  setFilters?: (filters: any) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
  isLoading?: boolean
}

export default function ReviewsModal({
  reviews,
  stats,
  onClose,
  filters,
  setFilters,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  isLoading = false
}: ReviewsModalProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [showSavedOnly, setShowSavedOnly] = useState(false)
  const { savedReviews, saveReview, removeSavedReview, isReviewSaved } = useSavedReviews()

  // Filtrar reviews baseado na seleção (todos ou apenas salvos)
  const displayedReviews = showSavedOnly 
    ? reviews.filter(review => isReviewSaved(review.id))
    : reviews

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {showSavedOnly ? "Comentários Salvos" : "Comentários dos Clientes"} ({displayedReviews.length})
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Search and Filters */}
          <div className="mt-4 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar comentários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="px-4"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button
              variant={showSavedOnly ? "default" : "outline"}
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className="px-4"
            >
              <Bookmark className={`h-4 w-4 mr-2 ${showSavedOnly ? "fill-current" : ""}`} />
              Salvos
            </Button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="newest">Mais Recentes</option>
              <option value="oldest">Mais Antigos</option>
              <option value="highest_rating">Maior Avaliação</option>
              <option value="lowest_rating">Menor Avaliação</option>
              <option value="most_helpful">Mais Úteis</option>
            </select>
          </div>

          {/* Quick Stats */}
          {stats && !showSavedOnly && (
            <div className="mt-4 grid grid-cols-5 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{stats.averageRating}</div>
                <div className="text-sm text-gray-500">Média</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.totalReviews}</div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.verifiedPurchases}</div>
                <div className="text-sm text-gray-500">Verificados</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.reviewsWithPhotos}</div>
                <div className="text-sm text-gray-500">Com Fotos</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.totalHelpfulVotes}</div>
                <div className="text-sm text-gray-500">Votos Úteis</div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="text-center py-8">Carregando comentários...</div>
          ) : displayedReviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {showSavedOnly 
                ? "Você ainda não salvou nenhum comentário."
                : "Nenhum comentário encontrado com os critérios selecionados."}
            </div>
          ) : (
            <div className="space-y-6">
              {displayedReviews.map((review) => {
                const colors = ['bg-orange-500', 'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-pink-500', 'bg-indigo-500']
                const colorIndex = review.id % colors.length
                const avatarColor = colors[colorIndex]
                const isSaved = isReviewSaved(review.id)

                return (
                  <div key={review.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 ${avatarColor} rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0`}
                      >
                        {review.user.initial}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{review.user.name}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-orange-500 text-orange-500"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.dateFormatted}</span>
                          {review.verified && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              ✓ Compra Verificada
                            </span>
                          )}
                        </div>

                        {review.title && (
                          <h4 className="font-medium mb-2">{review.title}</h4>
                        )}

                        <p className="text-gray-700 mb-3">{review.content}</p>

                        {/* Pros and Cons */}
                        {(review.pros?.length > 0 || review.cons?.length > 0) && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            {review.pros?.length > 0 && (
                              <div>
                                <h5 className="text-sm font-medium text-green-700 mb-1">Prós:</h5>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {review.pros.map((pro, index) => (
                                    <li key={index} className="flex items-start">
                                      <span className="text-green-500 mr-1">+</span>
                                      {pro}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {review.cons?.length > 0 && (
                              <div>
                                <h5 className="text-sm font-medium text-red-700 mb-1">Contras:</h5>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {review.cons.map((con, index) => (
                                    <li key={index} className="flex items-start">
                                      <span className="text-red-500 mr-1">-</span>
                                      {con}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Photos */}
                        {review.photos?.length > 0 && (
                          <div className="flex gap-2 mb-3">
                            {review.photos.slice(0, 4).map((photo, index) => (
                              <Image
                                key={index}
                                src={photo}
                                alt="Foto do comentário"
                                width={80}
                                height={80}
                                className="rounded border object-cover"
                              />
                            ))}
                            {review.photos.length > 4 && (
                              <div className="w-20 h-20 rounded border bg-gray-100 flex items-center justify-center text-sm text-gray-600">
                                +{review.photos.length - 4}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-4 text-sm">
                          <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                            <svg viewBox="0 0 1024 1024" className="h-4 w-4" fill="currentColor">
                              <path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 0 0 471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.8-5.4 99.3-41.3 180.7-131 180.7-244.2 0-36.3-7.5-72.4-21.9-105.8z" />
                            </svg>
                            Útil ({review.helpful?.count || 0})
                          </button>
                          <button 
                            onClick={() => isSaved ? removeSavedReview(review.id) : saveReview(review)}
                            className={`flex items-center gap-1 ${isSaved ? 'text-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
                          >
                            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                            {isSaved ? 'Salvo' : 'Salvar'}
                          </button>
                          {review.user.badges?.map((badge, index) => (
                            <span
                              key={index}
                              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 