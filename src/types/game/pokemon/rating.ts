import {PokemonOnDeskState} from '@/components/shared/pokemon/predefined/lab/onDesk/type';
import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap, IngredientProduction} from '@/types/game/pokemon/ingredient';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {PokemonSubSkill, SubSkillMap} from '@/types/game/pokemon/subSkill';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {CalculatedUserSettings} from '@/types/userData/settings';


export type RatingCombination = {
  productions: IngredientProduction[],
  subSkill: PokemonSubSkill,
  natureId: NatureId | null,
};

export type RatingDataPoint = {
  value: number,
  combination: RatingCombination,
};

export type RatingResultOfLevel = {
  level: number,
  samples: number,
  rank: number,
  percentage: number,
  percentile: number,
  baseDiffPercent: number,
  points: {
    min: RatingDataPoint | null,
    current: RatingDataPoint | null,
    max: RatingDataPoint | null,
  },
};

export type RatingOnDeskState = PokemonOnDeskState & {
  snorlaxFavorite: SnorlaxFavorite,
};

export type RatingSetupData = RatingOnDeskState & CalculatedUserSettings;

export type RatingRequest = {
  setup: RatingSetupData,
  timestamp: number,
};

export type RatingWorkerOpts = RatingSetupData & Omit<RatingOpts, 'pokemon'>;

export type RatingOpts = {
  level: number,
  pokemon: PokemonInfo | undefined,
  pokemonProducingParams: PokemonProducingParams,
  ingredientChainMap: IngredientChainMap,
  ingredientMap: IngredientMap,
  berryDataMap: BerryDataMap,
  subSkillMap: SubSkillMap,
};
