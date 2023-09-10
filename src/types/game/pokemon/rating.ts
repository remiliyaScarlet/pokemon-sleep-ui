import {BerryDataMap} from '@/types/game/berry';
import {EffectiveBonus} from '@/types/game/bonus';
import {IngredientMap} from '@/types/game/ingredient';
import {PokemonInfo} from '@/types/game/pokemon';
import {
  IngredientChainMap,
  IngredientProduction,
  IngredientProductionAtLevels,
} from '@/types/game/pokemon/ingredient';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill, SubSkillMap} from '@/types/game/pokemon/subSkill';
import {SnorlaxFavorite} from '@/types/game/snorlax';


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
  points: {
    min: RatingDataPoint | null,
    current: RatingDataPoint | null,
    max: RatingDataPoint | null,
  },
};

export type RatingSetupData = {
  pokemon: PokemonInfo,
  ingredients: IngredientProductionAtLevels,
  snorlaxFavorite: SnorlaxFavorite,
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
  bonus: EffectiveBonus,
};

export type RatingRequest = {
  setup: RatingSetupData,
  timestamp: number,
};

export type RatingWorkerOpts = RatingSetupData & RatingOpts;

export type RatingOpts = {
  level: number,
  pokemon: PokemonInfo | undefined,
  ingredientChainMap: IngredientChainMap,
  ingredientMap: IngredientMap,
  berryDataMap: BerryDataMap,
  subSkillMap: SubSkillMap,
};
