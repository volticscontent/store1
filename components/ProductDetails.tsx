"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Review } from "@/hooks/useReviews"

interface ProductDetailsProps {
  images?: string[]
  title?: string
  price?: string
  originalPrice?: string
  discount?: number
  rating?: number
  totalReviews?: number
  reviews?: Review[]
  onShowAllReviews?: () => void
  reviewsLoading?: boolean
}

export default function ProductDetails({
  images = [
    "https://picsum.photos/400/400?random=10",
    "https://picsum.photos/400/400?random=11", 
    "https://picsum.photos/400/400?random=12",
    "https://picsum.photos/400/400?random=13",
    "https://picsum.photos/400/400?random=14",
    "https://picsum.photos/400/400?random=15",
    "https://picsum.photos/400/400?random=16",
  ],
  title = "Adjustable air conditioning deflector 8pcs wall-mounted deflectors",
  price = "$45.99",
  originalPrice = "$65.99", 
  discount = 30,
  rating = 4.5,
  totalReviews = 1250,
  reviews = [],
  onShowAllReviews,
  reviewsLoading = false
}: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return
    
    const touchEnd = e.touches[0].clientX
    const diff = touchStart - touchEnd
    
    if (Math.abs(diff) > 50) {
      if (diff > 0 && selectedImage < images.length - 1) {
        setSelectedImage(selectedImage + 1)
      } else if (diff < 0 && selectedImage > 0) {
        setSelectedImage(selectedImage - 1)
      }
      setTouchStart(null)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative">
            <Image
              src={images[selectedImage]}
              alt="Product image"
              width={600}
              height={600}
              className="w-full rounded-lg shadow-lg"
              priority
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            />
            
            {/* Image Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === selectedImage ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-4 gap-2">
            {images.slice(0, 8).map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded border-2 overflow-hidden transition-all ${
                  index === selectedImage 
                    ? 'border-orange-500 ring-2 ring-orange-200' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image
                  src={image}
                  alt={`Product image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          {/* Title and Rating */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {title}
            </h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-lg font-semibold">{rating}</span>
              </div>
              <span className="text-gray-500">({totalReviews.toLocaleString()} reviews)</span>
            </div>
          </div>

          {/* Price and Discount */}
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-orange-600">{price}</span>
              <span className="text-lg text-gray-500 line-through">{originalPrice}</span>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                -{discount}% OFF
              </span>
            </div>
            <p className="text-sm text-gray-600">Free shipping • Fast delivery</p>
          </div>

          {/* Product Features */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Key Features:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Adjustable air flow direction for optimal cooling
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Easy wall-mounted installation
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                8-piece set for complete room coverage
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Anti-condensation design
              </li>
            </ul>
          </div>

          {/* Desktop Buy Buttons */}
          <div className="hidden lg:block space-y-4">
            <div className="flex gap-3">
              <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Free returns • 30-day money back guarantee
            </p>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-12">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Customer Reviews</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onShowAllReviews}
            >
              View All Reviews ({totalReviews.toLocaleString()})
            </Button>
          </div>
          
          <div className="space-y-4">
            {reviewsLoading ? (
              <div className="text-center py-4">Carregando reviews...</div>
            ) : reviews.slice(0, 3).map((review) => {
              // Gerar cor baseada no ID do review
              const colors = ['bg-orange-500', 'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-pink-500', 'bg-indigo-500']
              const colorIndex = review.id % colors.length
              const avatarColor = colors[colorIndex]
              
              return (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 ${avatarColor} rounded-full flex items-center justify-center text-white text-sm font-medium`}
                    >
                      {review.user.initial}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{review.user.name}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < review.rating ? "fill-orange-500 text-orange-500" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">{review.dateFormatted}</span>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{review.content}</p>
                      {review.photos.length > 0 && (
                        <div className="flex gap-2 mb-2">
                          {review.photos.slice(0, 2).map((photo, index) => (
                            <Image
                              key={index}
                              src={photo}
                              alt="Review photo"
                              width={60}
                              height={60}
                              className="rounded border"
                            />
                          ))}
                          {review.photos.length > 2 && (
                            <div className="w-[60px] h-[60px] rounded border bg-gray-100 flex items-center justify-center text-xs text-gray-600">
                              +{review.photos.length - 2}
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <button className="flex items-center gap-1 hover:text-gray-700">
                          <svg viewBox="0 0 1024 1024" className="h-3 w-3" fill="currentColor">
                            <path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 0 0 471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.8-5.4 99.3-41.3 180.7-131 180.7-244.2 0-36.3-7.5-72.4-21.9-105.8z" />
                          </svg>
                          Helpful ({review.helpful.count})
                        </button>
                        <button className="hover:text-gray-700">Share</button>
                        {review.user.badges.includes('Top Reviewer') && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            Top Reviewer
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <Button 
            variant="outline" 
            className="w-full mt-4 bg-transparent"
            onClick={onShowAllReviews}
          >
            View All Reviews ({totalReviews.toLocaleString()})
          </Button>
        </div>
      </div>
    </div>
  )
} 