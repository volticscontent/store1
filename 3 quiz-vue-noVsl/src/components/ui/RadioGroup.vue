<script setup lang="ts">
import { provide } from 'vue'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const updateValue = (value: string) => {
  emit('update:modelValue', value)
}

provide('radioGroup', {
  modelValue: props.modelValue,
  updateValue
})
</script>

<template>
  <div role="radiogroup" class="grid gap-2">
    <slot />
  </div>
</template> 