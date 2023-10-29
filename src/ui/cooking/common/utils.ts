import {getServerSession, Session} from 'next-auth';

import {authOptions} from '@/const/auth';
import {defaultCookingPreset} from '@/const/user/cooking';
import {getAllIngredients} from '@/controller/ingredient';
import {getAllMeals} from '@/controller/meal';
import {CookingCommonFilter, CookingPreloadedData, CookingServerDataProps} from '@/ui/cooking/common/type';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {createUserSettings} from '@/utils/user/settings';


export const toCookingPreloadedData = (session: Session | null): CookingPreloadedData => {
  return {
    cooking: session?.user.preloaded.cooking,
    settings: createUserSettings(session?.user.preloaded.settings),
  };
};

export const getCookingServerDataProps = async (): Promise<CookingServerDataProps> => {
  const [
    session,
    meals,
    ingredientMap,
  ] = await Promise.all([
    getServerSession(authOptions),
    getAllMeals(),
    getAllIngredients(),
  ]);

  return {
    meals,
    ingredientMap,
    preloaded: toCookingPreloadedData(session),
  };
};

export const generateCookingCommonFilter = (
  preloadedCooking: CookingPreloadedData['cooking'],
): CookingCommonFilter => ({
  recipeLevel: cloneMerge(defaultCookingPreset.recipeLevel, preloadedCooking?.recipeLevel),
  inventory: cloneMerge(defaultCookingPreset.ingredientCount, preloadedCooking?.ingredientCount),
});
