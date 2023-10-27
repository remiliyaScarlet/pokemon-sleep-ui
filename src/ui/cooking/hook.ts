import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterIncludingAllOfData} from '@/components/input/filter/utils/check';
import {defaultCookingPreset} from '@/const/user/cooking';
import {Meal, MealId} from '@/types/game/meal/main';
import {CookingFilter, CookingServerDataProps} from '@/ui/cooking/type';
import {getMealIngredientCount} from '@/utils/game/meal/count';
import {cloneMerge} from '@/utils/object/cloneMerge';


export const useCookingFilter = ({meals, preloaded}: CookingServerDataProps) => {
  const preloadedCooking = preloaded.cooking;

  return useFilterInput<CookingFilter, Meal, MealId>({
    data: meals,
    dataToId: ({id}) => id,
    initialFilter: {
      type: preloadedCooking?.mealType ?? defaultCookingPreset.mealType,
      capacity: preloadedCooking?.potCapacity ?? defaultCookingPreset.potCapacity,
      ingredient: {},
      recipeLevel: cloneMerge(defaultCookingPreset.recipeLevel, preloadedCooking?.recipeLevel),
      ingredientCount: cloneMerge(defaultCookingPreset.ingredientCount, preloadedCooking?.ingredientCount),
      showUnmakeableRecipe: preloadedCooking?.showUnmakeableRecipe ?? defaultCookingPreset.showUnmakeableRecipe,
    },
    isDataIncluded: (filter, meal) => {
      if (filter.type !== meal.type) {
        return false;
      }

      if (!isFilterIncludingAllOfData({
        filter,
        filterKey: 'ingredient',
        ids: meal.ingredients.map(({id}) => id),
      })) {
        return false;
      }

      return getMealIngredientCount(meal) <= filter.capacity;
    },
  });
};
