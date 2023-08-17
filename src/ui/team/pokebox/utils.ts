import {v4} from 'uuid';

import {PokeInBox} from '@/types/game/pokebox';
import {PokemonIngredientPick} from '@/types/game/producing/ingredient';
import {IngredientId} from '@/types/mongo/ingredient';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {isNotNullish} from '@/utils/type';


const generatePokeInBoxIngredientSingle = (
  level: number,
  ingredientId: IngredientId | undefined,
): PokemonIngredientPick | null => {
  return ingredientId ? {level, id: ingredientId, quantity: 1} : null;
};

export const generateNewPokeInBox = ({id, stats, ingredients}: PokemonInfo): PokeInBox => {
  return {
    uuid: v4(),
    pokemon: id,
    name: null,
    level: 1,
    randomIngredient: [
      generatePokeInBoxIngredientSingle(30, ingredients.fixed),
      generatePokeInBoxIngredientSingle(60, ingredients.fixed),
    ].filter(isNotNullish),
    carryLimit: stats.maxCarry,
    subSkill: {},
    nature: null,
  };
};
