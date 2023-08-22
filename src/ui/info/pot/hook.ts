import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterMismatchOnSingle} from '@/components/input/filter/utils/check';
import {Meal, MealId} from '@/types/game/meal';
import {PotInfoCommonProps, PotInfoFilter} from '@/ui/info/pot/type';


export const usePotInfoFilter = ({meals, session}: PotInfoCommonProps) => {
  return useFilterInput<PotInfoFilter, Meal, MealId>({
    data: meals,
    dataToId: ({id}) => id,
    initialFilter: {
      mealType: session?.user.preloaded.mealType ? {[session?.user.preloaded.mealType]: true} : {},
      ingredients: {},
      displayType: 'ingredient',
      capacity: session?.user.preloaded.potCapacity ?? null,
      showEmpty: false,
    },
    isDataIncluded: (filter, meal) => {
      return !isFilterMismatchOnSingle({filter, filterKey: 'mealType', id: meal.type});
    },
  });
};
