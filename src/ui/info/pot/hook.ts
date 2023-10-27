import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterMismatchOnSingle} from '@/components/input/filter/utils/check';
import {Meal, MealId} from '@/types/game/meal/main';
import {PotInfoDataProps, PotInfoFilter} from '@/ui/info/pot/type';


export const usePotInfoFilter = ({meals, preloaded}: PotInfoDataProps) => {
  const {cooking} = preloaded;

  return useFilterInput<PotInfoFilter, Meal, MealId>({
    data: meals,
    dataToId: ({id}) => id,
    initialFilter: {
      mealType: {},
      mealLevel: 1,
      ingredients: {},
      capacity: cooking?.potCapacity ?? null,
      showEmpty: false,
      showEnergy: cooking?.showEnergy ?? true,
    },
    isDataIncluded: (filter, meal) => {
      return !isFilterMismatchOnSingle({filter, filterKey: 'mealType', id: meal.type});
    },
  });
};
