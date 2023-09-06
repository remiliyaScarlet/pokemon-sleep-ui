import {FilterInclusionMap} from '@/components/input/filter/type';
import {MealLinkDisplayType} from '@/components/shared/meal/type';
import {IngredientId} from '@/types/game/ingredient';
import {MealTypeId} from '@/types/game/meal';


export type MealFilter = {
  mealType: FilterInclusionMap<MealTypeId>,
  mealLevel: number,
  ingredient: FilterInclusionMap<IngredientId>,
  potCapacity: number | null,
  displayType: MealLinkDisplayType,
};
