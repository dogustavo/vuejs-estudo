import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '@/view/Home/ListPokemon.vue'
import DetailPage from '@/view/Pokemon/DetailPage.vue'
import AppPokemonQuery from '@/view/PokemonQuery/AppPokemonQuery.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView, // Página inicial (Home)
  },
  {
    path: '/:name',
    name: 'Pokemon',
    component: DetailPage, // Página do Pokémon específico
    props: true,
  },
  {
    path: '/pokemons',
    name: 'Pokemons',
    component: AppPokemonQuery, // Página do Pokémons com tanstack query
    props: true,
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
