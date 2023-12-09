import {RecipeLevel} from '@/types/game/cooking';
import {IngredientCounter} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal/main';
import {PokeInBox} from '@/types/game/pokebox';
import {PokemonProducingRateWithPayload} from '@/types/game/producing/rate';
import {GetPokemonProducingRateOpts} from '@/utils/game/producing/main/type';


export const teamMakerMemberCount = [
  1,
  2,
  3,
  4,
  5,
] as const;

export type TeamMakerMemberCount = typeof teamMakerMemberCount[number];

export type TeamMakerRateAtMaxPotentialData = {
  rate: PokemonProducingRateWithPayload<null>,
  pokeInBox: PokeInBox,
  calcOpts: GetPokemonProducingRateOpts,
  totalStrength: number,
};

export type TeamMakerInputCalculated = {
  recipeLevel: RecipeLevel,
  targetMeals: Meal[],
};

export type TeamMakerIngredientStats = {
  supply: IngredientCounter,
  surplus: IngredientCounter,
  shortage: IngredientCounter,
};
