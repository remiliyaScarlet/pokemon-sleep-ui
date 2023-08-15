import {PokeInBox, PokeInBoxIngredientSingle} from '@/types/game/pokebox';
import {IngredientId} from '@/types/mongo/ingredient';
import {PokemonInfo} from '@/types/mongo/pokemon';


const generatePokeInBoxIngredientSingle = (
  ingredientId: IngredientId | undefined,
): PokeInBoxIngredientSingle | null => {
  return ingredientId ? {id: ingredientId, quantity: 1} : null;
};

export const generateNewPokeInBox = ({id, stats, ingredients}: PokemonInfo): PokeInBox => {
  return {
    pokemon: id,
    name: null,
    level: 1,
    randomIngredient: {
      30: generatePokeInBoxIngredientSingle(ingredients.fixed),
      60: generatePokeInBoxIngredientSingle(ingredients.fixed),
    },
    carryLimit: stats.maxCarry,
    subSkill: {},
    nature: null,
  };
};
