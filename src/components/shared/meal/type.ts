import {IngredientMap} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal/main';


export type MealLinkProps = {
  level: number,
  meal: Meal,
  showEnergy: boolean,
  ingredientMap: IngredientMap,
  mapMultiplier: number,
};
