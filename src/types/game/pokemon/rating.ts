import {PokemonOnDeskState} from '@/components/shared/pokemon/predefined/lab/onDesk/type';
import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap, IngredientProduction} from '@/types/game/pokemon/ingredient';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {PokemonSubSkill, SubSkillMap} from '@/types/game/pokemon/subSkill';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {UserSettings} from '@/types/userData/settings';


export const ratingBasis = [
  'totalProduction',
  'ingredientCount',
  'ingredientProduction',
  'skillTriggerValue',
] as const;

export type RatingBasis = typeof ratingBasis[number];

export type RatingCombination = {
  ingredients: IngredientProduction[],
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
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
  basis: RatingBasis,
};

export type RatingSetupData = Omit<RatingOnDeskState, 'origin'> & {
  settings: UserSettings,
};

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
