import {v4} from 'uuid';

import {EffectiveBonus} from '@/types/game/bonus';
import {PokeInBox} from '@/types/game/pokebox';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChain} from '@/types/game/pokemon/ingredient';
import {RatingFilterOnSelectOpts} from '@/ui/rating/filter/type';
import {RatingDataProps, RatingSetupInputs} from '@/ui/rating/type';
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
  };
};

type ToPokeInBoxOpts = {
  pokemon: PokemonInfo,
  name: string | null,
  level: number,
  setup: RatingSetupInputs,
};

export const toPokeInBox = ({pokemon, name, level, setup}: ToPokeInBoxOpts): PokeInBox => {
  const {id, stats} = pokemon;
  const {ingredients, nature, subSkill} = setup;

  return {
    uuid: v4(),
    pokemon: id,
    name,
    level,
    ingredients,
    carryLimit: stats.maxCarry,
    subSkill,
    nature,
  };
};
