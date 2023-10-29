import {defaultCookingPreset} from '@/const/user/cooking';
import {UserCookingPreset} from '@/types/userData/cooking';
import {MealMakerFilter, MealMakerPreloadedData} from '@/ui/cooking/make/type';


type ToCookingPresetOpts = {
  preloaded: MealMakerPreloadedData['cooking'],
  filter: MealMakerFilter,
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

