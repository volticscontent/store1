<!-- Quiz.vue -->
<template>
  <div>
    <!-- PixelScripts removido para evitar duplicação -->
    <audio
      id="notification-sound"
      src="https://cdn.shopify.com/s/files/1/0946/2290/8699/files/notifica_o-venda.mp3?v=1749150271"
      preload="auto"
      style="display: none"
    />

    <!-- Global Success Notification -->
    <SuccessNotification :show="showNotification" @close="showNotification = false" />

    <!-- PRIMEIRA PÁGINA COMENTADA -->
    <!-- 
    <div v-if="currentScreen === 'products'" class="min-h-screen bg-white px-1 animate-slide-in-up pb-20">
      <div class="w-full max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full mt-10 text-sm font-medium mb-6 animate-fade-in-up">
            <Trophy class="h-4 w-4" />
            Exclusive Mystery Collection
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-poppins-bold text-slate-900 mb-4 leading-tight animate-fade-in-up-delay-100">
            Premium Mystery Box
            <span class="text-orange-600">Luxury Perfumes</span>
          </h1>
          <p class="text-xl text-slate-600 font-poppins-medium max-w-2xl mx-2 animate-fade-in-up-delay-200">
            Surprise box with 3-5 premium brand perfumes worth $200+. Get yours at incredible discount for verified customers only.
          </p>
        </div>

        <div class="space-y-8">
          <HeroProduct class="animate-fade-in-up-delay-200" />

          <ProductShowcase 
            v-if="productCarousels.length > 0"
            :products="productCarousels[0].products"
            :auto-rotate="true"
            :rotation-interval="5000"
            class="animate-fade-in-up-delay-300"
          />

          <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 animate-fade-in-up-delay-400">
            <div class="grid md:grid-cols-3 gap-8 text-center">
              <div class="flex flex-col items-center hover-lift">
                <div class="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-4 animate-scale-in">
                  <Star class="h-8 w-8 text-orange-600" />
                </div>
                <h4 class="text-lg font-poppins-semibold text-slate-900 mb-2">100% Authentic</h4>
                <p class="text-slate-600 text-sm">Original designer fragrances from top luxury brands</p>
              </div>
              <div class="flex flex-col items-center hover-lift" style="animation-delay: 0.1s;">
                <div class="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-4 animate-scale-in" style="animation-delay: 0.1s;">
                  <Trophy class="h-8 w-8 text-orange-600" />
                </div>
                <h4 class="text-lg font-poppins-semibold text-slate-900 mb-2">Mystery Surprise</h4>
                <p class="text-slate-600 text-sm">Each box contains 3-5 surprise perfumes worth $200+</p>
              </div>
              <div class="flex flex-col items-center hover-lift" style="animation-delay: 0.2s;">
                <div class="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-4 animate-scale-in" style="animation-delay: 0.2s;">
                  <DollarSign class="h-8 w-8 text-orange-600" />
                </div>
                <h4 class="text-lg font-poppins-semibold text-slate-900 mb-2">Huge Savings</h4>
                <p class="text-slate-600 text-sm">Up to 80% off retail price for quiz participants</p>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-8 mb-10 text-white text-center">
            <h3 class="text-2xl font-poppins-bold mb-4">
              Prove You're a Fragrance Enthusiast
            </h3>
            <p class="text-orange-100 mb-6 max-w-2xl mx-auto">
              Answer 4 simple questions about luxury perfumes to unlock your exclusive mystery box discount.
            </p>
            <div class="flex items-center justify-center gap-2 mb-6">
              <div class="bg-white bg-opacity-20 rounded-full px-4 py-2">
                <span class="text-sm font-medium">Each correct answer = $10 discount</span>
              </div>
            </div>
            
            <Button
              @click="goToVSL"
              class="bg-white hover:bg-orange-50 px-8 sm:px-12 md:px-16 py-6 sm:py-8 font-semibold rounded-xl shadow-lg hover:shadow-xl ripple-effect premium-press animate-premium-pulse inline-flex items-center gap-3 border-2 border-orange-600"
              style="color: #1e293b !important; font-weight: 600 !important;"
              size="lg"
            >
              <Trophy class="h-5 w-5 text-orange-600" />
              <span style="color: #1e293b !important;">Start Fragrance Quiz</span>
            </Button>
          </div>
        </div>
      </div>

      <div 
        v-show="showFixedCTA" 
        class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-orange-200 shadow-2xl transition-transform duration-300 ease-in-out"
        :class="showFixedCTA ? 'translate-y-0' : 'translate-y-full'"
      >
        <div class="p-3">
          <Button
            @click="goToVSL"
            class="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:from-orange-700 hover:to-orange-800 py-4 text-lg font-bold rounded-none shadow-lg hover:shadow-xl ripple-effect premium-press animate-premium-pulse inline-flex items-center justify-center gap-3"
            size="lg"
          >
            <Trophy class="h-5 w-5" />
            Start Fragrance Quiz - Get Up to $40 OFF
          </Button>
          <p class="text-xs text-slate-500 text-center mt-2">🎯 Each correct answer = $10 discount</p>
        </div>
      </div>
    </div>
    -->

    <!-- VSL screen -->
    <div v-if="currentScreen === 'initial'" class="min-h-screen bg-slate-50 px-4 py-8 animate-slide-in-right">
      <div class="w-full max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <div class="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in-up">
            <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            Live Message
          </div>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-poppins-bold text-slate-900 mb-4 leading-tight animate-fade-in-up-delay-100">
            Message from
            <span class="text-orange-600">Temu Fragrance Team</span>
          </h1>
        </div>
        
        <div class="space-y-8">
          <div class="bg-white rounded-2xl  shadow-sm border border-slate-200">
            <VideoPlayer :is-ready="true" @video-started="handleVideoStarted" />
          </div>

          <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <div class="text-center">
              <div class="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Trophy class="h-8 w-8 text-orange-600" />
              </div>
              <blockquote class="text-lg md:text-xl text-slate-700 leading-relaxed font-poppins-medium mb-6">
                "Answer 4 questions to prove you're a true fragrance lover and earn the opportunity to buy our mystery perfume box at incredible discount"
              </blockquote>
              <p class="text-slate-500 font-medium">— Temu Fragrance Specialists</p>
            </div>
          </div>

          <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
            <div class="text-center">
              <div class="flex items-center justify-center gap-2 mb-4">
                <Star class="h-5 w-5 text-amber-500" />
                <span class="font-poppins-bold text-lg text-slate-900">Fragrance Expert Reward</span>
                <Star class="h-5 w-5 text-amber-500" />
              </div>
              <p class="text-slate-700 font-medium">
                Maximum discount: <span class="font-bold text-green-600">$40</span> • 
                Final price: <span class="font-bold text-orange-600">$19.99</span>
              </p>
            </div>
          </div>

          <!-- Trust Partners - Static Grid -->
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div class="grid grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center">
              <!-- SSL Secure -->
              <div class="flex flex-col items-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <circle cx="12" cy="16" r="1"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span class="text-xs text-gray-600 font-poppins-medium mt-1">SSL</span>
              </div>

              <!-- Trustpilot -->
              <div class="flex flex-col items-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#374151">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span class="text-xs text-gray-600 font-poppins-medium mt-1">Trustpilot</span>
              </div>

              <!-- PayPal -->
              <div class="flex flex-col items-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="1.5">
                  <path d="M7 21h10"/>
                  <path d="M12 21v-8"/>
                  <path d="M12 13V7a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v6"/>
                  <path d="M4 13V7a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v6"/>
                </svg>
                <span class="text-xs text-gray-600 font-poppins-medium mt-1">PayPal</span>
              </div>

              <!-- Visa -->
              <div class="flex flex-col items-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="1.5">
                  <rect x="2" y="5" width="20" height="14" rx="2"/>
                  <line x1="2" y1="10" x2="22" y2="10"/>
                </svg>
                <span class="text-xs text-gray-600 font-poppins-medium mt-1">Visa</span>
              </div>

              <!-- Norton Secure -->
              <div class="flex flex-col items-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
                <span class="text-xs text-gray-600 font-poppins-medium mt-1">Norton</span>
              </div>

              <!-- McAfee -->
              <div class="flex flex-col items-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="1.5">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <span class="text-xs text-gray-600 font-poppins-medium mt-1">McAfee</span>
              </div>
            </div>
          </div>

          <div class="text-center pt-4">
            <Button
              @click="handleStartQuiz"
              class="bg-orange-600 text-white hover:bg-orange-700 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl ripple-effect premium-press animate-premium-pulse inline-flex items-center gap-3"
              size="lg"
            >
              <Trophy class="h-5 w-5" />
              Start Fragrance Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Quiz screen -->
    <div v-else-if="currentScreen === 'quiz'" class="min-h-screen bg-slate-50 px-4 py-8 animate-slide-in-left">
      <div class="w-full max-w-3xl mx-auto">
        <!-- Quiz Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <div class="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
              <span class="text-white text-xs font-bold">{{ currentQuestion + 1 }}</span>
            </div>
            Fragrance Quiz
          </div>
          <h1 class="text-2xl sm:text-3xl font-poppins-bold text-slate-900 mb-2">Question {{ currentQuestion + 1 }} of {{ questions.length }}</h1>
          <div class="w-full max-w-md mx-auto bg-slate-200 rounded-full h-2">
            <div 
              class="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-500"
              :style="`width: ${((currentQuestion + 1) / questions.length) * 100}%`"
            ></div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          <h2 class="text-xl sm:text-2xl font-poppins-semibold text-slate-900 leading-tight text-center">
            {{ questions[currentQuestion].question }}
          </h2>

          <template v-if="!showResult">
            <div class="space-y-4">
              <RadioGroup v-model="selectedAnswer" class="space-y-4">
                <div
                  v-for="(option, index) in questions[currentQuestion].options"
                  :key="index"
                  class="group relative bg-slate-50 hover:bg-orange-50 border-2 border-slate-200 hover:border-orange-300 rounded-xl p-4 cursor-pointer transition-all duration-200"
                  @click="selectedAnswer = index.toString()"
                >
                  <div class="flex items-center space-x-4">
                    <RadioGroupItem :value="index.toString()" :id="`option-${index}`" class="text-orange-600" />
                    <Label :for="`option-${index}`" class="flex-1 cursor-pointer font-poppins-medium text-slate-700 group-hover:text-slate-900">
                      {{ option }}
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div class="text-center pt-4">
              <Button
                @click="handleAnswer"
                :disabled="!selectedAnswer"
                class="bg-orange-600 text-white hover:bg-orange-700 disabled:bg-slate-300 disabled:cursor-not-allowed px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center gap-3"
                size="lg"
              >
                Confirm Answer
              </Button>
            </div>
          </template>

          <template v-else>
            <div class="space-y-6">
              <div
                :class="`p-6 rounded-2xl border-2 ${
                  Number.parseInt(selectedAnswer) === questions[currentQuestion].correct
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`"
              >
                <div class="flex items-center justify-center mb-4">
                  <template v-if="Number.parseInt(selectedAnswer) === questions[currentQuestion].correct">
                    <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mr-4">
                      <span class="text-white text-2xl font-bold">✓</span>
                    </div>
                    <div class="text-center">
                      <span class="text-green-800 font-poppins-bold text-xl block">Correct!</span>
                      <span class="text-green-700 font-medium">+$10 discount earned</span>
                    </div>
                  </template>
                  <template v-else>
                    <div class="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mr-4">
                      <span class="text-white text-2xl font-bold">✗</span>
                    </div>
                    <div class="text-center">
                      <span class="text-red-800 font-poppins-bold text-xl block">Incorrect</span>
                      <span class="text-red-700 font-medium">No discount this round</span>
                    </div>
                  </template>
                </div>

                <div class="bg-white rounded-xl p-4 mb-4">
                  <p class="text-slate-700 font-medium mb-2">
                    <span class="text-orange-600 font-semibold">Correct answer:</span>
                    {{ questions[currentQuestion].options[questions[currentQuestion].correct] }}
                  </p>
                  <p class="text-slate-600 text-sm">{{ questions[currentQuestion].explanation }}</p>
                </div>
              </div>

              <div class="text-center">
                <Button 
                  @click="nextQuestion" 
                  class="bg-orange-600 text-white hover:bg-orange-700 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center gap-3"
                  size="lg"
                >
                  {{ currentQuestion < questions.length - 1 ? "Next Question" : "See Final Result" }}
                </Button>
              </div>
            </div>
          </template>
        </div>

        <!-- Progress bar -->
        <div class="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div class="flex justify-between items-center mb-4">
            <span class="text-slate-600 font-medium">Fragrance Discount Progress</span>
            <span class="font-poppins-bold text-lg text-slate-900">${{ correctAnswers * 10 }} / $40</span>
          </div>
          <div class="w-full bg-slate-200 rounded-full h-3">
            <div 
              class="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
              :style="`width: ${(correctAnswers / 4) * 100}%`"
            ></div>
          </div>
          <div class="flex justify-between mt-2 text-xs text-slate-500">
            <span>$0</span>
            <span>$10</span>
            <span>$20</span>
            <span>$30</span>
            <span>$40</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quiz completed screen -->
    <div v-else-if="currentScreen === 'completed'" class="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 px-4 py-8 animate-zoom-in">
      <div class="w-full max-w-4xl mx-auto">
        <!-- Success Header -->
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            Verification Complete
          </div>
          
          <div class="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
            <Trophy class="h-12 w-12 text-white" />
          </div>
          
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-poppins-bold text-slate-900 mb-4 leading-tight">
            Congratulations,
            <span class="text-orange-600">Fragrance Enthusiast!</span>
          </h1>
          
          <p class="text-xl text-slate-600 font-poppins-medium mb-8">
            You scored {{ correctAnswers }} out of {{ questions.length }} questions correct
          </p>

          <!-- Score visualization -->
          <div class="grid grid-cols-4 gap-2 max-w-xs mx-auto mb-8">
            <div 
              v-for="i in 4" 
              :key="i"
              :class="`h-3 rounded-full ${i <= correctAnswers ? 'bg-green-500' : 'bg-slate-200'}`"
            ></div>
          </div>
        </div>
        
        <div class="space-y-8">
          <!-- Fan Status & Discount -->
          <div class="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center">
            <div class="mb-6">
              <div class="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-6 py-3 rounded-full font-semibold mb-4">
                <Star class="h-5 w-5" />
                Verified Fragrance Lover
              </div>
              <h2 class="text-2xl font-poppins-bold text-slate-900 mb-2">Your Fragrance Discount</h2>
              <div class="flex items-center justify-center gap-4 mb-4">
                <span class="text-4xl font-poppins-bold text-green-600">${{ correctAnswers * 10 }}</span>
                <span class="text-slate-500">discount earned</span>
              </div>
              <div class="flex items-center justify-center gap-2 text-slate-600">
                <span>Final price:</span>
                <span class="text-3xl font-poppins-bold text-orange-600">$19.99</span>
                <span class="text-lg text-slate-500 line-through">${{ 199.99 }}</span>
              </div>
            </div>
          </div>

          <PriceAnchoring :correct-answers="correctAnswers" />

          <!-- Action buttons -->
          <div class="text-center space-y-4">
            <Button
              class="bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:from-orange-700 hover:to-orange-800 px-6 sm:px-8 md:px-12 py-4 text-lg sm:text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center gap-3"
              size="lg"
              @click="handleBuyNowClick"
            >
              <DollarSign class="h-6 w-6" />
              Claim Your Mystery Box Now
            </Button>
            
            <p class="text-sm text-slate-500">Secure checkout • Limited time offer</p>

            <div class="pt-4">
              <Button 
                variant="outline" 
                class="text-slate-600 border-slate-300 hover:bg-slate-50 px-6 py-2 rounded-lg" 
                @click="handleRestart"
              >
                Take Quiz Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading screen -->
    <div v-else-if="currentScreen === 'loading'" class="min-h-screen bg-gradient-to-br from-orange-900 to-red-900 px-4 py-8 flex items-center justify-center animate-fade-in">
      <div class="w-full max-w-md mx-auto text-center">
        <!-- Loading Animation -->
        <div class="relative mb-8">
          <div class="w-32 h-32 mx-auto relative">
            <!-- Outer spinning ring -->
            <div class="absolute inset-0 border-4 border-orange-200 rounded-full animate-spin"></div>
            <div class="absolute inset-0 border-4 border-transparent border-t-orange-400 rounded-full animate-spin" style="animation-duration: 1s;"></div>
            
            <!-- Inner pulsing circle -->
            <div class="absolute inset-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center animate-pulse">
              <Trophy class="h-12 w-12 text-white animate-bounce" />
            </div>
          </div>
        </div>

        <!-- Loading Text -->
        <h2 class="text-2xl font-poppins-bold text-white mb-4 animate-pulse">
          {{ loadingText }}
        </h2>

        <!-- Progress Bar -->
        <div class="w-full bg-orange-800 rounded-full h-3 mb-6 overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-orange-400 to-orange-300 rounded-full transition-all duration-800 ease-out relative"
            :style="`width: ${loadingProgress}%`"
          >
            <div class="absolute inset-0 bg-white bg-opacity-30 animate-shimmer"></div>
          </div>
        </div>

        <!-- Loading Steps -->
        <div class="space-y-2 text-orange-200">
          <div class="flex items-center justify-center gap-2">
            <div class="w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
            <span class="text-sm">Accessing exclusive fragrance deals...</span>
          </div>
          <div class="flex items-center justify-center gap-2">
            <div class="w-2 h-2 bg-orange-400 rounded-full animate-ping" style="animation-delay: 0.2s;"></div>
            <span class="text-sm">Validating fragrance expertise...</span>
          </div>
          <div class="flex items-center justify-center gap-2">
            <div class="w-2 h-2 bg-orange-400 rounded-full animate-ping" style="animation-delay: 0.4s;"></div>
            <span class="text-sm">Preparing your mystery box...</span>
          </div>
        </div>

        <!-- Discount Badge -->
        <div class="mt-8 inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-semibold animate-bounce">
          <DollarSign class="h-5 w-5" />
          ${{ correctAnswers * 10 }} Discount Applied!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Button from '@/components/ui/Button.vue'
import RadioGroup from '@/components/ui/RadioGroup.vue'
import RadioGroupItem from '@/components/ui/RadioGroupItem.vue'
import Label from '@/components/ui/Label.vue'
import HeroProduct from '@/components/HeroProduct.vue'
import ProductShowcase from '@/components/ProductShowcase.vue'

import { Trophy, DollarSign, Star } from 'lucide-vue-next'
import PriceAnchoring from '@/components/PriceAnchoring.vue'
import SuccessNotification from '@/components/SuccessNotification.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'
import { useTrackVSLView } from '@/composables/useTrackVSLView'
import { useCarouselManager } from '@/composables/useCarouselManager'
import { questions } from '@/types/quiz'
import { generateTikTokTestUrl, isFromTikTokAds } from '@/utils/tracking'
import { trackEvent } from '@/utils/tracking-simple'

const currentScreen = ref<'products' | 'initial' | 'quiz' | 'completed' | 'loading'>('initial')
const currentQuestion = ref(0)
const selectedAnswer = ref("")
const correctAnswers = ref(0)
const showResult = ref(false)
const showNotification = ref(false)
const audioInitialized = ref(false)
const audioRef = ref<HTMLAudioElement | null>(null)
const isLoading = ref(false)
const loadingText = ref("Loading Mystery Box...")
const loadingProgress = ref(0)
const showFixedCTA = ref(false)

useTrackVSLView()

// Carousel management
const { 
  getCarouselsForPage, 
  trackCarouselView, 
  trackCarouselInteraction 
} = useCarouselManager()

const productCarousels = ref(getCarouselsForPage('products'))

onMounted(() => {
  trackEvent('PageInit')
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

// Função utilitária para scroll suave com delay e feedback visual
const smoothScrollToTop = (delay = 100) => {
  setTimeout(() => {
    // Adicionar classe de scroll para feedback visual
    document.body.classList.add('scrolling')
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    
    // Remover classe após o scroll completar
    setTimeout(() => {
      document.body.classList.remove('scrolling')
    }, 1000)
  }, delay)
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

const goToVSL = () => {
  currentScreen.value = 'initial'
  trackEvent('GoToVSL')
  // Scroll suave para o topo com delay para animação
  smoothScrollToTop(200)
}

const handleVideoStarted = () => {
  trackEvent('VSL_View')
}

const handleStartQuiz = () => {
  currentScreen.value = 'quiz'
  trackEvent('StartQuiz')
  // Primeiro evento de questão
  trackEvent('Question1')
  // Scroll suave para o topo com delay para animação
  smoothScrollToTop(200)
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
    trackEvent(`Question${currentQuestion.value + 1}`)
    // Scroll suave para o topo na próxima pergunta
    smoothScrollToTop(150)
  } else {
    currentScreen.value = 'completed'
    trackEvent('QuizCompleted')
    // Scroll suave para o topo na tela de resultado
    smoothScrollToTop(300)
  }
}

const handleBuyNowClick = () => {
  trackEvent('GoToStore')
  
  // Iniciar animação de loading
  currentScreen.value = 'loading'
  isLoading.value = true
  loadingProgress.value = 0
  
  // Simular progresso de carregamento
  const loadingSteps = [
    { text: "Loading Mystery Box...", progress: 20 },
    { text: "Verifying Fragrance Knowledge...", progress: 40 },
    { text: "Applying Discount...", progress: 60 },
    { text: "Preparing Exclusive Deals...", progress: 80 },
    { text: "Redirecting to Store...", progress: 100 }
  ]
  
  let stepIndex = 0
  
  const progressTimer = setInterval(() => {
    if (stepIndex < loadingSteps.length) {
      loadingText.value = loadingSteps[stepIndex].text
      loadingProgress.value = loadingSteps[stepIndex].progress
      stepIndex++
    } else {
      clearInterval(progressTimer)
      
      // Redirecionar após animação completa
      setTimeout(() => {
        // Base checkout URL
        const baseUrl = 'https://nbathunderr.shop'
        
        // UTM parameters for TikTok testing
        const utmParams = new URLSearchParams({
          'utm_source': 'tiktok',
          'utm_medium': 'cpc',
          'utm_campaign': 'quiz_thunder',
          'utm_content': 'quiz_result',
          'ttclid': '${click_id}', // TikTok will replace this with real click ID
          'discount': (correctAnswers.value * 10).toString()
        })

        // If in test mode, use test URL
        const finalUrl = import.meta.env.DEV 
          ? generateTikTokTestUrl(`${baseUrl}?${utmParams.toString()}`)
          : `${baseUrl}?${utmParams.toString()}`
        
        window.location.href = finalUrl
      }, 500)
    }
  }, 800)
}

const handleRestart = () => {
  currentScreen.value = 'initial'
  currentQuestion.value = 0
  selectedAnswer.value = ""
  correctAnswers.value = 0
  showResult.value = false
  showNotification.value = false
  trackEvent('RestartQuiz')
  // Scroll suave para o topo ao reiniciar
  smoothScrollToTop(200)
}

// Função para mostrar/ocultar o botão CTA fixo com base no scroll da página
const handleScroll = () => {
  const scrollY = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollThreshold = windowHeight * 0.8 // 80% da altura da janela

  showFixedCTA.value = scrollY > scrollThreshold
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script> 