import {Session} from 'next-auth';

import {CookingFilterRecipeLevel} from '@/ui/cooking/type';
import {TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';
import {DeepPartial} from '@/utils/type';


export type UserData = {
  recipeLevel: DeepPartial<CookingFilterRecipeLevel> | undefined,
  teamAnalysisSetup: DeepPartial<TeamAnalysisTeamSetup> | undefined,
};

export type UpdateUserData = (opts: UpdateUserDataOpts) => Promise<Session | null>;

export type UpdateUserDataOpts = {
  type: 'recipeLevel',
  data: CookingFilterRecipeLevel,
} | {
  type: 'teamAnalysisSetup',
  data: TeamAnalysisTeamSetup,
};
