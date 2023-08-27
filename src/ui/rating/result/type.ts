import {PokemonInfo} from '@/types/game/pokemon';
import {ingredientLevels, IngredientProduction} from '@/types/game/pokemon/ingredient';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill, pokemonSubSkillLevel} from '@/types/game/pokemon/subskill';
import {RatingDataProps, RatingRequest} from '@/ui/rating/type';


export type RatingCombination = {
  productions: IngredientProduction[],
  subSkill: PokemonSubSkill,
  natureId: NatureId | null,
};

export type RatingDataPoint = {
  value: number,
  combination: RatingCombination,
};

export const ratingKeyLevels = [
  ...pokemonSubSkillLevel,
  ...ingredientLevels,
] as const;

export type RatingKeyLevel = typeof ratingKeyLevels[number];

export type RatingResultOfLevel = {
  level: RatingKeyLevel,
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

export type RatingResultUiProps = RatingDataProps & {
  pokemon: PokemonInfo,
  request: RatingRequest | undefined,
};
