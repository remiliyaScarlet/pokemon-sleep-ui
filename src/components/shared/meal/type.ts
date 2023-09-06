import {Meal} from '@/types/game/meal';


export type MealLinkProps = {
  meal: Meal,
  mealLevel: number,
  displayType?: MealLinkDisplayType,
};

export const mealLinkDisplayType = [
  'ingredient',
  'energyRange',
] as const;

export type MealLinkDisplayType = typeof mealLinkDisplayType[number];
