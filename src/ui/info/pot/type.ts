import {FilterInclusionMap} from '@/components/input/filter/type';
import potCapacity from '@/data/potCapacity.json';
import {IngredientId, IngredientMap} from '@/types/mongo/ingredient';
import {Meal, MealTypeId} from '@/types/mongo/meal';


export type PotInfoCommonProps = {
  meals: Meal[],
  ingredients: IngredientMap,
};

export type PotInfoFilter = {
  mealType: FilterInclusionMap<MealTypeId>,
  ingredients: FilterInclusionMap<IngredientId>,
  capacity: number | null,
  showEmpty: boolean,
};

export type PotInfoUnlockMealProps = {
  meal: Meal,
};

export type PotLevelInfo = typeof potCapacity[number];
