import {IngredientMap} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal';


export type MealLinkProps = {
  level: number,
  meal: Meal,
  showEnergy: boolean,
  ingredientMap: IngredientMap,
  mapBonus: number,
};
