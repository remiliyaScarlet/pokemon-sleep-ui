import {RecipeLevel} from '@/types/game/cooking';
import {MealId} from '@/types/game/meal/main';


export type MealSelectorLevelUpdatingProps = {
  recipeLevel: RecipeLevel,
  onLevelUpdated: (id: MealId, level: number) => void,
} | {
  recipeLevel?: never,
  onLevelUpdated?: never,
};
