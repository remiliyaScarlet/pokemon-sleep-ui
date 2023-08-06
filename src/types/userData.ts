import {Session} from 'next-auth';

import {CookingFilterRecipeLevel} from '@/ui/cooking/type';
import {DeepPartial} from '@/utils/type';


export type UserData = Partial<{
  recipeLevel: DeepPartial<CookingFilterRecipeLevel>,
}>;

export type UpdateUserData = (opts: UpdateUserDataOpts) => Promise<Session | null>;

export type UpdateUserDataOpts = {
  type: 'recipeLevel',
  data: CookingFilterRecipeLevel,
};
