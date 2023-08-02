import {Meal} from '@/types/mongo/meal';


export type MealLinkProps = {
  meal: Meal,
  small?: boolean,
  displayType?: MealLinkDisplayType,
};

export const mealLinkDisplayType = [
  'ingredient',
  'energyRange',
] as const;

export type MealLinkDisplayType = typeof mealLinkDisplayType[number];
