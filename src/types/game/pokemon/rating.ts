import {PokemonInfo} from '@/types/game/pokemon';
import {ingredientLevels, IngredientProduction, IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill, pokemonSubSkillLevel} from '@/types/game/pokemon/subskill';
import {SnorlaxFavorite} from '@/types/game/snorlax';


export type RatingCombination = {
  productions: IngredientProduction[],
  subSkill: PokemonSubSkill,
  natureId: NatureId | null,
};

export const ratingKeyLevels = [
  ...pokemonSubSkillLevel,
  ...ingredientLevels,
] as const;

export type RatingKeyLevel = typeof ratingKeyLevels[number];

export type RatingDataPoint = {
  value: number,
  combination: RatingCombination,
};

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

export type RatingBonus = {
  ingredient: number,
};

export type RatingSetupData = {
  pokemon: PokemonInfo,
  ingredients: IngredientProductionAtLevels,
  snorlaxFavorite: SnorlaxFavorite,
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
  bonus: RatingBonus,
};
