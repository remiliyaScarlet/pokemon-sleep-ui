import {FilterInclusionMap, FilterWithUpdaterProps} from '@/components/input/filter/type';
import {RecipeLevel} from '@/types/game/cooking';
import {IngredientCounter, IngredientId, IngredientMap} from '@/types/game/ingredient';
import {MealStrengthInfo} from '@/types/game/meal/info';
import {Meal, MealTypeId} from '@/types/game/meal/main';
import {UserPreloadedData} from '@/types/userData/main';
import {UserSettings} from '@/types/userData/settings';
import {MealMakerPopupCommonProps} from '@/ui/cooking/make/recipe/popup/type';


export type MealMakerRecipeData = {
  meal: Meal,
  info: MealStrengthInfo,
};

export type MealMakerFilter = {
  type: MealTypeId,
  recipeLevel: RecipeLevel,
  capacity: number,
  ingredient: FilterInclusionMap<IngredientId>,
  ingredientCount: IngredientCounter,
  showUnmakeableRecipe: boolean,
};

export type MealMakerPreloadedData = {
  cooking: UserPreloadedData['cooking'],
  settings: UserSettings,
};

export type MealMakerServerDataProps = {
  meals: Meal[],
  ingredientMap: IngredientMap,
  preloaded: MealMakerPreloadedData,
};

export type MealMakerCommonProps = FilterWithUpdaterProps<MealMakerFilter> & MealMakerPopupCommonProps & {
  meals: Meal[],
  mealTypes: MealTypeId[],
  preloaded: MealMakerPreloadedData['cooking'],
};
