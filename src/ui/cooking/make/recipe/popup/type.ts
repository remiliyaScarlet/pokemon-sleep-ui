import {IngredientCounter, IngredientMap} from '@/types/game/ingredient';
import {UserDataActionStatus} from '@/types/userData/main';
import {CalculatedUserSettings} from '@/types/userData/settings';


export type MealMakerPopupCommonProps = {
  ingredientMap: IngredientMap,
  calculatedSettings: CalculatedUserSettings,
  status: UserDataActionStatus,
  onCook: (ingredientsUsed: IngredientCounter) => Promise<void>,
};
