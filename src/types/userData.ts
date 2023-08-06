import {Session} from 'next-auth';

import {CookingFilterRecipeLevel} from '@/ui/cooking/type';
import {PokedexDisplay} from '@/ui/pokedex/index/type';
import {TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';
import {DeepPartialExceptKey} from '@/utils/type';


export type UpdateUserData = (opts: UpdateUserDataOpts) => Promise<Session | null>;

export type UpdateUserDataOpts = {
  type: 'recipeLevel',
  data: CookingFilterRecipeLevel,
} | {
  type: 'teamAnalysisSetup',
  data: TeamAnalysisTeamSetup,
} | {
  type: 'pokedex',
  data: PokedexDisplay,
};

export type UserDataUpdateType = UpdateUserDataOpts['type'];

export type UserDataUpdateContent = {
  recipeLevel: CookingFilterRecipeLevel,
  teamAnalysisSetup: TeamAnalysisTeamSetup,
  pokedex: PokedexDisplay,
};

export type UserData = DeepPartialExceptKey<UserDataUpdateContent>;
