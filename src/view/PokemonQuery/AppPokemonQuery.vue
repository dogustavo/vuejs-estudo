<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useQuery } from '@tanstack/vue-query'

import Container from '@/components/Container/AppContainer.vue'
import PokemonCard from '@/components/PokemonCard/PokemonCard.vue'

import { getPokemons } from '@/services'

import PaginationComponent from '@/components/Paginate/PaginationComponent.vue'

const route = useRoute()
const searchTerm = ref(route.query)
const queryKey = computed(() => ['getPokemons', searchTerm.value])

const { data: pokemons } = useQuery({
  queryKey,
  queryFn: async () =>
    getPokemons({
      filter: {
        limit: searchTerm.value.limit || 21,
        offset: searchTerm.value.offset || 0,
      },
    }),
})

const pageInfo = computed(() => ({
  count: pokemons.value?.count ?? 1,
  offset: +(searchTerm.value.offset ?? 0),
  limit: +(searchTerm.value.limit ?? 21),
  next: pokemons.value?.next || null,
  previous: pokemons.value?.previous || null,
}))

watch(
  () => route.query,
  async (newQuery) => {
    searchTerm.value = newQuery
  },
  { immediate: true },
)
</script>

<template>
  <section class="pokemons-section">
    <Container>
      <div class="list">
        <router-link v-for="pokemon in pokemons?.data" :key="pokemon.id" :to="`/${pokemon.name}`">
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

<style scoped lang="scss">
.pokemons-section {
  padding: rem(100) 0;
  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    gap: 2rem;
  }
}
</style>
