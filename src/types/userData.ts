import {FilterInclusionMap} from '@/components/input/filter/type';
import {BerryId} from '@/types/mongo/berry';
import {CookingFilterRecipeLevel} from '@/ui/cooking/type';
import {PokedexDisplay} from '@/ui/pokedex/index/type';
import {TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';
import {DeepPartialExceptKey} from '@/utils/type';


export type UserDataForTeamAnalysisSetup = TeamAnalysisTeamSetup & {snorlaxFavorite: FilterInclusionMap<BerryId>};

export type UploadUserDataOpts = {
  type: 'recipeLevel',
  data: {level: CookingFilterRecipeLevel, potCapacity: number},
} | {
  type: 'teamAnalysisSetup',
  data: UserDataForTeamAnalysisSetup,
} | {
  type: 'pokedex',
  data: PokedexDisplay,
} | {
  type: 'potCapacity',
  data: number | null,
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
  teamAnalysisSetup: UserDataForTeamAnalysisSetup,
  pokedex: PokedexDisplay,
  potCapacity: number,
};

export type UserData = DeepPartialExceptKey<UserDataUploadContent>;
