import merge from 'lodash/merge';
import {v4} from 'uuid';

import {PokeInBox} from '@/types/game/pokebox';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChain} from '@/types/game/pokemon/ingredient';
import {RatingBonus, RatingSetupData} from '@/types/game/pokemon/rating';
import {RatingFilterOnSelectOpts} from '@/ui/rating/filter/type';
import {RatingDataProps} from '@/ui/rating/type';
import {generateIngredientProductionAtLevels} from '@/utils/game/producing/ingredientChain';


type GenerateRatingSetupOpts = RatingFilterOnSelectOpts & Pick<
  RatingDataProps,
  'ingredientChainMap' | 'preloadSetupBonus'
> & {
  chain: IngredientChain,
};

export const generateRatingSetup = ({
  pokemon,
  ingredients,
  subSkill,
  nature,
  chain,
  preloadSetupBonus,
}: GenerateRatingSetupOpts): RatingSetupData => {
  return {
    pokemon,
    snorlaxFavorite: {},
    ingredients: ingredients ?? generateIngredientProductionAtLevels(chain),
    subSkill: subSkill ?? {},
    nature: nature ?? null,
    bonus: merge({
      ingredient: 20,
    } satisfies RatingBonus, preloadSetupBonus),
  };
};

type ToPokeInBoxOpts = {
  pokemon: PokemonInfo,
  name: string | null,
  level: number,
  setup: RatingSetupData,
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
