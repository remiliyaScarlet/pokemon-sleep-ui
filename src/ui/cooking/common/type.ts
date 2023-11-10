import {RecipeLevel} from '@/types/game/cooking';
import {IngredientCounter, IngredientMap} from '@/types/game/ingredient';
import {Meal, MealsMarked} from '@/types/game/meal/main';
import {UserPreloadedData} from '@/types/userData/main';
import {UserSettings} from '@/types/userData/settings';


export type CookingPreloadedData = {
  cooking: UserPreloadedData['cooking'],
  settings: UserSettings,
};

export type CookingServerDataProps = {
  meals: Meal[],
  ingredientMap: IngredientMap,
  preloaded: CookingPreloadedData,
};

export type CookingCommonFilter = {
  recipeLevel: RecipeLevel,
  inventory: IngredientCounter,
  mealsMarked: MealsMarked,
};
