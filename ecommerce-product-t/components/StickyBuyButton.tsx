"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Minus, Plus } from "lucide-react"
import { ShopifyBuyButtonCompact } from "@/components/buy-button"

interface StickyBuyButtonProps {
  price?: string
  originalPrice?: string
  discount?: number
  onAddToCart?: (quantity: number) => void
  onToggleWishlist?: () => void
  cartItems?: number
  isWishlisted?: boolean
}

export default function StickyBuyButton({
  price = "$73.57",
  originalPrice = "$125.99",
  discount = 42,
  onAddToCart,
  onToggleWishlist,
  cartItems = 0,
  isWishlisted = false
}: StickyBuyButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [showCart, setShowCart] = useState(false)

  const handleAddToCart = () => {
    onAddToCart?.(quantity)
    setShowCart(true)
    setTimeout(() => setShowCart(false), 2000) // Hide after 2 seconds
  }

  const CartIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 1024 1024" className={className} fill="currentColor">
      <path d="M384 775.3c30.3 0 54.9 24.6 54.9 54.9 0 30.3-24.6 54.9-54.9 54.8-30.3 0-54.9-24.6-54.9-54.8 0-30.3 24.6-54.9 54.9-54.9z m365.7 0c30.3 0 54.9 24.6 54.9 54.9 0 30.3-24.6 54.9-54.9 54.8-30.3 0-54.9-24.6-54.8-54.8 0-30.3 24.6-54.9 54.8-54.9z m-636.9-636.8l4.1 0.5 83.3 16c43.5 8.4 77.2 42.8 84.6 86.5l3 18.1 454.4 0.1c80.8 0 146.3 65.5 146.2 146.2 0 7.8-0.6 15.6-1.8 23.3l-26.7 165.3c-11.1 69.1-70.8 119.9-140.8 120l-310 0c-71.3 0-131.7-52.7-141.3-123.4l-39.8-291.1c-0.1-0.6-0.3-1.2-0.4-1.8l-7.7-45.7c-2.8-16.5-15.6-29.6-32.1-32.8l-83.4-16c-17.9-3.4-29.5-20.7-26.1-38.6 2.9-15.1 15.7-25.8 30.4-26.6l4.1 0z m629.4 187l-444.3 0 35.1 256.7c5.2 38 37.7 66.4 76.1 66.4l310 0c37.7 0 69.8-27.4 75.8-64.5l26.7-165.3c0.7-4.2 1-8.5 1-12.9 0-44.4-36-80.5-80.4-80.4z" />
    </svg>
  )

  return (
    <>
      {/* Sticky Buy Button - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto p-2">
          
          {/* Mobile Layout - Responsive adjustments */}
          <div className="md:hidden pt-1 pb-3 border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-orange-600">{price}</span>
                <span className="text-xs text-gray-500 line-through">{originalPrice}</span>
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                  -{discount}% OFF
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onToggleWishlist}
                  className={isWishlisted ? 'text-red-500 border-red-200' : ''}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
                
                <ShopifyBuyButtonCompact
                  domain="sryxr0-ff.myshopify.com"
                  storefrontAccessToken="cf54ba84fb3eeca3e76d2a30c008b2dc"
                  productId="9799464026398"
                  productName="Large Kitchen Pantry Cabinet Storage Organizer with Adjustable Shelves"
                  productPrice={73.57}
                  productImage="/placeholder.svg?height=400&width=400"
                  onAddToCart={(quantity) => {
                    onAddToCart?.(quantity)
                    setShowCart(true)
                    setTimeout(() => setShowCart(false), 2000)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Success Toast */}
      {showCart && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span>Produto adicionado ao carrinho!</span>
          </div>
        </div>
      )}
    </>
  )
} 