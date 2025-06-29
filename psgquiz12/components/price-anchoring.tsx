"use client"

import { useState, useEffect } from "react"
import { CheckCircle } from "lucide-react"
import Image from "next/image"

interface PriceItem {
  id: number
  text: string
  originalValue: string
  currentValue: string
  emoji: string
}

const bonusItems: PriceItem[] = [
  { id: 1, text: "NBA Finals Limited Edition Badge", originalValue: "$30", currentValue: "$0", emoji: "🏀" },
  { id: 2, text: "Custom Name + Number", originalValue: "$30", currentValue: "$0", emoji: "" },
  {
    id: 3,
    text: "Official Autograph by Shai Gilgeous-Alexander",
    originalValue: "$100",
    currentValue: "$0",
    emoji: "✍️",
  },
]

interface PriceAnchoringProps {
  correctAnswers: number
}

export default function PriceAnchoring({ correctAnswers }: PriceAnchoringProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [showBonusItems, setShowBonusItems] = useState(false)

  useEffect(() => {
    // Show bonus items after a short delay
    const timer = setTimeout(() => {
      setShowBonusItems(true)

      // Then show each item with 1 second delay
      const showItems = async () => {
        for (let i = 0; i < bonusItems.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 1000)) // Changed to 1 second
          setVisibleItems((prev) => [...prev, i])
        }
      }

      showItems()
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const discount = correctAnswers * 25
  const finalPrice = 50

  return (
    <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
      {/* Original interface section */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-blue-200">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/frente%20e%20verso-sUTCLMCHhzEVPG9AcAP3dWBtEOD5np.png"
            alt="Thunder Jersey Front and Back"
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Original Price</p>
          <p className="text-lg line-through text-gray-500">$150.00</p>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span>Discount earned:</span>
          <span className="font-bold text-green-600">-${discount}</span>
        </div>
        <div className="flex justify-between text-xl font-bold">
          <span>Your final price:</span>
          <span className="text-blue-600">${finalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Bonus items section - now integrated in the same block */}
      {showBonusItems && (
        <div className="border-t-2 border-blue-200 pt-6">
          <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">What's included in your jersey? 🏀⚡</h3>

          <div className="space-y-4">
            {bonusItems.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-4 rounded-lg transition-all duration-500 ${
                  visibleItems.includes(index)
                    ? "opacity-100 transform translate-x-0 bg-white border border-blue-200 shadow-sm"
                    : "opacity-0 transform translate-x-4"
                }`}
              >
                <div className="flex items-center space-x-3">
                  {visibleItems.includes(index) && <CheckCircle className="h-5 w-5 text-green-500 animate-pulse" />}
                  {item.id === 2 ? (
                    <div className="w-8 h-8 rounded overflow-hidden">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alexander.jpg-I0Ev7PVvxp63Ho3GNDl9AlIfSirESs.jpeg"
                        alt="Thunder Jersey"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <span className="text-lg">{item.emoji}</span>
                  )}
                  <span className="font-medium text-gray-800">{item.text}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-400 line-through text-sm">{item.originalValue}</span>
                  <span className="font-bold text-green-600 text-lg ml-2">{item.currentValue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
