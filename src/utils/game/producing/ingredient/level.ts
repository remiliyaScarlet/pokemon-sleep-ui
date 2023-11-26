import {IngredientLevel, ingredientLevels} from '@/types/game/pokemon/ingredient';


export const getEffectiveIngredientLevels = (level: number): IngredientLevel[] => (
  ingredientLevels.filter((ingredientLevel) => level >= ingredientLevel)
);
