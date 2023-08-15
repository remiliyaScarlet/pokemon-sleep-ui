import {FilterInclusionMap} from '@/components/input/filter/type';
import {Pokebox} from '@/types/game/pokebox';
import {BerryId} from '@/types/mongo/berry';
import {MealTypeId} from '@/types/mongo/meal';
import {CookingFilterIngredientCount, CookingFilterRecipeLevel} from '@/ui/cooking/type';
import {PokedexDisplay} from '@/ui/pokedex/index/type';
import {TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';
import {DeepPartialExceptKey} from '@/utils/type';


export type UploadOfTeamAnalysisSetup = TeamAnalysisTeamSetup & {snorlaxFavorite: FilterInclusionMap<BerryId>};

export type UploadOfPotInfo = {
  type: MealTypeId | null,
  potCapacity: number | null,
};

export type UploadOfCookingData = UploadOfPotInfo & {
  level: CookingFilterRecipeLevel,
  ingredientCount: CookingFilterIngredientCount,
};

export type UploadUserDataOpts = {
  type: 'pokedex',
  data: PokedexDisplay,
} | {
  type: 'pokebox',
  data: Pokebox,
} | {
  type: 'teamAnalysisSetup',
  data: UploadOfTeamAnalysisSetup,
} | {
  type: 'potCapacity',
  data: number | null,
} | {
  type: 'potInfo',
  data: UploadOfPotInfo,
}| {
  type: 'cooking',
  data: UploadOfCookingData,
};

export type UserDataUploader = (opts: UploadUserDataOpts) => void;

export type UserDataUploadStatus = 'waiting' | 'updating' | 'completed' | 'failed';

export type UseUploadUserDataReturn = {
  upload: UserDataUploader | null,
  status: UserDataUploadStatus,
};

export type UserDataUploadType = UploadUserDataOpts['type'];

export type UserDataUploadContent = {
  mealType: MealTypeId | null,
  recipeLevel: CookingFilterRecipeLevel,
  teamAnalysisSetup: UploadOfTeamAnalysisSetup,
  pokedex: PokedexDisplay,
  potCapacity: number,
  ingredientCount: CookingFilterIngredientCount,
};

export type UserData = DeepPartialExceptKey<UserDataUploadContent>;
