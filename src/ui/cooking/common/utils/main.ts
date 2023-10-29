import {Session} from 'next-auth';

import {defaultCookingPreset} from '@/const/user/cooking';
import {CookingCommonFilter, CookingPreloadedData} from '@/ui/cooking/common/type';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {createUserSettings} from '@/utils/user/settings';


export const toCookingPreloadedData = (session: Session | null): CookingPreloadedData => {
  return {
    cooking: session?.user.preloaded.cooking,
    settings: createUserSettings(session?.user.preloaded.settings),
  };
};

export const generateCookingCommonFilter = (
  preloadedCooking: CookingPreloadedData['cooking'],
): CookingCommonFilter => ({
  recipeLevel: cloneMerge(defaultCookingPreset.recipeLevel, preloadedCooking?.recipeLevel),
  inventory: cloneMerge(defaultCookingPreset.ingredientCount, preloadedCooking?.ingredientCount),
});
