import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {MealCounter, MealTypeId} from '@/types/game/meal/main';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {CookingCommonFilter, CookingPreloadedData, CookingServerDataProps} from '@/ui/cooking/common/type';


export type MealPreparerFilter = CookingCommonFilter & {
  mealsWanted: MealCounter,
};

export type MealPreparerCommonProps =
  FilterWithUpdaterProps<MealPreparerFilter> &
  Omit<CookingServerDataProps, 'preloaded'> & {
    mealTypes: MealTypeId[],
    calculatedSettings: CalculatedUserSettings,
    preloaded: CookingPreloadedData['cooking'],
  };
