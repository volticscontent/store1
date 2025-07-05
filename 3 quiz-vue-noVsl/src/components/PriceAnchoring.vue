<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { CheckCircle } from 'lucide-vue-next'

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

const props = defineProps<{
  correctAnswers: number
}>()

const visibleItems = ref<number[]>([])
const showBonusItems = ref(false)

const discount = computed(() => props.correctAnswers * 25)
const finalPrice = 49.99

onMounted(() => {
  // Show bonus items after a short delay
  const timer = setTimeout(() => {
    showBonusItems.value = true

    // Then show each item with 1 second delay
    const showItems = async () => {
      for (let i = 0; i < bonusItems.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Changed to 1 second
        visibleItems.value = [...visibleItems.value, i]
      }
    }

    showItems()
  }, 500)

  return () => clearTimeout(timer)
})
</script>

<template>
  <div class="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
    <!-- Original interface section -->
    <div class="flex items-center justify-between mb-4">
      <div class="w-20 h-20 rounded-lg overflow-hidden border-2 border-blue-200">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/frente%20e%20verso-sUTCLMCHhzEVPG9AcAP3dWBtEOD5np.png"
          alt="Thunder Jersey Front and Back"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="text-right">
        <p class="text-sm text-gray-600">Original Price</p>
        <p class="text-lg line-through text-gray-500">$149.99</p>
      </div>
    </div>

    <div class="space-y-2 mb-6">
      <div class="flex justify-between">
        <span>Discount earned:</span>
        <span class="font-bold text-green-600">-${{ discount }}</span>
      </div>
      <div class="flex justify-between text-xl font-bold">
        <span>Your final price:</span>
        <span class="text-blue-600">${{ finalPrice.toFixed(2) }}</span>
      </div>
    </div>

    <!-- Bonus items section - now integrated in the same block -->
    <div v-if="showBonusItems" class="border-t-2 border-blue-200 pt-6">
      <h3 class="text-2xl font-bold text-blue-900 mb-6 text-center">What's included in your jersey? 🏀⚡</h3>

      <div class="space-y-4">
        <div
          v-for="(item, index) in bonusItems"
          :key="item.id"
          :class="`flex items-center justify-between p-4 rounded-lg transition-all duration-500 ${
            visibleItems.includes(index)
              ? 'opacity-100 transform translate-x-0 bg-white border border-blue-200 shadow-sm'
              : 'opacity-0 transform translate-x-4'
          }`"
        >
          <div class="flex items-center space-x-3">
            <CheckCircle v-if="visibleItems.includes(index)" class="h-5 w-5 text-green-500 animate-pulse" />
            <div v-if="item.id === 2" class="w-8 h-8 rounded overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alexander.jpg-I0Ev7PVvxp63Ho3GNDl9AlIfSirESs.jpeg"
                alt="Thunder Jersey"
                class="w-full h-full object-cover"
              />
            </div>
            <span v-else class="text-lg">{{ item.emoji }}</span>
            <span class="font-medium text-gray-800">{{ item.text }}</span>
          </div>
          <div class="text-right">
            <span class="font-bold text-gray-400 line-through text-sm">{{ item.originalValue }}</span>
            <span class="font-bold text-green-600 text-lg ml-2">{{ item.currentValue }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 