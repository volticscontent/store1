"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Heart, ShoppingCart, ChevronDown, ChevronUp, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Footer from "@/components/Footer"
import StickyBuyButton from "@/components/StickyBuyButton"
import ReviewsModal from "@/components/ReviewsModal"
import { useReviews } from "@/hooks/useReviews"

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [cartItems, setCartItems] = useState(0)
  const [showCart, setShowCart] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [expandedFooterSection, setExpandedFooterSection] = useState<string | null>("Help")
  const [showReviewsModal, setShowReviewsModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  const { data: reviewsData, loading: reviewsLoading } = useReviews(1) // ID do produto atual

  const CartIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 1024 1024" className={className} fill="currentColor">
      <path d="M384 775.3c30.3 0 54.9 24.6 54.9 54.9 0 30.3-24.6 54.9-54.9 54.8-30.3 0-54.9-24.6-54.9-54.8 0-30.3 24.6-54.9 54.9-54.9z m365.7 0c30.3 0 54.9 24.6 54.9 54.9 0 30.3-24.6 54.9-54.9 54.8-30.3 0-54.9-24.6-54.8-54.8 0-30.3 24.6-54.9 54.8-54.9z m-636.9-636.8l4.1 0.5 83.3 16c43.5 8.4 77.2 42.8 84.6 86.5l3 18.1 454.4 0.1c80.8 0 146.3 65.5 146.2 146.2 0 7.8-0.6 15.6-1.8 23.3l-26.7 165.3c-11.1 69.1-70.8 119.9-140.8 120l-310 0c-71.3 0-131.7-52.7-141.3-123.4l-39.8-291.1c-0.1-0.6-0.3-1.2-0.4-1.8l-7.7-45.7c-2.8-16.5-15.6-29.6-32.1-32.8l-83.4-16c-17.9-3.4-29.5-20.7-26.1-38.6 2.9-15.1 15.7-25.8 30.4-26.6l4.1 0z m629.4 187l-444.3 0 35.1 256.7c5.2 38 37.7 66.4 76.1 66.4l310 0c37.7 0 69.8-27.4 75.8-64.5l26.7-165.3c0.7-4.2 1-8.5 1-12.9 0-44.4-36-80.5-80.4-80.4z" />
    </svg>
  )

  const productImages = [
    "/placeholder.svg?height=400&width=400&text=Image+1",
    "/placeholder.svg?height=400&width=400&text=Image+2",
    "/placeholder.svg?height=400&width=400&text=Image+3",
    "/placeholder.svg?height=400&width=400&text=Image+4",
    "/placeholder.svg?height=400&width=400&text=Image+5",
    "/placeholder.svg?height=400&width=400&text=Image+6",
    "/placeholder.svg?height=400&width=400&text=Image+7",
  ]

  const relatedProducts = [
    {
      id: 1,
      name: "Kitchen Storage Rack",
      price: "$45.99",
      originalPrice: "$65.99",
      rating: 4.5,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "Pantry Organizer Set",
      price: "$32.99",
      originalPrice: "$49.99",
      rating: 4.3,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: "Spice Rack Cabinet",
      price: "$28.99",
      originalPrice: "$39.99",
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 4,
      name: "Kitchen Cabinet Organizer",
      price: "$52.99",
      originalPrice: "$79.99",
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const reviews = [
    {
      id: 1,
      name: "Maria K.",
      initial: "M",
      color: "bg-orange-500",
      rating: 5,
      date: "2 days ago",
      text: "Perfect for my kitchen! The quality is amazing and it fits perfectly in my pantry. Assembly was straightforward and the shelves are very sturdy.",
      helpful: 12,
      hasPhotos: true,
    },
    {
      id: 2,
      name: "John D.",
      initial: "J",
      color: "bg-blue-500",
      rating: 4,
      date: "1 week ago",
      text: "Good value for money. The cabinet is solid and has plenty of storage space. Only minor issue was one of the screws was missing but customer service sent a replacement quickly.",
      helpful: 8,
      hasPhotos: false,
    },
    {
      id: 3,
      name: "Sarah L.",
      initial: "S",
      color: "bg-purple-500",
      rating: 5,
      date: "2 weeks ago",
      text: "Exceeded my expectations! The finish looks premium and it's very spacious. Perfect for organizing all my kitchen supplies. Highly recommend!",
      helpful: 15,
      hasPhotos: false,
    },
    {
      id: 4,
      name: "Mike R.",
      initial: "M",
      color: "bg-green-500",
      rating: 5,
      date: "3 weeks ago",
      text: "Excellent build quality and very easy to assemble. The adjustable shelves are a great feature. Fits perfectly in my small kitchen space.",
      helpful: 9,
      hasPhotos: true,
    },
    {
      id: 5,
      name: "Lisa T.",
      initial: "L",
      color: "bg-pink-500",
      rating: 4,
      date: "1 month ago",
      text: "Really happy with this purchase. The cabinet is sturdy and looks great. Only wish it came in more color options.",
      helpful: 6,
      hasPhotos: false,
    },
    {
      id: 6,
      name: "David W.",
      initial: "D",
      color: "bg-indigo-500",
      rating: 5,
      date: "1 month ago",
      text: "Amazing storage solution! The quality is top-notch and it was surprisingly easy to put together. Great value for the price.",
      helpful: 11,
      hasPhotos: true,
    },
  ]

  const toggleFooterSection = (section: string) => {
    setExpandedFooterSection(expandedFooterSection === section ? null : section)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-3 flex-1">
            <Image src="/temu-logo.png" alt="TEMU" width={40} height={16} className="h-4 w-auto" />

            <div className="flex-1 max-w-md mx-4">
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 gap-2">
                <svg viewBox="0 0 1024 1024" className="h-4 w-4 text-gray-500" fill="currentColor">
                  <path d="M458.1 118.6c211.3 0 382.7 171.3 382.7 382.6 0 84.8-27.6 163.2-74.3 226.6l144.1 126.4c13.4 11.8 14.8 32.2 3 45.6-10.5 11.9-27.8 14.3-40.9 6.4l-4.8-3.4-144-126.3c-68.8 66.5-162.5 107.4-265.8 107.4-211.3 0-382.7-171.3-382.6-382.7 0-211.3 171.3-382.7 382.6-382.6z m0 64.6c-175.6 0-318 142.4-318 318 0 175.6 142.4 318 318 318 175.6 0 318-142.4 318-318 0-175.6-142.4-318-318-318z"></path>
                </svg>
                <span className="text-gray-500 text-sm truncate">kitchen pantry cabinet...</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-1">
              <svg viewBox="0 0 1024 1024" className="h-6 w-6" fill="currentColor">
                <path d="M831 234.8c20.2 0 36.6 16.4 36.6 36.6 0 20.2-16.4 36.6-36.6 36.6l-438.9 0c-20.2 0-36.6-16.4-36.5-36.6 0-20.2 16.4-36.6 36.5-36.6l438.9 0z m-618.9 83.4c26.3 0 47.5-21.3 47.6-47.6 0-26.3-21.3-47.5-47.6-47.5-26.3 0-47.5 21.3-47.5 47.5 0 26.3 21.3 47.5 47.5 47.6z m618.9 399.4c20.2 0 36.6 16.4 36.6 36.5 0 20.2-16.4 36.6-36.6 36.6l-438.9 0c-20.2 0-36.6-16.4-36.5-36.6 0-20.2 16.4-36.6 36.5-36.5l438.9 0z m-618.9 83.3c26.3 0 47.5-21.3 47.6-47.5 0-26.3-21.3-47.5-47.6-47.6-26.3 0-47.5 21.3-47.5 47.6 0 26.3 21.3 47.5 47.5 47.5z m618.9-324.7c20.2 0 36.6 16.4 36.6 36.6 0 20.2-16.4 36.6-36.6 36.5l-438.9 0c-20.2 0-36.6-16.4-36.5-36.5 0-20.2 16.4-36.6 36.5-36.6l438.9 0z m-618.9 83.3c26.3 0 47.5-21.3 47.6-47.5 0-26.3-21.3-47.5-47.6-47.5-26.3 0-47.5 21.3-47.5 47.5 0 26.3 21.3 47.5 47.5 47.5z" />
              </svg>
            </button>

            <button className="p-1">
              <svg viewBox="0 0 1024 1024" className="h-6 w-6" fill="currentColor">
                <path d="M510.8 541.3c204.6 0 323.6 71 356.9 213 8.9 38.1-14.8 76.3-52.9 85.2-5.3 1.2-10.8 1.9-16.3 1.8l-575.5 0c-39.2-0.1-70.9-31.9-70.8-71 0-5.4 0.6-10.8 1.9-16 33.2-142 152.1-213 356.7-213z m0 65.8c-176.9 0-267.3 54-292.6 162.1-0.1 0.4-0.1 0.8-0.2 1.2 0 2.8 2.3 5.1 5.1l575.7 0c0.4 0 0.8 0 1.1-0.1 2.7-0.6 4.4-3.4 3.8-6.1-25.4-108.2-115.9-162.2-292.8-162.2z m1.2-501c99 0 179.2 80.2 179.2 179.2 0 99-80.2 179.2-179.2 179.2-99 0-179.2-80.2-179.2-179.2 0-99 80.2-179.2 179.2-179.2z m0 65.8c-62.6 0-113.4 50.8-113.4 113.4 0 62.6 50.8 113.4 113.4 113.3 62.6 0 113.4-50.8 113.4-113.3 0-62.6-50.8-113.4-113.4-113.4z" />
              </svg>
            </button>

            <div className="relative">
              <button onClick={() => setShowCart(!showCart)} className="relative p-1">
                <CartIcon className="h-6 w-6" />
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </button>
              {showCart && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="font-semibold mb-3">Shopping Cart</h3>
                    {cartItems === 0 ? (
                      <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 border rounded-lg">
                          <Image
                            src="/placeholder.svg?height=60&width=60"
                            alt="Product"
                            width={60}
                            height={60}
                            className="rounded"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium">Kitchen Storage Cabinet</h4>
                            <p className="text-sm text-gray-600">Qty: {quantity}</p>
                            <p className="text-sm font-semibold text-red-600">$73.57</p>
                          </div>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold">Total:</span>
                            <span className="font-bold text-lg text-red-600">${(73.57 * quantity).toFixed(2)}</span>
                          </div>
                          <Button className="w-full bg-orange-500 hover:bg-orange-600">Checkout</Button>
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
            className="w-full h-80 overflow-hidden"
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
              src={productImages[selectedImage] || "/placeholder.svg"}
              alt="Storage Cabinet"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute top-4 left-4">
            <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
              <span>
                {selectedImage + 1}/{productImages.length}
              </span>
            </div>
          </div>

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

          <Button size="icon" variant="ghost" className="absolute top-4 right-4 bg-white/80 hover:bg-white">
            <Heart className="h-5 w-5" />
          </Button>
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
          Large Kitchen Pantry Cabinet Storage Organizer with Adjustable Shelves
        </h1>

        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-600">4.3K+ Sold | Sold by Temu</div>
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-3 w-3 ${i < 4 ? "fill-orange-500 text-orange-500" : "text-gray-300"}`} />
              ))}
            </div>
            <span className="text-xs text-orange-500 font-medium">4.2 (1,847)</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-orange-600">$73.57</span>
          <span className="text-lg text-gray-500 line-through">$125.99</span>
          <div className="flex items-center bg-orange-50 rounded-sm px-1 py-1 border border-orange-200">
            <span className="text-orange-600 text-xs font-medium">-42% limited time</span>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          <p>✓ Free delivery over $89</p>
          <p>✓ 90-day free returns</p>
          <p>✓ Ships from USA</p>
        </div>
      </div>

      <div className="bg-white mt-2 p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium">Quantity:</span>
          <div className="flex items-center border rounded-lg">
            <Button variant="ghost" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3">
              -
            </Button>
            <span className="px-4 py-2 border-x">{quantity}</span>
            <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} className="px-3">
              +
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            className="flex-1 bg-orange-500 hover:bg-orange-600"
            onClick={() => {
              setCartItems(cartItems + quantity)
              setShowCart(true)
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            Buy Now
          </Button>
        </div>
      </div>

      <div className="bg-white mt-2 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Reviews</h2>
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < 5 ? "fill-orange-500 text-orange-500" : "text-gray-300"}`} />
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
                          className={`h-3 w-3 ${i < review.rating ? "fill-orange-500 text-orange-500" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{review.text}</p>
                  {review.hasPhotos && (
                    <div className="flex gap-2 mb-2">
                      <Image
                        src="/placeholder.svg?height=60&width=60"
                        alt="Review photo"
                        width={60}
                        height={60}
                        className="rounded border"
                      />
                      <Image
                        src="/placeholder.svg?height=60&width=60"
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
                        <path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 0 0 471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.8-5.4 99.3-41.3 180.7-131 180.7-244.2 0-36.3-7.5-72.4-21.9-105.8z" />
                      </svg>
                      Helpful ({review.helpful})
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
                src={product.image || "/placeholder.svg"}
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
          reviews={reviewsData?.reviews || []}
          onClose={() => setShowReviewsModal(false)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      )}

      <StickyBuyButton
        price="$45.99"
        originalPrice="$65.99"
        discount={30}
        onAddToCart={(qty) => {
          setCartItems(cartItems + qty)
        }}
        cartItems={cartItems}
      />

      <Footer />
    </div>
  )
}
