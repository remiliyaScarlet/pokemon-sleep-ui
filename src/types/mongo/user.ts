import {CookingFilterRecipeLevel} from '@/ui/cooking/type';
import {TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';


export type UserDataInDatabase<T> = {
  userId: string,
  data: T,
};

export type UserDataRecipeLevel = UserDataInDatabase<CookingFilterRecipeLevel>;

export type UserDataTeamAnalysisSetup = UserDataInDatabase<TeamAnalysisTeamSetup>;
