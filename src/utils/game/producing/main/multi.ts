import {defaultProductionPeriod, maxTeamMemberCount} from '@/const/game/production';
import {PokemonProducingRateFinal, PokemonProducingRateWithPayload} from '@/types/game/producing/rate';
import {ProducingStateOfRate} from '@/types/game/producing/state';
import {toSum} from '@/utils/array';
import {applyIngredientMultiplier} from '@/utils/game/producing/apply/ingredient';
import {groupPokemonProducingRate} from '@/utils/game/producing/group';
import {getIngredientMultiplier, GetIngredientMultiplierOpts} from '@/utils/game/producing/ingredient/multiplier';
import {getPokemonProducingRateBase} from '@/utils/game/producing/main/base';
import {GetPokemonProducingRateOptsWithPayload} from '@/utils/game/producing/main/type';
import {getHelpingBonusStack} from '@/utils/game/producing/params';
import {GetProducingRateBehavior, GetProducingRateSharedOpts} from '@/utils/game/producing/type';
import {isNotNullish} from '@/utils/type';


type GetPokemonProducingRateMultiOpts<TPayload> = Omit<GetIngredientMultiplierOpts, 'production'> & {
  rateOpts: GetPokemonProducingRateOptsWithPayload<TPayload>[],
  sharedOpts: GetProducingRateSharedOpts,
  calcBehavior?: GetProducingRateBehavior,
  groupingState: ProducingStateOfRate,
};

export const getPokemonProducingRateMulti = <TPayload>({
  rateOpts,
  sharedOpts,
  calcBehavior,
  groupingState,
  ...opts
}: GetPokemonProducingRateMultiOpts<TPayload>): PokemonProducingRateFinal<TPayload> => {
  const period = sharedOpts.period ?? defaultProductionPeriod;
  // Have to calculate helper stack count first to know if helper bonus is active
  const helperStacks = toSum(rateOpts.map(({opts}) => getHelpingBonusStack({
    subSkillBonus: opts.subSkillBonus ?? {},
  })));
  const helperCount = (
    calcBehavior?.simulateHelperBonusOnSelf ?
      (helperStacks ? maxTeamMemberCount : 0) :
      helperStacks
  );

  const ratesWithPayload = rateOpts.map(({opts, payload}) => ({
    rawRate: getPokemonProducingRateBase({
      ...opts,
      ...sharedOpts,
      helperCount,
    }),
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
