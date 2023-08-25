import {v4} from 'uuid';

import {PokeInBox} from '@/types/game/pokebox';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {generateIngredientProductionAtLevels} from '@/utils/game/producing/ingredientChain';


type GenerateNewPokeInBoxOpts = {
  pokemon: PokemonInfo,
  ingredientChainMap: IngredientChainMap,
};

export const generateNewPokeInBox = ({pokemon, ingredientChainMap}: GenerateNewPokeInBoxOpts): PokeInBox => {
  const {id, stats, ingredientChain} = pokemon;
  const chain = ingredientChainMap[ingredientChain];

  return {
    uuid: v4(),
    pokemon: id,
    name: null,
    level: 1,
    ingredients: generateIngredientProductionAtLevels(chain),
    carryLimit: stats.maxCarry,
    subSkill: {},
    nature: null,
  };
};
