import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {getAllIngredients} from '@/controller/ingredient';
import {getAllMeals} from '@/controller/meal';
import {CookingServerDataProps} from '@/ui/cooking/common/type';
import {toCookingPreloadedData} from '@/ui/cooking/common/utils/main';


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
