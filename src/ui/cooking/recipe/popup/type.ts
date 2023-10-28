import {IngredientMap} from '@/types/game/ingredient';
import {UserDataActionStatus} from '@/types/userData/main';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {CookingIngredientCount} from '@/ui/cooking/type';


export type CookingPopupCommonProps = {
  ingredientMap: IngredientMap,
  calculatedSettings: CalculatedUserSettings,
  status: UserDataActionStatus,
  onCook: (ingredientsUsed: CookingIngredientCount) => Promise<void>,
};
