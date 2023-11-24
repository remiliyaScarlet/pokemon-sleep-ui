import {MealMap} from '@/types/game/meal/main';
import {UserCookingPreset} from '@/types/userData/cooking';


export type UserSettingsCookingCommonProps = {
  cookingPreset: UserCookingPreset,
  setCookingPreset: (updated: Partial<UserCookingPreset>) => void,
  mealMap: MealMap,
};
