import {MealTypeId} from '@/types/game/meal';
import {PokeInBox} from '@/types/game/pokebox';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {CookingFilterIngredientCount, CookingFilterRecipeLevel} from '@/ui/cooking/type';
import {PokedexDisplay} from '@/ui/pokedex/index/type';
import {TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


export type UploadOfTeamAnalysisSetup = TeamAnalysisTeamSetup & {
  snorlaxFavorite: SnorlaxFavorite,
};

export type UploadOfPotInfo = {
  type: MealTypeId | null,
  potCapacity: number | null,
};

export type UploadOfCookingData = UploadOfPotInfo & {
  level: CookingFilterRecipeLevel,
  ingredientCount: CookingFilterIngredientCount,
};

export type UserDataUploadOpts = {
  type: 'pokedex',
  data: PokedexDisplay,
} | {
  type: 'pokebox.display',
  data: PokeboxViewerDisplay,
} | {
  type: 'pokebox.create' | 'pokebox.upsert',
  data: PokeInBox,
} | {
  type: 'pokebox.delete',
  data: PokeInBox['uuid'],
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
