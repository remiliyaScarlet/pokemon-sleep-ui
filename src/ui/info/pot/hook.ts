import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterMismatchOnSingle} from '@/components/input/filter/utils/check';
import {Meal, MealId} from '@/types/mongo/meal';
import {PotInfoCommonProps, PotInfoFilter} from '@/ui/info/pot/type';


export const usePotInfoFilter = ({meals}: PotInfoCommonProps) => {
  return useFilterInput<PotInfoFilter, Meal, MealId>({
    data: meals,
    dataToId: ({id}) => id,
    initialFilter: {
      mealType: {},
      ingredients: {},
      displayType: 'ingredient',
      capacity: 15,
      showEmpty: false,
    },
    isDataIncluded: (filter, meal) => {
      return !isFilterMismatchOnSingle({filter, filterKey: 'mealType', id: meal.type});
    },
  });
};
