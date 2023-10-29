import {getServerSession, Session} from 'next-auth';

import {authOptions} from '@/const/auth';
import {getAllIngredients} from '@/controller/ingredient';
import {getAllMeals} from '@/controller/meal';
import {CookingPreloadedData, CookingServerDataProps} from '@/ui/cooking/common/type';
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
