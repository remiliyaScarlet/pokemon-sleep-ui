import {CookingFilterRecipeLevel} from '@/ui/cooking/type';
import {PokedexDisplay} from '@/ui/pokedex/index/type';
import {TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';
import {DeepPartialExceptKey} from '@/utils/type';


export type UploadUserDataOpts = {
  type: 'recipeLevel',
  data: CookingFilterRecipeLevel,
} | {
  type: 'teamAnalysisSetup',
  data: TeamAnalysisTeamSetup,
} | {
  type: 'pokedex',
  data: PokedexDisplay,
};

export type UserDataUploader = (opts: UploadUserDataOpts) => void;

export type UserDataUploadStatus = 'waiting' | 'updating' | 'completed' | 'failed';

export type UseUploadUserDataReturn = {
  upload: UserDataUploader | null,
  status: UserDataUploadStatus,
};

export type UserDataUploadType = UploadUserDataOpts['type'];

export type UserDataUploadContent = {
  recipeLevel: CookingFilterRecipeLevel,
  teamAnalysisSetup: TeamAnalysisTeamSetup,
  pokedex: PokedexDisplay,
};

export type UserData = DeepPartialExceptKey<UserDataUploadContent>;
