import {Session} from 'next-auth';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {MealLinkDisplayType} from '@/components/shared/meal/type';
import potCapacity from '@/data/potCapacity.json';
import {IngredientId, IngredientMap} from '@/types/game/ingredient';
import {Meal, MealTypeId} from '@/types/game/meal';


export type PotInfoCommonProps = {
  meals: Meal[],
  ingredients: IngredientMap,
  session: Session | null,
};

export type PotInfoFilter = {
  mealType: FilterInclusionMap<MealTypeId>,
  mealLevel: number,
  ingredients: FilterInclusionMap<IngredientId>,
  displayType: MealLinkDisplayType,
  capacity: number | null,
  showEmpty: boolean,
};

export type PotInfoUnlockMealProps = {
  meal: Meal,
};

export type PotLevelInfo = typeof potCapacity[number];
