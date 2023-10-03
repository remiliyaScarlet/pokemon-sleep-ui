import {v4} from 'uuid';

import {EffectiveBonus} from '@/types/game/bonus';
import {PokeInBox} from '@/types/game/pokebox';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChain} from '@/types/game/pokemon/ingredient';
import {RatingFilterOnSelectOpts} from '@/ui/rating/filter/type';
import {RatingDataProps, RatingSetupInputs} from '@/ui/rating/type';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon';
import {generateIngredientProductionAtLevels} from '@/utils/game/producing/ingredientChain';


type GenerateRatingSetupOpts = RatingFilterOnSelectOpts & Pick<
  RatingDataProps,
  'ingredientChainMap'
> & {
  chain: IngredientChain,
  bonus: EffectiveBonus,
};

export const generateRatingInputs = ({
  pokemon,
  ingredients,
  subSkill,
  nature,
  chain,
}: GenerateRatingSetupOpts): RatingSetupInputs => {
  return {
    pokemon,
    snorlaxFavorite: {},
    ingredients: ingredients ?? generateIngredientProductionAtLevels(chain),
    subSkill: subSkill ?? {},
    nature: nature ?? null,
    evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
  };
};

type ToPokeInBoxOpts = {
  pokemon: PokemonInfo,
  name: string | null,
  level: number,
  setup: RatingSetupInputs,
};

export const toPokeInBox = ({pokemon, name, level, setup}: ToPokeInBoxOpts): PokeInBox => {
  const {id} = pokemon;
  const {
    ingredients,
    nature,
    subSkill,
    evolutionCount,
  } = setup;

  // Explicit assignments to avoid extra unwanted properties
  return {
    uuid: v4(),
    dateAdded: Date.now(),
    pokemon: id,
    name,
    level,
    ingredients,
    evolutionCount,
    subSkill,
    nature,
  };
};
