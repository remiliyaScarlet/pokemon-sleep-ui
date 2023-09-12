import {FilterInclusionMap} from '@/components/input/filter/type';
import potCapacity from '@/data/potCapacity.json';
import {IngredientId, IngredientMap} from '@/types/game/ingredient';
import {Meal, MealTypeId} from '@/types/game/meal';
import {UserPreloadedData} from '@/types/userData/main';


export type PotInfoCommonProps = {
  meals: Meal[],
  ingredients: IngredientMap,
  preloaded: UserPreloadedData['cooking'],
};

export type PotInfoFilter = {
  mealType: FilterInclusionMap<MealTypeId>,
  mealLevel: number,
  ingredients: FilterInclusionMap<IngredientId>,
  capacity: number | null,
  showEmpty: boolean,
  showEnergy: boolean,
};

export type PotLevelInfo = typeof potCapacity[number];
