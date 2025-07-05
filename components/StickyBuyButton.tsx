"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ChevronUp, ChevronDown } from "lucide-react"
import { ShopifyBuyButtonCompact } from "@/components/buy-button"

interface StickyBuyButtonProps {
  price?: string
  originalPrice?: string
  discount?: number
  productId?: string
  productName?: string
  productImage?: string
  onAddToCart?: (quantity: number) => void
  cartItems?: number
  selectedVariant?: string
  onVariantChange?: (variantId: string) => void
  selectedBundle?: string
  onBundleChange?: (bundleId: string) => void
}

export default function StickyBuyButton({
  price = "$49.00",
  originalPrice = "$120.00",
  discount = 59,
  productId = "49921179386142",
  productName = "Mystery Box Fragrance",
  productImage = "/Caixa 3 perfumes home.png",
  onAddToCart,
  cartItems = 0,
  selectedVariant = "Female",
  onVariantChange,
  selectedBundle = "1-3-units",
  onBundleChange
}: StickyBuyButtonProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Opções de bundles com preços
  const bundleOptions = [
    {
      id: "1-3-units",
      title: "1-3 Units",
      price: 49.00,
      originalPrice: 120.00,
      discount: 59
    },
    {
      id: "4-6-units", 
      title: "4-6 Units",
      price: 59.00,
      originalPrice: 299.00,
      discount: 80
    },
    {
      id: "7-10-units",
      title: "7-10 Units", 
      price: 79.00,
      originalPrice: 349.00,
      discount: 77
    }
  ]

  // Variantes de gênero
  const variants = ["Female", "Male", "Unisex"]

  // Fechar quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  const handleAddToCart = (quantity: number) => {
    onAddToCart?.(quantity)
    setShowCart(true)
    setTimeout(() => setShowCart(false), 2000)
  }

  const getCurrentBundle = () => {
    return bundleOptions.find(b => b.id === selectedBundle) || bundleOptions[0]
  }

  return (
    <>
      {/* Sticky Buy Button - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        {/* Main Sticky Bar */}
        <div className="max-w-7xl mx-auto p-3">
          <div className="flex items-center justify-between">
            {/* Price Info */}
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-orange-600">{price}</span>
              <span className="text-xs text-gray-500 line-through">{originalPrice}</span>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                -{discount}% OFF
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Bundle + Variant Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 text-sm"
                >
                  <span className="font-medium">{selectedVariant} - {getCurrentBundle().title}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showDropdown && (
                  <div className="absolute bottom-full mb-2 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[250px]">
                    <div className="p-1">
                      {bundleOptions.map((bundle) => (
                        <div key={bundle.id}>
                          {variants.map((variant) => (
                            <div
                              key={`${bundle.id}-${variant}`}
                              className={`p-2 text-sm cursor-pointer hover:bg-gray-50 rounded ${
                                selectedBundle === bundle.id && selectedVariant === variant 
                                  ? 'bg-orange-50 text-orange-600' 
                                  : 'text-gray-700'
                              }`}
                              onClick={() => {
                                onBundleChange?.(bundle.id)
                                onVariantChange?.(variant)
                                setShowDropdown(false)
                              }}
                            >
                              {variant} / {bundle.title} - R$ {bundle.price.toFixed(2)}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Buy Button */}
              <ShopifyBuyButtonCompact
                domain="sryxr0-ff.myshopify.com"
                storefrontAccessToken="d336896a895872e293d9ea97de63b99c"
                productId={productId}
                productName={productName}
                productPrice={parseFloat(price.replace('$', ''))}
                productImage={productImage}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cart notification */}
      {showCart && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span className="text-sm">Adicionado ao carrinho!</span>
          </div>
        </div>
      )}
    </>
  )
} 