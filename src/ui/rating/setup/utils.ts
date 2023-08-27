import merge from 'lodash/merge';

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
