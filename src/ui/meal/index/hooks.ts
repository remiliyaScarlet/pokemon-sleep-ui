import {useFilterInput} from '@/components/input/filter/hooks';
import {isFilterConditionActive, isFilterMatchingGivenArray} from '@/components/input/filter/utils';
import {Meal, MealId} from '@/types/mongo/meal';
import {MealFilter} from '@/ui/meal/index/type';


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
    },
    isDataIncluded: (filter, data) => {
      if (
        isFilterConditionActive({filter, filterKey: 'ingredient'}) &&
        !isFilterMatchingGivenArray({
          filter,
          filterKey: 'ingredient',
          ids: data.ingredients.map(({id}) => id),
          keyToId: (key) => Number(key),
          onIdsEmpty: true,
        })
      ) {
        return false;
      }

      return (
        !(isFilterConditionActive({filter, filterKey: 'type'}) && !filter.type[data.type])
      );
    },
  });
};
