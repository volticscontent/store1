<!-- Card.vue -->
<template>
  <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
    <div v-if="$slots.header" class="flex flex-col space-y-1.5 p-6">
      <slot name="header"></slot>
    </div>
    <div v-if="$slots.default" class="p-6 pt-0">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="flex items-center p-6 pt-0">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// O componente não precisa de props por enquanto
</script> 