import {FilterInclusionMap} from '@/components/input/filter/type';
import {Pokebox} from '@/types/game/pokebox';
import {BerryId} from '@/types/mongo/berry';
import {MealTypeId} from '@/types/mongo/meal';
import {CookingFilterIngredientCount, CookingFilterRecipeLevel} from '@/ui/cooking/type';
import {PokedexDisplay} from '@/ui/pokedex/index/type';
import {TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


export type UploadOfTeamAnalysisSetup = TeamAnalysisTeamSetup & {
  snorlaxFavorite: FilterInclusionMap<BerryId>
};

export type UploadOfPotInfo = {
  type: MealTypeId | null,
  potCapacity: number | null,
};

export type UploadOfCookingData = UploadOfPotInfo & {
  level: CookingFilterRecipeLevel,
  ingredientCount: CookingFilterIngredientCount,
};

export type UploadOfPokebox = {
  pokebox: Pokebox,
  display: PokeboxViewerDisplay,
};

export type UserDataUploadOpts = {
  type: 'pokedex',
  data: PokedexDisplay,
} | {
  type: 'pokebox',
  data: UploadOfPokebox,
} | {
  type: 'teamAnalysisSetup',
  data: UploadOfTeamAnalysisSetup,
} | {
  type: 'potCapacity',
  data: number | null,
} | {
  type: 'potInfo',
  data: UploadOfPotInfo,
} | {
  type: 'cooking',
  data: UploadOfCookingData,
};
