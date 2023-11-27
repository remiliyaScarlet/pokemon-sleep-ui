import {specialtyIdMap} from '@/const/game/pokemon';
import {defaultCookingPreset} from '@/const/user/cooking';
import {Meal, MealMap, MealTypeId} from '@/types/game/meal/main';
import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {UserCookingPreset} from '@/types/userData/cooking';
import {UserCalculationFullPackBehavior} from '@/types/userData/settings';
import {isNotNullish} from '@/utils/type';


type IsFullPackOpts = {
  alwaysFullBack: UserCalculationFullPackBehavior,
  specialty: PokemonSpecialtyId | null,
};

export const isFullPack = ({alwaysFullBack, specialty}: IsFullPackOpts): boolean => {
  if (alwaysFullBack === 'berryOnly') {
    return specialty === specialtyIdMap.berry;
  }

  if (alwaysFullBack === 'always') {
    return true;
  }

  if (alwaysFullBack === 'disable') {
    return false;
  }

  throw new Error(`Unhandled full pack behavior [${alwaysFullBack}]`);
};

export type ToTargetMealsOpts = {
  mealType: MealTypeId,
  cooking: UserCookingPreset,
  mealMap: MealMap,
};

export const toTargetMeals = ({mealType, cooking, mealMap}: ToTargetMealsOpts): Meal[] => Object
  .values(cooking.target[mealType] ?? defaultCookingPreset.target[mealType] ?? {})
  .filter(isNotNullish)
  .map((mealId) => mealMap[mealId])
  .filter(isNotNullish);
