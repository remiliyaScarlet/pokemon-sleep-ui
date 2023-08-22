import {v4} from 'uuid';

import {specialtyIdMap} from '@/const/game/pokemon';
import {IngredientId} from '@/types/game/ingredient';
import {PokeInBox} from '@/types/game/pokebox';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonIngredientPick} from '@/types/game/producing/ingredient';
import {isNotNullish} from '@/utils/type';


const generatePokeInBoxIngredientSingle = (
  level: number,
  ingredientId: IngredientId | undefined,
  quantity: number,
): PokemonIngredientPick | null => {
  return ingredientId ? {level, id: ingredientId, quantity} : null;
};

export const generateNewPokeInBox = ({id, stats, ingredients, specialty}: PokemonInfo): PokeInBox => {
  return {
    uuid: v4(),
    pokemon: id,
    name: null,
    level: 1,
    randomIngredient: [
      generatePokeInBoxIngredientSingle(30, ingredients.fixed, specialty === specialtyIdMap.ingredient ? 4 : 2),
      generatePokeInBoxIngredientSingle(60, ingredients.fixed, specialty === specialtyIdMap.ingredient ? 7 : 3),
    ].filter(isNotNullish),
    carryLimit: stats.maxCarry,
    subSkill: {},
    nature: null,
  };
};
