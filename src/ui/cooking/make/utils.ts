import {defaultCookingPreset} from '@/const/user/cooking';
import {UserCookingPreset} from '@/types/userData/cooking';
import {CookingPreloadedData} from '@/ui/cooking/common/type';
import {MealMakerFilter} from '@/ui/cooking/make/type';


type ToCookingPresetOpts = {
  preloaded: CookingPreloadedData['cooking'],
  filter: MealMakerFilter,
};

export const toCookingPreset = ({preloaded, filter}: ToCookingPresetOpts): UserCookingPreset => {
  return {
    ...defaultCookingPreset,
    ...preloaded,
    potCapacity: filter.capacity,
    mealType: filter.type,
    ingredients: filter.ingredient,
    ingredientCount: filter.inventory,
    recipeLevel: filter.recipeLevel,
    showUnmakeableRecipe: filter.showUnmakeableRecipe,
  };
};

