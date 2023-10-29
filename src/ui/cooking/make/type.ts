import {FilterInclusionMap, FilterWithUpdaterProps} from '@/components/input/filter/type';
import {IngredientId} from '@/types/game/ingredient';
import {MealStrengthInfo} from '@/types/game/meal/info';
import {Meal, MealTypeId} from '@/types/game/meal/main';
import {CookingCommonFilter, CookingPreloadedData} from '@/ui/cooking/common/type';
import {MealMakerPopupCommonProps} from '@/ui/cooking/make/recipe/popup/type';


export type MealMakerRecipeData = {
  meal: Meal,
  info: MealStrengthInfo,
};

export type MealMakerFilter = CookingCommonFilter & {
  type: MealTypeId,
  capacity: number,
  ingredient: FilterInclusionMap<IngredientId>,
  showUnmakeableRecipe: boolean,
};

export type MealMakerCommonProps = FilterWithUpdaterProps<MealMakerFilter> & MealMakerPopupCommonProps & {
  meals: Meal[],
  mealTypes: MealTypeId[],
  preloaded: CookingPreloadedData['cooking'],
};
