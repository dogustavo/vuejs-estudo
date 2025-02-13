interface Ability {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
}

interface Move {
  move: {
    name: string
    url: string
  }
  version_group_details: {
    level_learned_at: number
    move_learn_method: {
      name: string
      url: string
    }
    version_group: {
      name: string
      url: string
    }
  }[]
}

export type PokemonType =
  | 'bug'
  | 'dark'
  | 'dragon'
  | 'electric'
  | 'fairy'
  | 'fighting'
  | 'fire'
  | 'flying'
  | 'ghost'
  | 'grass'
  | 'ground'
  | 'ice'
  | 'normal'
  | 'poison'
  | 'psychic'
  | 'rock'
  | 'steel'
  | 'water'

interface Type {
  slot: number
  type: {
    name: PokemonType
    url: string
  }
}

export interface Pokemon {
  id: number
  name: string
  abilities: Ability[]
  base_experience: number
  forms: { name: string; url: string }[]
  height: number
  is_default: boolean
  moves: Move[]
  order: number
  species: { name: string; url: string }
  sprites: {
    front_default: string
  }
  types: Type[]
  weight: number
}
