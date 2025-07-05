<script setup>
import PaginaDoProduto from './pagina_do_produto.vue'
</script>

<template>
  <div id="app">
    <PaginaDoProduto />
  </div>
</template>

<style>
/* Reset global */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ffffff;
  color: #333333;
}

#app {
  min-height: 100vh;
  position: relative;
}

/* Configurações mobile-first */
@media (max-width: 767px) {
  body {
    font-size: 14px;
  }
}

/* Configurações para tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  body {
    font-size: 15px;
  }
}

/* Configurações para desktop */
@media (min-width: 1024px) {
  body {
    font-size: 16px;
  }
}
</style>
