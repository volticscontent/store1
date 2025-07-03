<template>
  <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
    <div class="flex items-start space-x-3">
      <input 
        type="checkbox" 
        id="marketing-consent" 
        v-model="consentGiven"
        @change="$emit('consent-changed', consentGiven)"
        class="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <div class="flex-1">
        <label for="marketing-consent" class="text-sm font-poppins-medium text-gray-700 cursor-pointer">
          I agree to receive marketing communications and promotional offers
        </label>
        <p class="text-xs text-gray-500 mt-1 font-poppins-regular">
          By checking this box, you consent to receive marketing emails, SMS messages, and promotional offers from OKC Fans. 
          You can unsubscribe at any time. Message and data rates may apply. 
          Your information will be used in accordance with our 
          <a href="#" class="text-blue-600 hover:underline">Privacy Policy</a> and 
          <a href="#" class="text-blue-600 hover:underline">Terms of Service</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const consentGiven = ref(false)

defineEmits<{
  'consent-changed': [value: boolean]
}>()
</script> 