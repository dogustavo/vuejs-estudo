<script setup lang="ts">
import styles from './styles.module.scss'
</script>

<template>
  <div :class="styles.container">
    <slot></slot>
  </div>
</template>
