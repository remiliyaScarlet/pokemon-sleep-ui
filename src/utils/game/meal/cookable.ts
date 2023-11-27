import {Meal} from '@/types/game/meal/main';


type GetCookableMealsOpts = {
  meals: Meal[],
  ingredientId: number,
};

export const getCookableMeals = ({meals, ingredientId}: GetCookableMealsOpts): Meal[] => {
  return meals.filter(({ingredients}) => ingredients.some(({id}) => id === ingredientId));
};
