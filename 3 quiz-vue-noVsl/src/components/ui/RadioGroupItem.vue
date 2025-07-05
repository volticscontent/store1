<script setup lang="ts">
import { inject, computed } from 'vue'

interface Props {
  value: string
  id: string
}

const props = defineProps<Props>()

const radioGroup = inject('radioGroup') as any

const isChecked = computed(() => radioGroup?.modelValue === props.value)

const handleChange = () => {
  radioGroup?.updateValue(props.value)
}
</script>

<template>
  <input
    type="radio"
    :id="props.id"
    :value="props.value"
    :checked="isChecked"
    @change="handleChange"
    class="peer h-4 w-4 rounded-full border border-blue-600 text-blue-600 ring-offset-background focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  />
</template> 