import {IngredientChain} from '@/types/game/pokemon/ingredient';
import {RatingSetupData} from '@/ui/rating/setup/type';
import {generateIngredientProductionAtLevels} from '@/utils/game/producing/ingredientChain';


type GenerateRatingSetupOpts = {
  chain: IngredientChain,
};

export const generateRatingSetup = ({chain}: GenerateRatingSetupOpts): RatingSetupData => {
  return {
    level: pokemonMaxLevel,
    snorlaxFavorite: {},
    ingredients: generateIngredientProductionAtLevels(chain),
    subSkill: {},
    nature: null,
  };
};
