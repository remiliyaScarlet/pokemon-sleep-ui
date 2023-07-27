import {useFilterInput} from '@/components/input/filter/hooks';
import {isFilterConditionActive} from '@/components/input/filter/utils';
import {Meal, MealId} from '@/types/mongo/meal';
import {MealFilter} from '@/ui/meal/index/type';
import {toSum} from '@/utils/array';


type UseFilteredMealsOpts = {
  data: Meal[],
};

export const useFilteredMeals = ({data}: UseFilteredMealsOpts) => {
  return useFilterInput<MealFilter, Meal, MealId>({
    data,
    dataToId: ({id}) => id,
    initialFilter: {
      type: {},
      ingredient: {},
      ingredientCountCap: null,
    },
    isDataIncluded: (filter, data) => {
      if (
        isFilterConditionActive({filter, filterKey: 'ingredient'}) &&
        !data.ingredients.some(({id}) => filter.ingredient[id])
      ) {
        return false;
      }

      if (
        filter.ingredientCountCap !== null &&
        toSum(data.ingredients.map(({quantity}) => quantity)) > filter.ingredientCountCap
      ) {
        return false;
      }

      return (
        !(isFilterConditionActive({filter, filterKey: 'type'}) && !filter.type[data.type])
      );
    },
  });
};
