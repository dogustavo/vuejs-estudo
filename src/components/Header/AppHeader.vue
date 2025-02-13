<!-- AppHeader.vue -->
<script lang="ts" setup>
import Container from '../Container/AppContainer.vue'

defineProps<{
  msg: string
}>()
</script>

<template>
  <header>
    <Container>
      <div>
        <p>{{ msg }}</p>
      </div>
      <slot></slot>
    </Container>
  </header>
</template>

<style scoped></style>
