import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {getAllIngredients} from '@/controller/ingredient';
import {getAllMealsAsMap} from '@/controller/meal';
import {CookingServerDataProps} from '@/ui/cooking/common/type';
import {createUserSettingsBundle} from '@/utils/user/settings/create';


export const getCookingServerDataProps = async (): Promise<CookingServerDataProps> => {
  const [
    session,
    mealMap,
    ingredientMap,
  ] = await Promise.all([
    getServerSession(authOptions),
    getAllMealsAsMap(),
    getAllIngredients(),
  ]);

  return {
    mealMap,
    ingredientMap,
    preloaded: createUserSettingsBundle(session),
  };
};
