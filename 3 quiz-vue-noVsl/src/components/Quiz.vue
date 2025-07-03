<!-- Quiz.vue -->
<template>
  <div>
    <PixelScripts />
    <audio
      id="notification-sound"
      src="https://cdn.shopify.com/s/files/1/0946/2290/8699/files/notifica_o-venda.mp3?v=1749150271"
      preload="auto"
      style="display: none"
    />

    <!-- Initial screen -->
    <div v-if="!gameStarted" class="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600 flex items-center justify-center p-4">
      <Card class="w-full max-w-3xl mx-2">
        <CardHeader class="text-center">
          <CardTitle class="text-4xl font-bold text-blue-900 mb-6">Message from Thunder Management</CardTitle>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- President photo instead of VideoPlayer -->
          <div class="flex justify-center mb-6">
            <div class="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-blue-300">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Tela%202025-06-23%20a%CC%80s%2006.11.07-fAxXQPHIkOSCiDZDIhgWT8jJl6yeEQ.png"
                alt="Thunder Management Executive"
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <div class="bg-blue-50 p-6 rounded-lg border-2 border-blue-200 mb-6">
            <blockquote class="text-sm md:text-lg text-gray-800 italic text-center leading-relaxed">
              "Loyal Thunder fans! ⚡🏀
              <br />
              <br />I am incredibly proud of what our team has accomplished this season.
              <br />
              <br />
              To celebrate this incredible journey, I am offering you a <strong>once-in-a-lifetime opportunity</strong>
              : an official Thunder jersey autographed by Shai Gilgeous-Alexander, personalized with your name and number,
              for just <strong>$49.99 instead of $149.99</strong>.
              <br />
              <br />
              Answer our 4 questions about the team correctly and unlock access to this exclusive offer!
              <br />
              <br />
              Together, we'll make Thunder roar.
              <br />
              <br />
              <strong>Go Thunder! 💙⚡🔥</strong>"
            </blockquote>
          </div>

          <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
            <div class="flex items-center justify-center space-x-2 text-yellow-800">
              <StarIcon class="h-5 w-5" />
              <span class="font-semibold">Maximum discount: $100 • Final price: $49.99</span>
              <StarIcon class="h-5 w-5" />
            </div>
          </div>

          <Button
            @click="handleStartQuiz"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3"
            size="lg"
          >
            <TrophyIcon class="h-6 w-6" />
            Start the Quiz
          </Button>
        </CardContent>
      </Card>
    </div>

    <!-- Quiz completed screen -->
    <div v-else-if="quizCompleted" class="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600 flex items-center justify-center p-4">
      <Card class="w-full max-w-2xl mx-2">
        <CardHeader class="text-center">
          <div class="flex justify-center mb-4">
            <TrophyIcon class="h-16 w-16 text-yellow-500" />
          </div>
          <CardTitle class="text-3xl font-bold text-blue-900">Congratulations, True Thunder Fan! 🎉</CardTitle>
          <CardDescription class="text-lg">
            You got {{ correctAnswers }} correct answers out of {{ questions.length }}
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <PriceAnchoring :correct-answers="correctAnswers" />

          <div class="flex flex-col gap-4">
            <Button
              class="bg-blue-600 hover:bg-blue-700 text-white w-full"
              size="lg"
              @click="handleBuyNowClick"
            >
              <CurrencyDollarIcon class="mr-2 h-5 w-5" />
              Buy Now
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              class="w-full" 
              @click="handleRestart"
            >
              Start Over
            </Button>
          </div>

          <div class="text-center text-sm text-gray-600">
            <p>* Offer valid only for true Thunder fans</p>
            <p>** Special price: $49.99 (maximum discount applied)</p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Quiz questions screen -->
    <div v-else class="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600 flex items-center justify-center p-4">
      <SuccessNotification :show="showNotification" @close="showNotification = false" />

      <Card class="w-full max-w-2xl mx-2">
        <CardHeader>
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 rounded overflow-hidden">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alexander.jpg-yJWzzHVbBOK22oRDWw59IGExKSePHQ.jpeg"
                  alt="Thunder Jersey"
                  class="w-full h-full object-cover"
                />
              </div>
              <div>
                <CardTitle class="text-xl">Thunder Fan Quiz</CardTitle>
                <CardDescription>
                  Question {{ currentQuestion + 1 }} of {{ questions.length }}
                </CardDescription>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-600">Current discount</p>
              <p class="text-2xl font-bold text-green-600">${{ correctAnswers * 25 }}</p>
            </div>
          </div>
          <Progress :value="(currentQuestion / questions.length) * 100" class="w-full" />
        </CardHeader>

        <CardContent class="space-y-6">
          <template v-if="!showResult">
            <div class="bg-blue-50 p-6 rounded-lg">
              <h3 class="text-xl font-semibold mb-4 text-blue-900">{{ questions[currentQuestion].question }}</h3>

              <RadioGroup v-model="selectedAnswer" class="space-y-3">
                <div
                  v-for="(option, index) in questions[currentQuestion].options"
                  :key="index"
                  class="flex items-center space-x-2 p-3 rounded-lg border hover:bg-blue-100 transition-colors"
                >
                  <RadioGroupItem :value="index.toString()" :id="`option-${index}`" />
                  <Label :for="`option-${index}`" class="flex-1 cursor-pointer font-medium">
                    {{ option }}
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              @click="handleAnswer"
              :disabled="!selectedAnswer"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
            >
              Confirm Answer
            </Button>
          </template>

          <template v-else>
            <div class="space-y-4">
              <div
                :class="`p-6 rounded-lg ${
                  Number.parseInt(selectedAnswer) === questions[currentQuestion].correct
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-red-50 border-2 border-red-200'
                }`"
              >
                <div class="flex items-center mb-3">
                  <template v-if="Number.parseInt(selectedAnswer) === questions[currentQuestion].correct">
                    <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span class="text-white font-bold">✓</span>
                    </div>
                    <span class="text-green-800 font-semibold text-lg">Correct! +$25 discount</span>
                  </template>
                  <template v-else>
                    <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                      <span class="text-white font-bold">✗</span>
                    </div>
                    <span class="text-red-800 font-semibold text-lg">Incorrect</span>
                  </template>
                </div>

                <p class="text-gray-700 mb-3">
                  <strong>Correct answer:</strong>
                  {{ questions[currentQuestion].options[questions[currentQuestion].correct] }}
                </p>

                <p class="text-gray-600 text-sm">{{ questions[currentQuestion].explanation }}</p>
              </div>

              <Button @click="nextQuestion" class="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                {{ currentQuestion < questions.length - 1 ? "Next Question" : "See Final Result" }}
              </Button>
            </div>
          </template>

          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Discount progress:</span>
              <span class="font-semibold">${{ correctAnswers * 25 }} / $100</span>
            </div>
            <Progress :value="(correctAnswers / 4) * 100" class="mt-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Button from '@/components/ui/Button.vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import RadioGroup from '@/components/ui/RadioGroup.vue'
import RadioGroupItem from '@/components/ui/RadioGroupItem.vue'
import Label from '@/components/ui/Label.vue'
import Progress from '@/components/ui/Progress.vue'
import { TrophyIcon, CurrencyDollarIcon, StarIcon } from '@heroicons/vue/24/outline'
import PriceAnchoring from '@/components/PriceAnchoring.vue'
import SuccessNotification from '@/components/SuccessNotification.vue'
import { track } from '@/utils/tracking-simple'
import { questions } from '@/types/quiz'

const gameStarted = ref(false)
const currentQuestion = ref(0)
const selectedAnswer = ref("")
const correctAnswers = ref(0)
const showResult = ref(false)
const quizCompleted = ref(false)
const showNotification = ref(false)
const audioInitialized = ref(false)
const audioRef = ref<HTMLAudioElement | null>(null)

onMounted(() => {
  initializeAudio()
})

const initializeAudio = () => {
  try {
    const audio = new Audio("https://cdn.shopify.com/s/files/1/0946/2290/8699/files/notifica_o-venda.mp3?v=1749150271")
    audio.preload = "auto"
    audio.volume = 1
    audioRef.value = audio
    audioInitialized.value = true
  } catch (error) {
    console.log("Error initializing audio:", error)
  }
}

const playNotificationSound = async () => {
  if (!audioRef.value) {
    console.log("Audio not initialized")
    return
  }

  try {
    audioRef.value.currentTime = 0
    await audioRef.value.play()
  } catch (error) {
    console.log("Error playing notification sound:", error)
  }
}

const handleStartQuiz = () => {
  gameStarted.value = true
  track('p2Quiz_Start')
}

const handleAnswer = () => {
  showResult.value = true
  const isCorrect = Number.parseInt(selectedAnswer.value) === questions[currentQuestion.value].correct
  const questionNumber = currentQuestion.value + 1
  
  track(`p2Quiz_Question_${questionNumber}`)
  
  if (isCorrect) {
    correctAnswers.value++
    showNotification.value = true
    track(`p2Quiz_Correct_Answer_${questionNumber}`)
    playNotificationSound()
  } else {
    track(`p2Quiz_Wrong_Answer_${questionNumber}`)
  }
}

const nextQuestion = () => {
  if (currentQuestion.value < questions.length - 1) {
    currentQuestion.value++
    selectedAnswer.value = ""
    showResult.value = false
    showNotification.value = false
  } else {
    quizCompleted.value = true
    track('p2Quiz_Completed')
  }
}

const handleBuyNowClick = () => {
  track('p2Going_to_Store')
  
  // Abre a loja do Thunder
  window.open('https://nba-thunder.store', '_blank')
}

const handleRestart = () => {
  track('p2Quiz_Restart')
  gameStarted.value = false
  currentQuestion.value = 0
  selectedAnswer.value = ""
  correctAnswers.value = 0
  showResult.value = false
  quizCompleted.value = false
  showNotification.value = false
}
</script> 