import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterIncludingSome, isFilterMismatchOnSingle} from '@/components/input/filter/utils/check';
import {Meal, MealId} from '@/types/mongo/meal';
import {MealFilter} from '@/ui/meal/index/type';
import {getMealRequiredQuantity} from '@/utils/game/meal';


type UseFilteredMealsOpts = {
  data: Meal[],
};

export const useFilteredMeals = ({data}: UseFilteredMealsOpts) => {
  return useFilterInput<MealFilter, Meal, MealId>({
    data,
    dataToId: ({id}) => id,
    initialFilter: {
      mealType: {},
      ingredient: {},
      ingredientCountCap: null,
    },
    isDataIncluded: (filter, data) => {
      if (!isFilterIncludingSome({filter, filterKey: 'ingredient', ids: data.ingredients.map(({id}) => id)})) {
        return false;
      }

      if (filter.ingredientCountCap !== null && getMealRequiredQuantity(data) > filter.ingredientCountCap) {
        return false;
      }

      return !isFilterMismatchOnSingle({filter, filterKey: 'mealType', id: data.type});
    },
  });
};
