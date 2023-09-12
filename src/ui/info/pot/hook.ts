import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterMismatchOnSingle} from '@/components/input/filter/utils/check';
import {Meal, MealId} from '@/types/game/meal';
import {PotInfoCommonProps, PotInfoFilter} from '@/ui/info/pot/type';


export const usePotInfoFilter = ({meals, preloaded}: PotInfoCommonProps) => {
  return useFilterInput<PotInfoFilter, Meal, MealId>({
    data: meals,
    dataToId: ({id}) => id,
    initialFilter: {
      mealType: {},
      mealLevel: 1,
      ingredients: {},
      capacity: preloaded?.potCapacity ?? null,
      showEmpty: false,
      showEnergy: preloaded?.showEnergy ?? true,
    },
    isDataIncluded: (filter, meal) => {
      return !isFilterMismatchOnSingle({filter, filterKey: 'mealType', id: meal.type});
    },
  });
};
