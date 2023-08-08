import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterIncludingSome, isFilterMismatchOnSingle} from '@/components/input/filter/utils/check';
import {Meal, MealId} from '@/types/mongo/meal';
import {MealFilter} from '@/ui/meal/index/type';
import {getMealRequiredQuantity} from '@/utils/game/meal';


type UseFilteredMealsOpts = {
  data: Meal[],
  initialPotCapacity: number | undefined,
  initialMealType: number | null | undefined,
};

export const useFilteredMeals = ({data, initialPotCapacity, initialMealType}: UseFilteredMealsOpts) => {
  return useFilterInput<MealFilter, Meal, MealId>({
    data,
    dataToId: ({id}) => id,
    initialFilter: {
      mealType: initialMealType ? {[initialMealType]: true} : {},
      ingredient: {},
      potCapacity: initialPotCapacity ?? null,
      displayType: 'ingredient',
    },
    isDataIncluded: (filter, data) => {
      if (!isFilterIncludingSome({filter, filterKey: 'ingredient', ids: data.ingredients.map(({id}) => id)})) {
        return false;
      }

      if (filter.potCapacity !== null && getMealRequiredQuantity(data) > filter.potCapacity) {
        return false;
      }

      return !isFilterMismatchOnSingle({filter, filterKey: 'mealType', id: data.type});
    },
  });
};
