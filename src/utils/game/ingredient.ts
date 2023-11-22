import {IngredientLevel, ingredientLevels} from '@/types/game/pokemon/ingredient';


export const getIngredientLevel = (pokemonLevel: number): IngredientLevel => {
  const sortedIngredientLevels = [...ingredientLevels].sort((a, b) => b - a);

  for (const ingredientLevel of sortedIngredientLevels) {
    if (pokemonLevel >= ingredientLevel) {
      return ingredientLevel;
    }
  }

  return sortedIngredientLevels.at(-1)!;
};
