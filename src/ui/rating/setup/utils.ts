import merge from 'lodash/merge';
import {v4} from 'uuid';

import {PokeInBox} from '@/types/game/pokebox';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChain} from '@/types/game/pokemon/ingredient';
import {RatingSetupBonus, RatingSetupData} from '@/ui/rating/setup/type';
import {RatingDataProps} from '@/ui/rating/type';
import {generateIngredientProductionAtLevels} from '@/utils/game/producing/ingredientChain';


type GenerateRatingSetupOpts = Pick<RatingDataProps, 'preloadSetupBonus'> & {
  chain: IngredientChain,
};

export const generateRatingSetup = ({
  chain,
  preloadSetupBonus,
}: GenerateRatingSetupOpts): RatingSetupData => {
  return {
    snorlaxFavorite: {},
    ingredients: generateIngredientProductionAtLevels(chain),
    subSkill: {},
    nature: null,
    bonus: merge({
      ingredient: 20,
    } satisfies RatingSetupBonus, preloadSetupBonus),
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
