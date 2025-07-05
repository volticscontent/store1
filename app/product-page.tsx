"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Menu, User, Search, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Footer from "@/components/Footer"
import StickyBuyButton from "@/components/StickyBuyButton"
import ReviewsModal from "@/components/ReviewsModal"
import { useReviews } from "@/hooks/useReviews"
import { ShopifyBuyButton } from "@/components/buy-button"
import reviewsData from "@/data/reviews.json"
import relatedProductsData from "@/data/related-products.json"

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [cartItems, setCartItems] = useState(0)
  const [showCart, setShowCart] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [expandedFooterSection, setExpandedFooterSection] = useState<string | null>("Help")
  const [showReviewsModal, setShowReviewsModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedBundle, setSelectedBundle] = useState("1-3-units")
  const [expandedProductSection, setExpandedProductSection] = useState<string | null>(null)
  const [stickyExpanded, setStickyExpanded] = useState(false)
  
  // Restaurar o sistema de bundles original
  const [bundleVariants, setBundleVariants] = useState({
    "1-3-units": "Female",
    "4-6-units": "Female", 
    "7-10-units": "Female"
  })

  // Opções de bundles
  const bundleOptions = [
    {
      id: "1-3-units",
      title: "1-3 Units",
      price: 49.00,
      originalPrice: 120.00,
      discount: 59,
      items: ["1x Mystery Box", "2x Bonus Samples", "1x Travel Case"]
    },
    {
      id: "4-6-units", 
      title: "4-6 Units",
      price: 59.00,
      originalPrice: 299.00,
      discount: 80,
      items: ["1x Mystery Box", "5x Bonus Samples", "1x Premium Travel Case", "1x Exclusive Scent"]
    },
    {
      id: "7-10-units",
      title: "7-10 Units", 
      price: 79.00,
      originalPrice: 349.00,
      discount: 77,
      items: ["2x Mystery Box", "8x Bonus Samples", "1x Luxury Travel Case", "2x Exclusive Scents", "1x VIP Access"]
    }
  ]

  // Mapeamento de produtos baseado no bundle e variante
  const productVariantMap = {
    "Female-1-3-units": "49921179386142",
    "Male-1-3-units": "49921540882718", 
    "Unisex-1-3-units": "49921540915486",
    "Female-4-6-units": "49921179418910",
    "Male-4-6-units": "49921540948254",
    "Unisex-4-6-units": "49921540981022", 
    "Female-7-10-units": "49921179451678",
    "Male-7-10-units": "49921541013790",
    "Unisex-7-10-units": "49921541046558"
  }

  // Função para atualizar variante do bundle
  const updateBundleVariant = (bundleId: string, variant: string) => {
    setBundleVariants(prev => ({
      ...prev,
      [bundleId]: variant
    }))
  }

  // Função para obter o Product ID correto baseado na seleção
  const getSelectedProductId = () => {
    const variant = bundleVariants[selectedBundle as keyof typeof bundleVariants]
    const key = `${variant}-${selectedBundle}` as keyof typeof productVariantMap
    return productVariantMap[key] || "49921179386142"
  }

  // Função para obter o preço correto baseado na seleção
  const getSelectedPrice = () => {
    const bundle = bundleOptions.find(b => b.id === selectedBundle)
    return bundle?.price || 49.00
  }

  // Função para obter o preço original baseado na seleção
  const getSelectedOriginalPrice = () => {
    const bundle = bundleOptions.find(b => b.id === selectedBundle)
    return bundle?.originalPrice || 120.00
  }

  // Função para obter o desconto baseado na seleção
  const getSelectedDiscount = () => {
    const bundle = bundleOptions.find(b => b.id === selectedBundle)
    return bundle?.discount || 59
  }

  // Função para obter o nome do produto baseado na seleção
  const getSelectedProductName = () => {
    const bundle = bundleOptions.find(b => b.id === selectedBundle)
    const variant = bundleVariants[selectedBundle as keyof typeof bundleVariants]
    return `Mystery Box Fragrance - ${variant} ${bundle?.title || "1-3 Units"}`
  }

  const { data: reviewsHookData } = useReviews(1) // ID do produto atual

  const CartIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 1024 1024" className={className} fill="currentColor">
      <path d="M384 775.3c30.3 0 54.9 24.6 54.9 54.9 0 30.3-24.6 54.9-54.9 54.8-30.3 0-54.9-24.6-54.9-54.8 0-30.3 24.6-54.9 54.9-54.9z m365.7 0c30.3 0 54.9 24.6 54.9 54.9 0 30.3-24.6 54.9-54.9 54.8-30.3 0-54.9-24.6-54.8-54.8 0-30.3 24.6-54.9 54.8-54.9z m-636.9-636.8l4.1 0.5 83.3 16c43.5 8.4 77.2 42.8 84.6 86.5l3 18.1 454.4 0.1c80.8 0 146.3 65.5 146.2 146.2 0 7.8-0.6 15.6-1.8 23.3l-26.7 165.3c-11.1 69.1-70.8 119.9-140.8 120l-310 0c-71.3 0-131.7-52.7-141.3-123.4l-39.8-291.1c-0.1-0.6-0.3-1.2-0.4-1.8l-7.7-45.7c-2.8-16.5-15.6-29.6-32.1-32.8l-83.4-16c-17.9-3.4-29.5-20.7-26.1-38.6 2.9-15.1 15.7-25.8 30.4-26.6l4.1 0z m629.4 187l-444.3 0 35.1 256.7c5.2 38 37.7 66.4 76.1 66.4l310 0c37.7 0 69.8-27.4 75.8-64.5l26.7-165.3c0.7-4.2 1-8.5 1-12.9 0-44.4-36-80.5-80.4-80.4z" />
    </svg>
  )

  const productImages = [
    "/caixa-3-perfumes-home.png",
    "/caixa-5-perfumes-home.png",
    "/caixa-10-perfumes-home.png",
    "/caixa-perfumes-no-estoque-2.png",
    "/caixa-perfumes-no-estoque.png"
  ]

  const reviews = reviewsData
  const relatedProducts = relatedProductsData

  const toggleFooterSection = (section: string) => {
    setExpandedFooterSection(expandedFooterSection === section ? null : section)
  }

  const toggleProductSection = (section: string) => {
    setExpandedProductSection(expandedProductSection === section ? null : section)
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white border-b sticky top-0 z-50">
        <div className="flex items-center justify-between p-2 sm:p-3 md:p-4">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <Image 
              src="/temu-logo.png" 
              alt="TEMU" 
              width={40} 
              height={16} 
              className="h-3 sm:h-4 w-auto flex-shrink-0" 
            />

            <div className="flex-1 max-w-[180px] sm:max-w-xs md:max-w-md mx-2 sm:mx-3 md:mx-4">
              <div className="flex items-center bg-gray-100 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 gap-1 sm:gap-2">
                <Search className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                <span className="text-gray-500 text-xs sm:text-sm truncate">kitchen pantry cabinet...</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button className="p-1.5 sm:p-2">
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            <button className="p-1.5 sm:p-2">
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            <div className="relative">
              <button onClick={() => setShowCart(!showCart)} className="relative p-1.5 sm:p-2">
                <CartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-[10px] sm:text-xs">
                    {cartItems}
                  </span>
                )}
              </button>
              {showCart && (
                <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white border rounded-lg shadow-lg z-50">
                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold mb-3 text-sm sm:text-base">Shopping Cart</h3>
                    {cartItems === 0 ? (
                      <p className="text-gray-500 text-center py-6 sm:py-8 text-sm">Your cart is empty</p>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-2 sm:p-3 border rounded-lg">
                          <Image
                            src={productImages[selectedImage]}
                            alt="Product"
                            width={50}
                            height={50}
                            className="rounded w-12 h-12 sm:w-15 sm:h-15 object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs sm:text-sm font-medium truncate">Mystery Box Fragrance</h4>
                            <p className="text-xs sm:text-sm text-gray-600">Qty: {cartItems}</p>
                            <p className="text-xs sm:text-sm font-semibold text-red-600">${getSelectedPrice()}</p>
                          </div>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold text-sm sm:text-base">Total:</span>
                            <span className="font-bold text-base sm:text-lg text-red-600">${(getSelectedPrice() * cartItems).toFixed(2)}</span>
                          </div>
                          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-sm sm:text-base py-2">Checkout</Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white">
        <div className="relative">
          <div
            className="w-full aspect-square overflow-hidden"
            onTouchStart={(e) => {
              const touch = e.touches[0]
              setTouchStart(touch.clientX)
            }}
            onTouchMove={(e) => {
              if (!touchStart) return
              const touch = e.touches[0]
              const diff = touchStart - touch.clientX

              if (Math.abs(diff) > 50) {
                if (diff > 0 && selectedImage < productImages.length - 1) {
                  setSelectedImage(selectedImage + 1)
                } else if (diff < 0 && selectedImage > 0) {
                  setSelectedImage(selectedImage - 1)
                }
                setTouchStart(null)
              }
            }}
            onTouchEnd={() => setTouchStart(null)}
          >
            <Image
              src={productImages[selectedImage] || "https://picsum.photos/1080/1080?random=20"}
              alt="Mystery Box Fragrance"
              width={1080}
              height={1080}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          <div className="absolute top-4 left-4">
            <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
              <span>
                {selectedImage + 1}/{productImages.length}
              </span>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : productImages.length - 1)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => setSelectedImage(selectedImage < productImages.length - 1 ? selectedImage + 1 : 0)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-4">
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{
                backgroundColor: "#264AD2",
                backgroundImage:
                  "url(https://aimg.kwcdn.com/material-put/20237f66ca/22f47927-8436-479b-8bae-6cd0ea7189c4.png?imageView2/2/w/750/q/80)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
              }}
            >
              <Image
                src="https://aimg.kwcdn.com/material-put/20237f66ca/bc78c8f3-253e-4e39-a1ff-0b0dd9d6b2f2.png?imageView2/2/w/1300/q/80/format/webp"
                alt="shipping icon"
                width={16}
                height={8}
                className="w-4 h-2"
              />
              <Image
                src="https://aimg.kwcdn.com/material-put/20237f66ca/7637744c-3af9-4370-b348-7f76f3881a34.png?imageView2/2/w/1300/q/80/format/webp"
                alt="icon"
                width={4}
                height={8}
                className="w-1 h-2"
              />
              <span className="text-white text-xs font-medium">Free shipping from this seller</span>
            </div>
          </div>
        </div>

        {/* Image Navigation Dots */}
        <div className="flex justify-center gap-2 py-4">
          {productImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                selectedImage === index 
                  ? 'bg-orange-500 w-6' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Thumbnail Images */}
        <div className="flex gap-2 px-4 pb-4 overflow-x-auto">
          {productImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                selectedImage === index 
                  ? 'border-orange-500' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={image}
                alt={`Product ${index + 1}`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white mt-2 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center bg-green-800 rounded-sm px-1 py-1">
            <span className="text-white text-xs font-medium">No import charges</span>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="https://aimg.kwcdn.com/upload_aimg/web/a6027173-542b-42fb-b114-b8aa52b04c0d.png.slim.png?imageView2/2/w/48/q/60/format/webp"
              alt="Local warehouse"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span className="text-green-800 text-sm font-medium">Local warehouse</span>
          </div>
        </div>

        <h1 className="text-lg font-semibold mb-2">
          Mystery Box fragrance
        </h1>

        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-600">4.3K+ Sold | Sold by Temu</div>
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-3 w-3 ${i < 4 ? "fill-orange-500 text-orange-500" : "text-gray-300"}`} />
              ))}
            </div>
            <span className="text-xs text-orange-500 font-medium">4.7 (2,847)</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-orange-600">${getSelectedPrice()}</span>
          <span className="text-lg text-gray-500 line-through">${getSelectedOriginalPrice()}</span>
          <div className="flex items-center bg-orange-50 rounded-sm px-1 py-1 border border-orange-200">
            <span className="text-orange-600 text-xs font-medium">-{getSelectedDiscount()}% limited time</span>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          <p>✓ Free delivery over $89</p>
          <p>✓ 90-day free returns</p>
          <p>✓ Ships from USA</p>
        </div>

        {/* Product Description Section */}
        <div className="space-y-4 mb-6">
          {/* Best sellers */}
          <div className="flex items-center justify-between">
            <span className="text-red-600 font-medium text-sm">Best sellers</span>
          </div>

          {/* Seção de Bundles/Pacotes */}
          <div className="bg-white mt-2 p-4">
            <div className="space-y-3">
              {bundleOptions.map((bundle, index) => (
                <div key={bundle.id} className="relative">
                  <input
                    type="radio"
                    name="bundle-selection"
                    value={bundle.id}
                    id={bundle.id}
                    checked={selectedBundle === bundle.id}
                    onChange={(e) => setSelectedBundle(e.target.value)}
                    className="sr-only"
                  />
                  <label
                    htmlFor={bundle.id}
                    className={`block cursor-pointer border-2 rounded-lg p-4 transition-all ${
                      selectedBundle === bundle.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Badge "Most Popular" para o bundle do meio */}
                    {index === 1 && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      {/* Radio button visual */}
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedBundle === bundle.id
                            ? 'border-orange-500 bg-orange-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedBundle === bundle.id && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-lg">{bundle.title}</span>
                            {bundle.discount > 59 && (
                              <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded">
                                SAVE ${(bundle.originalPrice - bundle.price).toFixed(2)}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {bundle.discount > 59 ? `Get ${bundle.discount - 59}% extra OFF` : 'Standard price'}
                          </div>
                        </div>
                      </div>
                      
                      {/* Pricing */}
                      <div className="text-right">
                        <div className="text-xl font-bold text-orange-600">
                          ${bundle.price.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500 line-through">
                          ${bundle.originalPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Variant selection - only show for selected bundle */}
                    {selectedBundle === bundle.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-700">Variant</span>
                        </div>
                        <div className="flex gap-2">
                          {['Female', 'Male', 'Unisex'].map((variant) => (
                            <button
                              key={variant}
                              onClick={() => updateBundleVariant(bundle.id, variant)}
                              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                                bundleVariants[bundle.id as keyof typeof bundleVariants] === variant
                                  ? 'bg-orange-500 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {variant}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white mt-2 p-6">
            <div className="w-full text-center">
              <div className="inline-block w-full max-w-md mx-auto">
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <ShopifyBuyButton
                    domain="sryxr0-ff.myshopify.com"
                    storefrontAccessToken="d336896a895872e293d9ea97de63b99c"
                    productId={getSelectedProductId()}
                    productName={getSelectedProductName()}
                    productPrice={getSelectedPrice()}
                    productImage={productImages[selectedImage]}
                    onAddToCart={(quantity) => {
                      setCartItems(cartItems + quantity)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Top 1 best selling item */}
          <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                ✓ Top 1 best selling item
              </span>
              <span className="text-sm">in Perfumes</span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Free shipping */}
          <div className="border rounded-lg overflow-hidden">
            <div 
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleProductSection('shipping')}
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 1024 1024">
                  <path d="M790.3 731.9c54.9 0 99.4 44.5 99.4 99.3 0 54.9-44.5 99.4-99.4 99.4-54.9 0-99.4-44.5-99.4-99.4 0-54.9 44.5-99.4 99.4-99.3z m-469.8 0c54.9 0 99.4 44.5 99.3 99.3 0 54.9-44.5 99.4-99.3 99.4-54.9 0-99.4-44.5-99.4-99.4 0-54.9 44.5-99.4 99.4-99.3z m302.4-574.5c59.5-0.6 108.3 47.1 109 106.6l0 0.6 0 12 68.4 0.1c118.4 0.2 214.5 96 215.2 214.4l1.3 245.5c0.2 39.9-32 72.5-71.8 72.7l-5.3-0.1c-9.3-74.2-72.7-131.6-149.4-131.6-74.7 0-136.6 54.3-148.5 125.7l-173 1.8c-12.4-70.7-74.1-124.5-148.3-124.4-74.1 0-135.7 53.5-148.3 123.9-29-9.1-50.2-36.1-50.5-68.1l0-171.7-70.5 0.4c-28.1 0.2-51-22.5-51.1-50.6 0-28.6 23-51.5 51.2-51.5l70.4 0.1 4.6-0.1 169.2-0.3c43.1-0.1 78-35 78-78.3-0.1-43.1-35.1-77.9-78.2-77.8l-169.1 0.3c-1.5 0-3 0-4.5 0.1l0-72.9c0-39.6 31.9-71.9 71.5-72.3l429.7-4.5z m189.7 206.9l-73.9 0.8-0.6 144.6 199.7-0.8 0-21.3 0-0.5c-0.7-68.5-56.7-123.4-125.2-122.8z m-517.2-15.5c18.1 0 33.2 13.4 35.6 30.9l0.3 4.9c0 19.9-16.1 36-35.9 36l-169.1 0.4c-1.6 0-3.1-0.1-4.7-0.3l0-0.1c-17.7-2.3-31.2-17.3-31.2-35.4 0-19.9 16.1-36 35.9-36l169.1-0.4z" />
                </svg>
                <div>
                  <div className="text-sm font-medium text-green-600">Free shipping over $69.00</div>
                </div>
              </div>
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedProductSection === 'shipping' ? 'rotate-90' : ''}`} fill="currentColor" viewBox="0 0 1024 1024">
                <path d="M320 215.8c-18.2-18.9-17.6-49 1.3-67.2 17-16.4 43.1-17.5 61.5-3.8l5.8 5.1 315.4 328.7c15.7 16.3 17.4 41.1 5.3 59.3l-5.2 6.5-315.5 329.6c-18.2 19-48.3 19.6-67.2 1.5-17.1-16.3-19.3-42.4-6.4-61.2l4.9-6 284-296.6-283.9-295.9z" />
              </svg>
            </div>
            {expandedProductSection === 'shipping' && (
              <div className="px-3 pb-3 bg-gray-50 border-t">
                <div className="space-y-2 text-xs text-gray-600 pt-3">
                  <div>
                    <span className="text-gray-500">International delivery: </span>
                    <span className="text-black">Jul 14-Aug 3.</span>
                  </div>
                  <div className="text-gray-500">
                    Get a $10.00 credit for late delivery
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <span>Carrier: </span>
                    <div className="flex items-center gap-1">
                      <Image
                        src="https://aimg.kwcdn.com/upload_aimg/br/44dd817b-fd41-470f-9761-97c05ce8402a.png.slim.png?imageView2/2/w/48/q/60/format/webp"
                        alt="Correios"
                        width={16}
                        height={14}
                        className="w-4 h-3.5"
                      />
                      <span className="text-black">Post Office</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image
                        src="https://aimg.kwcdn.com/upload_aimg/mkt/bddb4a1c-0113-4fcc-a09f-792ccd76b417.png.slim.png?imageView2/2/w/63/q/60/format/webp"
                        alt="J&T Express"
                        width={21}
                        height={14}
                        className="w-5 h-3.5"
                      />
                      <span className="text-black">J&T express</span>
                    </div>
                    <span>...</span>
                  </div>
                  <div className="mt-3 pt-2 border-t">
                    <h4 className="font-medium text-gray-700 mb-2">Shipping Details:</h4>
                    <ul className="space-y-1 text-xs">
                      <li>• Free shipping on orders over $69</li>
                      <li>• Standard delivery: 7-14 business days</li>
                      <li>• Express delivery available</li>
                      <li>• Tracking provided for all orders</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Free returns */}
          <div 
            className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
            onClick={() => toggleProductSection('returns')}
          >
            <div className="flex items-center gap-3">
              <Image
                src="https://aimg.kwcdn.com/upload_aimg/goods_details/7cc96070-0ca6-401a-8702-7bb9ba694458.png.slim.png?imageView2/2/w/51/q/60/format/webp"
                alt="Returns"
                width={17}
                height={17}
                className="w-4 h-4"
              />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-green-600">Free returns</span>
                <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                <span className="text-sm font-medium text-green-600">Price adjustment</span>
              </div>
            </div>
            <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedProductSection === 'returns' ? 'rotate-90' : ''}`} fill="currentColor" viewBox="0 0 1024 1024">
              <path d="M320 215.8c-18.2-18.9-17.6-49 1.3-67.2 17-16.4 43.1-17.5 61.5-3.8l5.8 5.1 315.4 328.7c15.7 16.3 17.4 41.1 5.3 59.3l-5.2 6.5-315.5 329.6c-18.2 19-48.3 19.6-67.2 1.5-17.1-16.3-19.3-42.4-6.4-61.2l4.9-6 284-296.6-283.9-295.9z" />
            </svg>
          </div>
          {expandedProductSection === 'returns' && (
            <div className="border border-t-0 rounded-b-lg p-3 bg-gray-50">
              <div className="space-y-2 text-xs text-gray-600">
                <h4 className="font-medium text-gray-700 mb-2">Return Policy:</h4>
                <ul className="space-y-1">
                  <li>• 90-day free returns on all items</li>
                  <li>• Items must be in original condition</li>
                  <li>• Free return shipping label provided</li>
                  <li>• Price adjustment available within 30 days</li>
                  <li>• Full refund processed within 5-7 business days</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tree planting program */}
          <div 
            className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
            onClick={() => toggleProductSection('tree')}
          >
            <div className="flex items-center gap-3">
              <Image
                src="https://aimg.kwcdn.com/upload_aimg/item/42cfbe9c-a2f3-4c59-b107-d83ca2341d1c.png.slim.png?imageView2/2/w/1300/q/80/format/webp"
                alt="Tree planting"
                width={17}
                height={17}
                className="w-4 h-4"
              />
              <div>
                <div className="text-sm font-medium text-green-600">Temu tree planting program</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">+20 million trees</span>
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedProductSection === 'tree' ? 'rotate-90' : ''}`} fill="currentColor" viewBox="0 0 1024 1024">
                <path d="M320 215.8c-18.2-18.9-17.6-49 1.3-67.2 17-16.4 43.1-17.5 61.5-3.8l5.8 5.1 315.4 328.7c15.7 16.3 17.4 41.1 5.3 59.3l-5.2 6.5-315.5 329.6c-18.2 19-48.3 19.6-67.2 1.5-17.1-16.3-19.3-42.4-6.4-61.2l4.9-6 284-296.6-283.9-295.9z" />
              </svg>
            </div>
          </div>
          {expandedProductSection === 'tree' && (
            <div className="border border-t-0 rounded-b-lg p-3 bg-gray-50">
              <div className="space-y-2 text-xs text-gray-600">
                <h4 className="font-medium text-gray-700 mb-2">Environmental Impact:</h4>
                <ul className="space-y-1">
                  <li>• 1 tree planted for every purchase</li>
                  <li>• Over 20 million trees planted globally</li>
                  <li>• Partnership with reforestation organizations</li>
                  <li>• Carbon offset program included</li>
                  <li>• Sustainable packaging materials used</li>
                </ul>
              </div>
            </div>
          )}

          {/* Purchase security */}
          <div 
            className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
            onClick={() => toggleProductSection('security')}
          >
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" className="w-4 h-4" style={{ fill: 'rgb(10, 136, 0)' }}>
                <path d="M453.8 53.5c33.4-13.3 70.5-13.5 104.1-0.7l340.5 130.2c41.2 15.7 67.6 56 65.7 100l-8.2 190.2c-6.9 160.5-88.2 308.6-219.8 400.6l-116.5 81.6c-67 46.8-156.1 46.8-223.1 0l-115.1-80.5c-131.5-92-211.7-240.8-216.2-401.2l-5.4-191.4c-1.2-43 24.6-82.2 64.6-98.1z m258.7 327.4c-15.8-16.1-41.8-16.4-57.9-0.5l-178.8 175.5-89.9-81.2c-16.8-15.2-42.7-13.8-57.9 3-15.2 16.8-13.8 42.7 2.9 57.8l118.6 107.1c16.1 14.5 40.7 14 56.2-1.2l206.3-202.6c16.1-15.8 16.4-41.8 0.5-57.9z"></path>
              </svg>
              <div>
                <div className="text-sm font-medium text-green-600">Purchase security</div>
              </div>
            </div>
            <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedProductSection === 'security' ? 'rotate-90' : ''}`} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
              <path d="M320 215.8c-18.2-18.9-17.6-49 1.3-67.2 17-16.4 43.1-17.5 61.5-3.8l5.8 5.1 315.4 328.7c15.7 16.3 17.4 41.1 5.3 59.3l-5.2 6.5-315.5 329.6c-18.2 19-48.3 19.6-67.2 1.5-17.1-16.3-19.3-42.4-6.4-61.2l4.9-6 284-296.6-283.9-295.9z"></path>
            </svg>
          </div>
          {expandedProductSection === 'security' && (
            <div className="border border-t-0 rounded-b-lg p-3 bg-gray-50">
              <div className="space-y-2 text-xs text-gray-600">
                <h4 className="font-medium text-gray-700 mb-2">Security Features:</h4>
                <ul className="space-y-1">
                  <li>• SSL encrypted checkout process</li>
                  <li>• Secure payment processing</li>
                  <li>• Purchase protection guarantee</li>
                  <li>• Fraud prevention monitoring</li>
                  <li>• 24/7 customer support</li>
                  <li>• Money-back guarantee</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white mt-2 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Reviews</h2>
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < 5 ? "fill-orange-500 text-orange-500" : "text--500"}`} />
                ))}
              </div>
              <span className="text-sm font-medium">4.7</span>
              <span className="text-sm text-gray-500">(2,847 reviews)</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded">
            <svg viewBox="0 0 1024 1024" className="h-3 w-3 text-green-800" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" />
            </svg>
            <span className="text-xs text-green-800 font-medium">Verified purchases</span>
          </div>
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 ${review.color} rounded-full flex items-center justify-center text-white text-sm font-medium`}
                >
                  {review.initial}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{review.name}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < review.rating ? "fill-orange-500 text-orange-500" : "text-orange-500"}`}

                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{review.text}</p>
                  {review.photo && (
                    <div className="flex gap-2 mb-2">
                      <Image
                        src={review.photo}
                        alt="Review photo"
                        width={60}
                        height={60}
                        className="rounded border"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <button className="flex items-center gap-1 hover:text-gray-700">
                      <svg viewBox="0 0 1024 1024" className="h-3 w-3" fill="currentColor">
                        <path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 1-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 0 0 471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.8-5.4 99.3-41.3 180.7-131 180.7-244.2 0-36.3-7.5-72.4-21.9-105.8z" />
                      </svg>
                      Find helpful
                    </button>
                    <button className="hover:text-gray-700">Share</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-4 bg-transparent" onClick={() => setShowReviewsModal(true)}>
          View All Reviews
        </Button>
      </div>

      <div className="bg-white mt-2 p-4">
        <h2 className="text-lg font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-2 gap-3">
          {relatedProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-3">
              <Image
                src={product.image || "https://picsum.photos/200/200?random=50"}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h3 className="text-sm font-medium mb-1 line-clamp-2">{product.name}</h3>
              <div className="flex items-center gap-1 mb-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-orange-500 text-orange-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">({product.rating})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-orange-600">{product.price}</span>
                <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Modal */}
      {showReviewsModal && (
        <ReviewsModal
          reviews={reviewsHookData?.reviews || []}
          onClose={() => setShowReviewsModal(false)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      )}

      <StickyBuyButton
        price={`$${getSelectedPrice()}`}
        originalPrice={`$${getSelectedOriginalPrice()}`}
        discount={getSelectedDiscount()}
        productId={getSelectedProductId()}
        productName={getSelectedProductName()}
        productImage={productImages[selectedImage]}
        onAddToCart={(qty) => {
          setCartItems(cartItems + qty)
        }}
        cartItems={cartItems}
        selectedVariant={bundleVariants[selectedBundle as keyof typeof bundleVariants]}
        onVariantChange={(variant: string) => updateBundleVariant(selectedBundle, variant)}
        selectedBundle={selectedBundle}
        onBundleChange={(bundleId: string) => setSelectedBundle(bundleId)}
      />

      <Footer />
    </div>
  )
}
