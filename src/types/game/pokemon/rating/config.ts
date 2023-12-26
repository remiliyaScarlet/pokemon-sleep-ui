import {PokemonKeyLevel} from '@/types/game/pokemon/level';


export const ratingBasis = [
  'totalProduction',
  'ingredientCount',
  'ingredientProduction',
  'skillTriggerValue',
] as const;

export type RatingBasis = typeof ratingBasis[number];

export type RatingWeight = {[keyLevel in PokemonKeyLevel]?: number};

export const ratingWeightedStatsBasis = [
  'percentile',
  'percentage',
  'relativeStrength',
] as const;

export type RatingWeightedStatsBasis = typeof ratingWeightedStatsBasis[number];

export type RatingWeightedStats = {[basis in RatingWeightedStatsBasis]: number};

export type RatingConfig = {
  basis: RatingWeightedStatsBasis,
  weight: RatingWeight,
};
