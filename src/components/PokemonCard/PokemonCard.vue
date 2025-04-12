<script setup lang="ts">
import { computed } from 'vue'
import type { Pokemon } from '@/types/pokemon'
import { getPokemonSpecie } from '@/services'
import { useQuery } from '@tanstack/vue-query'

import { TYPE_COLORS } from '@/utils/pokemon-type-color'

const { pokemon } = defineProps<{ pokemon: Pokemon }>()

const { data: flavorDescription, status } = useQuery({
  queryKey: ['pokemon_name', pokemon.name],
  queryFn: async () => await getPokemonSpecie(pokemon.name),
  refetchOnWindowFocus: false,
})

const isLoading = computed(() => status.value !== 'success')
</script>

<template>
  <router-link :to="`/${pokemon.name}`" data-testid="pokemon-card-link">
    <div class="pokemon-card">
      <div class="pokemon-status">
        <div class="pokemon-status__type-badge">
          <span
            v-for="type in pokemon.types"
            :key="type.slot"
            :style="{ backgroundColor: TYPE_COLORS[type.type.name] }"
            class="pokemon-status__badge-text"
            :class="{
              'pokemon-status__badge-text--fire': type.type.name === 'fire',
            }"
            >{{ type.type.name }}</span
          >
        </div>

        <h3>{{ pokemon.name }}</h3>

        <p v-if="!isLoading" v-html="flavorDescription?.flavor_text"></p>
        <p v-else>Carregando...</p>
      </div>

      <div class="pokemon-card__pokemon">
        <p># {{ String(pokemon.id).padStart(3, '0') }}</p>
        <img :src="pokemon.sprites.front_default" />
      </div>
    </div>
  </router-link>
</template>

<style scoped>
@import './styles.module.scss';
</style>
