import {IngredientId} from '@/types/game/ingredient';
import {MealMap} from '@/types/game/meal/main';
import {UserCookingPreset} from '@/types/userData/cooking';


export type UserSettingsCookingDataProps = {
  mealMap: MealMap,
  ingredientIds: IngredientId[],
};

export type UserSettingsCookingCommonProps = UserSettingsCookingDataProps & {
  cookingPreset: UserCookingPreset,
  setCookingPreset: (updated: Partial<UserCookingPreset>) => void,
};
