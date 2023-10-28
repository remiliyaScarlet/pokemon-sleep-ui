import {defaultCookingPreset} from '@/const/user/cooking';
import {UserCookingPreset} from '@/types/userData/cooking';
import {CookingFilter, CookingPreloadedData} from '@/ui/cooking/type';


type ToCookingPresetOpts = {
  preloaded: CookingPreloadedData['cooking'],
  filter: CookingFilter,
};

export const toCookingPreset = ({preloaded, filter}: ToCookingPresetOpts): UserCookingPreset => {
  return {
    ...defaultCookingPreset,
    ...preloaded,
    potCapacity: filter.capacity,
    mealType: filter.type,
    ingredients: filter.ingredient,
    ingredientCount: filter.ingredientCount,
    recipeLevel: filter.recipeLevel,
    showUnmakeableRecipe: filter.showUnmakeableRecipe,
  };
};
