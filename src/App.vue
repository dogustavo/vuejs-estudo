<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <header><span>header aqui</span></header>
  <main>
    <RouterView />
  </main>

  <footer><span>Footer aqui</span></footer>

  <VueQueryDevtools />
</template>
