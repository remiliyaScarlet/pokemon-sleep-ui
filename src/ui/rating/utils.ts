import {PokemonComplexFilterOnSelectOpts} from '@/components/shared/pokemon/predefined/complexPicker/type';
import {EffectiveBonus} from '@/types/game/bonus';
import {IngredientChain} from '@/types/game/pokemon/ingredient';
import {RatingRequest} from '@/types/game/pokemon/rating';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {RatingDataProps, RatingSetupInputs} from '@/ui/rating/type';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon';
import {generateIngredientProductionAtLevels} from '@/utils/game/producing/ingredientChain';


export type ToRatingSetupDataOpts = {
  setup: RatingSetupInputs,
  calculatedSettings: CalculatedUserSettings,
  timestamp?: number,
};

export const toRatingRequest = ({setup, calculatedSettings, timestamp}: ToRatingSetupDataOpts): RatingRequest => {
  return {
    setup: {
      ...setup,
      ...calculatedSettings,
    },
    timestamp: timestamp ?? Date.now(),
  };
};

type GenerateRatingSetupOpts = PokemonComplexFilterOnSelectOpts & Pick<
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
