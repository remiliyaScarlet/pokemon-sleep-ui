import {Meal} from '@/types/game/meal/main';
import {PokemonProducingRate} from '@/types/game/producing/rate';
import {TeamMakerBasisValue} from '@/ui/team/maker/type/common';
import {getMealCoverage} from '@/utils/game/cooking';
import {toProducingRateOfState} from '@/utils/game/producing/convert';
import {getTotalOfPokemonProducingRate} from '@/utils/game/producing/rateReducer';


export type GetTeamMakerBasisValueOpts = {
  pokemonRate: PokemonProducingRate,
  targetMeals: Meal[],
};

export const getTeamMakerBasisValue = ({
  pokemonRate,
  targetMeals,
}: GetTeamMakerBasisValueOpts): TeamMakerBasisValue => {
  return {
    strength: getTotalOfPokemonProducingRate({rate: pokemonRate, state: 'equivalent'}).energy,
    mealCoverage: getMealCoverage({
      meals: targetMeals,
      ingredientProduction: Object.fromEntries(Object.entries(pokemonRate.ingredient).map(([id, rate]) => [
        id,
        toProducingRateOfState({rate, state: 'equivalent'}).quantity,
      ])),
      period: pokemonRate.period,
    }),
  };
};
