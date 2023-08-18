import merge from 'lodash/merge';
import {Session} from 'next-auth';

import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterIncludingAllOfData} from '@/components/input/filter/utils/check';
import {Meal, MealId} from '@/types/mongo/meal';
import {CookingFilter} from '@/ui/cooking/type';
import {getMealRequiredQuantity} from '@/utils/game/meal';


type UseCookingFilterOpts = {
  meals: Meal[],
  session: Session | null,
};

export const useCookingFilter = ({meals, session}: UseCookingFilterOpts) => {
  return useFilterInput<CookingFilter, Meal, MealId>({
    data: meals,
    dataToId: ({id}) => id,
    initialFilter: {
      type: session?.user.preloaded?.mealType ?? 1,
      recipeLevel: merge({}, session?.user.preloaded?.recipeLevel),
      capacity: session?.user.preloaded.potCapacity ?? 15,
      ingredient: {},
      ingredientCount: merge({}, session?.user.preloaded?.ingredientCount),
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

      if (meal.ingredients.some((ingredient) => {
        const filterIngredientCount = filter.ingredientCount[ingredient.id];

        if (filterIngredientCount == null) {
          return false;
        }

        return ingredient.quantity > filterIngredientCount;
      })) {
        return false;
      }

      return getMealRequiredQuantity(meal) <= filter.capacity;
    },
  });
};
