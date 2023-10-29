import {defaultCookingPreset} from '@/const/user/cooking';
import {UserCookingPreset} from '@/types/userData/cooking';
import {CookingPreloadedData} from '@/ui/cooking/common/type';
import {MealPreparerFilter} from '@/ui/cooking/prepare/type';


type ToCookingPresetOpts = {
  preloaded: CookingPreloadedData['cooking'],
  filter: MealPreparerFilter,
};

export const toCookingPreset = ({preloaded, filter}: ToCookingPresetOpts): UserCookingPreset => {
  return {
    ...defaultCookingPreset,
    ...preloaded,
    ingredientCount: filter.inventory,
    recipeLevel: filter.recipeLevel,
    mealsWanted: filter.mealsWanted,
  };
};

