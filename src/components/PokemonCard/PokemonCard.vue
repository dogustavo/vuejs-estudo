<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import type { Pokemon, PokemonType } from '@/types/pokemon'
import { getPokemonSpecie } from '@/services'

import styled from './styles.module.scss'

const { pokemon } = defineProps<{ pokemon: Pokemon }>()

const isLoading = ref(true)
const error = ref('')
const description = ref('')

onMounted(async () => {
  try {
    const flavorDescription = await getPokemonSpecie(pokemon.name)

    description.value = flavorDescription.flavor_text
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message
    }
  } finally {
    isLoading.value = false
  }
})

const TYPE_COLORS: Record<PokemonType, string> = {
  bug: '#B1C12E',
  dark: '#4F3A2D',
  dragon: '#755EDF',
  electric: '#FCBC17',
  fairy: '#F4B1F4',
  fighting: '#763018',
  fire: '#E73B0C',
  flying: '#A3B3F7',
  ghost: '#6060B2',
  grass: '#74C236',
  ground: '#D3B357',
  ice: '#A3E7FD',
  normal: '#C8C4BC',
  poison: '#934594',
  psychic: '#ED4882',
  rock: '#B9A156',
  steel: '#B5B5C3',
  water: '#3295F6',
}
</script>

<template>
  <div :class="styled['pokemon-card']">
    <div :class="styled.status">
      <div :class="styled['pokemon-type-badge']">
        <span
          v-for="type in pokemon.types"
          :key="type.slot"
          :style="{ backgroundColor: TYPE_COLORS[type.type.name] }"
          >{{ type.type.name }}</span
        >
      </div>

      <h3>{{ pokemon.name }}</h3>

      <p v-html="description"></p>
    </div>

    <div :class="styled.pokemon">
      <p># {{ String(pokemon.id).padStart(3, '0') }}</p>
      <img :src="pokemon.sprites.front_default" />
    </div>
  </div>
</template>
