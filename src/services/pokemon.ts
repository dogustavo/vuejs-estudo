import axios from 'axios'
import api from '.'

interface IPokemons {
  filter?: unknown
}

interface IRepsonse {
  count: number
  previous: null | string
  next: null | string
  results: { name: string; url: string }[]
}

export async function getPokemons({ filter }: IPokemons) {
  try {
    const pokemons = await api.get<IRepsonse>(`/pokemon`, {
      params: filter,
    })

    const data = await Promise.all(
      pokemons.data.results.map(async (pokemon) => {
        return await getPokemon(pokemon.name)
      }),
    )

    return {
      data: data,
      count: pokemons.data.count,
      next: pokemons.data.next,
      previous: pokemons.data.previous,
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    }

    throw new Error('An unexpected error occurred')
  }
}

export async function getPokemon(name: string) {
  try {
    const pokemon = await api.get(`/pokemon/${name}`)

    return pokemon.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    }

    throw new Error('An unexpected error occurred')
  }
}

export async function getPokemonSpecie(name: string) {
  try {
    const pokemon = await api.get(`/pokemon-species/${name}`)

    return pokemon.data.flavor_text_entries[1]
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    }

    throw new Error('An unexpected error occurred')
  }
}
