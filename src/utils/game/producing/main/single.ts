import {PokemonProducingRateWithPayload} from '@/types/game/producing/rate';
import {GetIngredientMultiplierOpts} from '@/utils/game/producing/ingredient/multiplier';
import {getPokemonProducingRateMulti} from '@/utils/game/producing/main/multi';
import {GetPokemonProducingRateOpts} from '@/utils/game/producing/main/type';
import {GetProducingRateBehavior, GetProducingRateSharedOpts} from '@/utils/game/producing/type';


type GetPokemonProducingRateSingleOpts =
  Omit<GetIngredientMultiplierOpts, 'production'> &
  GetPokemonProducingRateOpts &
  GetProducingRateSharedOpts & {
    calcBehavior?: GetProducingRateBehavior,
  };

export const getPokemonProducingRateSingle = ({
  calcBehavior,
  ...opts
}: GetPokemonProducingRateSingleOpts): PokemonProducingRateWithPayload<null> => {
  const rates = getPokemonProducingRateMulti({
    rateOpts: [{opts, payload: null}],
    sharedOpts: opts,
    groupingState: 'equivalent',
    calcBehavior: {
      ...calcBehavior,
      // Simulate on self by default
      simulateHelperBonusOnSelf: calcBehavior?.simulateHelperBonusOnSelf ?? true,
    },
    ...opts,
  });

  return rates.rates[0];
};
