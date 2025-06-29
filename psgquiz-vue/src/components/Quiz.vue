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
          <CardTitle class="text-4xl font-bold text-blue-900 mb-6">Mensagem da Diretoria do Thunder</CardTitle>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="mb-6">
            <VideoPlayer :is-ready="true" />
          </div>

          <div class="bg-blue-50 p-6 rounded-lg border-2 border-blue-200 esconder mb-6">
            <blockquote class="text-sm md:text-lg text-gray-800 italic text-center leading-relaxed">
              "Responda às 4 perguntas para provar que você é um verdadeiro fã do time e ganhe a oportunidade de
              comprar uma camisa autografada a preço de custo"
            </blockquote>
          </div>

          <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 esconder mb-6">
            <div class="flex items-center justify-center space-x-2 text-yellow-800">
              <Star class="h-5 w-5" />
              <span class="font-semibold">Desconto máximo: $100 • Preço final: $50,00</span>
              <Star class="h-5 w-5" />
            </div>
          </div>

          <div class="px-4 pb-6 esconder">
            <Button
              @click="handleStartQuiz"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3"
              size="lg"
            >
              <Trophy class="h-6 w-6" />
              Começar o Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Quiz completed screen -->
    <div v-else-if="quizCompleted" class="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600 flex items-center justify-center p-4">
      <Card class="w-full max-w-2xl mx-2">
        <CardHeader class="text-center">
          <div class="flex justify-center mb-4">
            <Trophy class="h-16 w-16 text-yellow-500" />
          </div>
          <CardTitle class="text-3xl font-bold text-blue-900">Parabéns, Verdadeiro Fã do Thunder! 🎉</CardTitle>
          <CardDescription class="text-lg">
            Você acertou {{ correctAnswers }} de {{ questions.length }} perguntas
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
              <DollarSign class="mr-2 h-5 w-5" />
              Comprar Agora
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              class="w-full" 
              @click="handleRestart"
            >
              Recomeçar
            </Button>
          </div>

          <div class="text-center text-sm text-gray-600">
            <p>* Oferta válida apenas para verdadeiros fãs do Thunder</p>
            <p>** Preço especial: $50,00 (desconto máximo aplicado)</p>
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
                  alt="Camisa do Thunder"
                  class="w-full h-full object-cover"
                />
              </div>
              <div>
                <CardTitle class="text-xl">Quiz do Thunder</CardTitle>
                <CardDescription>
                  Pergunta {{ currentQuestion + 1 }} de {{ questions.length }}
                </CardDescription>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-600">Desconto atual</p>
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
              Confirmar Resposta
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
                    <span class="text-green-800 font-semibold text-lg">Correto! +$25 de desconto</span>
                  </template>
                  <template v-else>
                    <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                      <span class="text-white font-bold">✗</span>
                    </div>
                    <span class="text-red-800 font-semibold text-lg">Incorreto</span>
                  </template>
                </div>

                <p class="text-gray-700 mb-3">
                  <strong>Resposta correta:</strong>
                  {{ questions[currentQuestion].options[questions[currentQuestion].correct] }}
                </p>

                <p class="text-gray-600 text-sm">{{ questions[currentQuestion].explanation }}</p>
              </div>

              <Button @click="nextQuestion" class="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                {{ currentQuestion < questions.length - 1 ? "Próxima Pergunta" : "Ver Resultado Final" }}
              </Button>
            </div>
          </template>

          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Progresso do desconto:</span>
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
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Trophy, DollarSign, Star } from 'lucide-vue-next'
import PriceAnchoring from '@/components/PriceAnchoring.vue'
import PixelScripts from '@/components/PixelScripts.vue'
import SuccessNotification from '@/components/SuccessNotification.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'
import { usePixelLoader } from '@/composables/usePixelLoader'
import { useTrackVSLView, trackEvent } from '@/composables/useTrackVSLView'
import { questions } from '@/types/quiz'
import { generateTikTokTestUrl, isFromTikTokAds } from '@/utils/tracking'

const pixelScriptsRef = ref<InstanceType<typeof PixelScripts> | null>(null)

const gameStarted = ref(false)
const currentQuestion = ref(0)
const selectedAnswer = ref("")
const correctAnswers = ref(0)
const showResult = ref(false)
const quizCompleted = ref(false)
const showNotification = ref(false)
const audioInitialized = ref(false)
const audioRef = ref<HTMLAudioElement | null>(null)
const isPixelsReady = usePixelLoader()

useTrackVSLView()

onMounted(() => {
  if (isFromTikTokAds()) {
    trackEvent('TikTokVisitor')
  }
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
  trackEvent('StartQuiz')
}

const handleAnswer = () => {
  showResult.value = true
  const isCorrect = Number.parseInt(selectedAnswer.value) === questions[currentQuestion.value].correct
  
  if (isCorrect) {
    correctAnswers.value++
    showNotification.value = true
    playNotificationSound()
    trackEvent('CorrectAnswer')
  } else {
    trackEvent('WrongAnswer')
  }
}

const nextQuestion = () => {
  if (currentQuestion.value < questions.length - 1) {
    currentQuestion.value++
    selectedAnswer.value = ""
    showResult.value = false
    showNotification.value = false
    trackEvent('NextQuestion')
  } else {
    quizCompleted.value = true
    trackEvent('QuizCompleted')
  }
}

const handleBuyNowClick = () => {
  trackEvent('Purchase')
  
  // URL base do checkout
  const baseUrl = 'https://checkout.seudominio.com/checkout'
  
  // Parâmetros UTM para teste do TikTok
  const utmParams = new URLSearchParams({
    'utm_source': 'tiktok',
    'utm_medium': 'cpc',
    'utm_campaign': 'quiz_thunder',
    'utm_content': 'quiz_result',
    'ttclid': '${click_id}', // TikTok substituirá isso pelo ID real do clique
    'discount': (correctAnswers.value * 25).toString()
  })

  // Se estiver em modo de teste, usa a URL de teste
  const finalUrl = import.meta.env.DEV 
    ? generateTikTokTestUrl(`${baseUrl}?${utmParams.toString()}`)
    : `${baseUrl}?${utmParams.toString()}`
  
  window.location.href = finalUrl
}

const handleRestart = () => {
  gameStarted.value = false
  currentQuestion.value = 0
  selectedAnswer.value = ""
  correctAnswers.value = 0
  showResult.value = false
  quizCompleted.value = false
  showNotification.value = false
  trackEvent('RestartQuiz')
}
</script> 