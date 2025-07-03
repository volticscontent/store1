<template>
  <input
    type="radio"
    :id="id"
    :value="value"
    :checked="groupValue?.value === value"
    @change="handleChange"
    class="h-4 w-4 rounded-full border border-primary text-primary shadow focus:ring-2 focus:ring-ring focus:ring-offset-2"
  />
</template>

<script setup lang="ts">
import { inject } from 'vue'

interface Props {
  value: string
  id?: string
}

const props = defineProps<Props>()

const radioGroup = inject('radioGroup') as any
const groupValue = radioGroup?.value

const handleChange = () => {
  radioGroup?.updateValue(props.value)
}
</script> 