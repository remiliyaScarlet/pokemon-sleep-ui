import {Session} from 'next-auth';

import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterIncludingAllOfData} from '@/components/input/filter/utils/check';
import {defaultCookingPreset} from '@/const/user/cooking';
import {Meal, MealId} from '@/types/game/meal';
import {CookingFilter} from '@/ui/cooking/type';
import {getMealRequiredQuantity} from '@/utils/game/meal';
import {cloneMerge} from '@/utils/object';


type UseCookingFilterOpts = {
  meals: Meal[],
  session: Session | null,
};

export const useCookingFilter = ({meals, session}: UseCookingFilterOpts) => {
  const preloaded = session?.user.preloaded.cooking;

  return useFilterInput<CookingFilter, Meal, MealId>({
    data: meals,
    dataToId: ({id}) => id,
    initialFilter: {
      type: preloaded?.mealType ?? defaultCookingPreset.mealType,
      capacity: preloaded?.potCapacity ?? defaultCookingPreset.potCapacity,
      ingredient: {},
      recipeLevel: cloneMerge(defaultCookingPreset.recipeLevel, preloaded?.recipeLevel),
      ingredientCount: cloneMerge(defaultCookingPreset.ingredientCount, preloaded?.ingredientCount),
      showUnmakeableRecipe: preloaded?.showUnmakeableRecipe ?? defaultCookingPreset.showUnmakeableRecipe,
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

      return getMealRequiredQuantity(meal) <= filter.capacity;
    },
  });
};
