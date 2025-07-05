<template>
  <div role="radiogroup" :class="$attrs.class">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue'

interface Props {
  modelValue?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const selectedValue = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  selectedValue.value = newVal
})

const updateValue = (value: string) => {
  selectedValue.value = value
  emit('update:modelValue', value)
}

provide('radioGroup', {
  value: selectedValue,
  updateValue
})
</script> 