import {PokemonInfo} from '@/types/game/pokemon';


export const testPokemonData: {[name in string]: PokemonInfo} = {
  absol: {
    id: 359,
    type: 16,
    specialty: 2,
    sleepType: 4,
    stats: {
      frequency: 3100,
      maxCarry: 14,
      friendshipPoints: 16,
      recruit: {
        exp: 263,
        shards: 556,
      },
    },
    berry: {
      id: 16,
      quantity: 1,
    },
    skill: 1,
    ingredientChain: 359,
    evolution: {
      next: [],
      stage: 1,
      previous: null,
    },
  },
};
