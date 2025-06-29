<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  correctAnswers: number
}>()

const discount = computed(() => props.correctAnswers * 25)
const originalPrice = 150.0
const finalPrice = computed(() => Math.max(originalPrice - discount.value, 50.0))
</script>

<template>
  <div class="space-y-6">
    <div class="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
      <h3 class="text-xl font-semibold mb-4 text-blue-900">O que está incluído na sua camisa?</h3>
      <div class="space-y-4">
        <div class="flex items-start">
          <div class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span class="text-2xl">👕</span>
          </div>
          <div class="ml-4">
            <h4 class="font-semibold text-lg">Camisa Oficial do Thunder</h4>
            <p class="text-gray-600">Camisa oficial da temporada 2023-24</p>
            <p class="text-blue-600 font-semibold mt-1">$150</p>
          </div>
        </div>

        <div class="flex items-start">
          <div class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span class="text-2xl">🏅</span>
          </div>
          <div class="ml-4">
            <h4 class="font-semibold text-lg">Distintivo Edição Limitada NBA Finals</h4>
            <p class="text-gray-600">Edição especial comemorativa</p>
            <p class="text-blue-600 font-semibold mt-1">$30</p>
          </div>
        </div>

        <div class="flex items-start">
          <div class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span class="text-2xl">✍️</span>
          </div>
          <div class="ml-4">
            <h4 class="font-semibold text-lg">Nome + Número Personalizado</h4>
            <p class="text-gray-600">Escolha seu nome e número favorito</p>
            <p class="text-blue-600 font-semibold mt-1">$30</p>
          </div>
        </div>

        <div class="flex items-start">
          <div class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span class="text-2xl">✨</span>
          </div>
          <div class="ml-4">
            <h4 class="font-semibold text-lg">Autógrafo Oficial do Shai Gilgeous-Alexander</h4>
            <p class="text-gray-600">Autenticado e certificado</p>
            <p class="text-blue-600 font-semibold mt-1">$100</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-50 p-6 rounded-lg">
      <div class="space-y-2">
        <div class="flex justify-between text-gray-600">
          <span>Valor Total</span>
          <span class="font-semibold">$310</span>
        </div>
        <div class="flex justify-between text-green-600">
          <span>Desconto por Acertos</span>
          <span class="font-semibold">-${{ discount }}</span>
        </div>
        <div class="flex justify-between text-red-600">
          <span>Desconto Especial</span>
          <span class="font-semibold">-${{ 310 - finalPrice }}</span>
        </div>
        <div class="flex justify-between text-xl font-bold text-blue-900 pt-2 border-t">
          <span>Preço Final</span>
          <span>${{ finalPrice }}</span>
        </div>
      </div>
    </div>
  </div>
</template> 