import {v4} from 'uuid';

import {defaultSeedUsage} from '@/const/game/seed';
import {PokeInBox} from '@/types/game/pokebox';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon';
import {generateIngredientProductionAtLevels} from '@/utils/game/producing/ingredientChain';


type GenerateNewPokeInBoxOpts = {
  pokemon: PokemonInfo,
  ingredientChainMap: IngredientChainMap,
};

export const generateNewPokeInBox = ({pokemon, ingredientChainMap}: GenerateNewPokeInBoxOpts): PokeInBox => {
  const {id, ingredientChain} = pokemon;
  const chain = ingredientChainMap[ingredientChain];

  return {
    uuid: v4(),
    dateAdded: Date.now(),
    pokemon: id,
    name: null,
    level: 1,
    ingredients: generateIngredientProductionAtLevels(chain),
    evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
    subSkill: {},
    nature: null,
    seeds: defaultSeedUsage,
  };
};
