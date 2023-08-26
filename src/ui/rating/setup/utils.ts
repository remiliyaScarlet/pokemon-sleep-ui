import {IngredientChain} from '@/types/game/pokemon/ingredient';
import {RatingSetupData} from '@/ui/rating/setup/type';
import {generateIngredientProductionAtLevels} from '@/utils/game/producing/ingredientChain';


type GenerateRatingSetupOpts = {
  chain: IngredientChain,
};

export const generateRatingSetup = ({chain}: GenerateRatingSetupOpts): RatingSetupData => {
  return {
    level: 1,
    snorlaxFavorite: {},
    ingredients: generateIngredientProductionAtLevels(chain),
    subSkill: {},
    nature: null,
  };
};
