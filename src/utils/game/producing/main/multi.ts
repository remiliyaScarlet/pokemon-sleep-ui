import {defaultProductionPeriod} from '@/const/game/production';
import {PokemonProducingRateFinal, PokemonProducingRateWithPayload} from '@/types/game/producing/rate';
import {ProducingStateOfRate} from '@/types/game/producing/state';
import {applyIngredientMultiplier} from '@/utils/game/producing/apply/ingredient';
import {groupPokemonProducingRate} from '@/utils/game/producing/group';
import {getIngredientMultiplier, GetIngredientMultiplierOpts} from '@/utils/game/producing/ingredient/multiplier';
import {getPokemonProducingRateBase, GetPokemonProducingRateBaseOpts} from '@/utils/game/producing/main/base';
import {GetProducingRateSharedOpts} from '@/utils/game/producing/type';
import {isNotNullish} from '@/utils/type';


type GetPokemonProducingRateOptsWithPayload<TPayload> = {
  opts: Omit<GetPokemonProducingRateBaseOpts, keyof GetProducingRateSharedOpts>,
  payload: TPayload,
};

type GetFinalProducingRateMultiOpts<TPayload> = Omit<GetIngredientMultiplierOpts, 'production'> & {
  rateOpts: GetPokemonProducingRateOptsWithPayload<TPayload>[],
  sharedOpts: GetProducingRateSharedOpts,
  groupingState: ProducingStateOfRate,
};

export const getPokemonProducingRateMulti = <TPayload>({
  rateOpts,
  sharedOpts,
  groupingState,
  ...opts
}: GetFinalProducingRateMultiOpts<TPayload>): PokemonProducingRateFinal<TPayload> => {
  const period = sharedOpts.period ?? defaultProductionPeriod;

  const ratesWithPayload = rateOpts.map(({opts, payload}) => ({
    rawRate: getPokemonProducingRateBase({...opts, ...sharedOpts}),
    payload,
  }));
  const groupedOriginalRates = groupPokemonProducingRate({
    period,
    rates: ratesWithPayload.map(({rawRate}) => rawRate),
    state: groupingState,
  });
  const ingredientMultiplier = getIngredientMultiplier({
    production: Object.fromEntries(Object.entries(groupedOriginalRates.ingredient)
      .map(([id, rate]) => {
        if (!rate) {
          return null;
        }

        return [id, rate.quantity];
      })
      .filter(isNotNullish)),
    ...opts,
  });

  const ratesAfterIngredient: PokemonProducingRateWithPayload<TPayload>[] = ratesWithPayload.map((rateWithPayload) => {
    const {rawRate} = rateWithPayload;

    return {
      ...rateWithPayload,
      rate: {
        original: rawRate,
        final: applyIngredientMultiplier({rate: rawRate, ingredientMultiplier}),
      },
    };
  });

  return {
    rates: ratesAfterIngredient,
    grouped: groupPokemonProducingRate({
      period,
      rates: ratesAfterIngredient.map(({rate}) => rate.final),
      state: groupingState,
    }),
  };
};
