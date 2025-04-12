import { describe } from 'node:test'
import { test, expect, vi } from 'vitest'

import ListPokemon from './ListPokemon.vue'
import { shallowMount } from '@vue/test-utils'

vi.mock('vue-router', () => ({
  useRoute: () => ({
    query: {
      limit: 21,
      offset: 0,
    },
  }),
  useRouter: () => ({
    push: vi.fn(),
    // Mock de outras funcionalidades do `useRouter`, se necessário
  }),
}))

vi.mock('@/services', () => ({
  getPokemons: vi.fn().mockResolvedValue({
    data: [
      {
        id: 1,
        name: 'bulbasaur',
        sprites: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        },
        stats: [],
        types: [],
      },
    ],
    count: 2,
    next: null,
    previous: null,
  }),
}))

const renderComponent = () => shallowMount(ListPokemon)

describe('ListPokemon.vue', async () => {
  test('Renderiza o componente de forma correta', () => {
    const wrapper = renderComponent()

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
