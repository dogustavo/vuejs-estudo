<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import Container from '@/components/Container/AppContainer.vue'
import PokemonCard from '@/components/PokemonCard/PokemonCard.vue'

import { getPokemons } from '@/services'
import type { Pokemon } from '@/types/pokemon'

import styles from './styles.module.scss'
import PaginationComponent from '@/components/Paginate/PaginationComponent.vue'

const route = useRoute()

const isLoading = ref(true)
const error = ref('')
const pokemonsData = ref<Pokemon[]>()
const pageInfo = ref<{
  count: number
  limit: number
  offset: number
  next: null | string
  previous: null | string
}>({
  count: 0,
  limit: 21,
  offset: 0,
  next: null,
  previous: null,
})

const searchTerm = ref(route.query)

const loadPokemon = async () => {
  try {
    const pokemons = await getPokemons({
      filter: {
        limit: searchTerm.value.limit || 21,
        offset: searchTerm.value.offset || 0,
      },
    })

    pokemonsData.value = pokemons.data
    pageInfo.value = {
      count: pokemons.count ?? 1,
      offset: +(searchTerm.value.offset ?? 0),
      limit: +(searchTerm.value.limit ?? 21),
      next: pokemons.next || null,
      previous: pokemons.previous || null,
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(loadPokemon)

watch(
  () => route.query,
  async (newQuery) => {
    searchTerm.value = newQuery

    isLoading.value = true
    await loadPokemon()
  },
  { immediate: true },
)
</script>

<template>
  <section :class="styles['pokemons-section']">
    <Container>
      <div :class="styles.list">
        <router-link
          v-for="pokemon in pokemonsData"
          v-bind:key="pokemon.id"
          :to="`/${pokemon.name}`"
        >
          <PokemonCard :pokemon="pokemon" />
        </router-link>
      </div>

      <PaginationComponent
        :limit="pageInfo.limit"
        :offset="pageInfo.offset"
        :count="pageInfo.count"
        :next="pageInfo.next"
        :previous="pageInfo.previous"
      />
    </Container>
  </section>
</template>

<style scoped></style>
