import {IngredientCounter, IngredientMap} from '@/types/game/ingredient';
import {UserDataActionStatus} from '@/types/userData/main';
import {CalculatedUserSettings} from '@/types/userData/settings';


export type CookingPopupCommonProps = {
  ingredientMap: IngredientMap,
  calculatedSettings: CalculatedUserSettings,
  status: UserDataActionStatus,
  onCook: (ingredientsUsed: IngredientCounter) => Promise<void>,
};
