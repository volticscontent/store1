<script setup lang="ts">
interface Props {
  value: number
}

const props = defineProps<Props>()
</script>

<template>
  <div
    role="progressbar"
    :aria-valuemin="0"
    :aria-valuemax="100"
    :aria-valuenow="props.value"
    class="relative h-4 w-full overflow-hidden rounded-full bg-gray-200"
  >
    <div 
      class="h-full bg-blue-600 transition-all duration-300"
      :style="{ width: `${props.value}%` }"
    />
  </div>
</template> 