import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {getIngredientMap} from '@/controller/ingredient';
import {getMealMap} from '@/controller/meal';
import {CookingServerDataProps} from '@/ui/cooking/common/type';
import {createUserSettingsBundle} from '@/utils/user/settings/create';


export const getCookingServerDataProps = async (): Promise<CookingServerDataProps> => {
  const [
    session,
    mealMap,
    ingredientMap,
  ] = await Promise.all([
    getServerSession(authOptions),
    getMealMap(),
    getIngredientMap(),
  ]);

  return {
    mealMap,
    ingredientMap,
    preloaded: createUserSettingsBundle(session),
  };
};
