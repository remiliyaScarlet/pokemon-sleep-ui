import {ApplyMultiplierTarget} from '@/types/game/producing/apply';
import {PokemonProducingRate, ProducingRateOfStates, ProducingValueOfStates} from '@/types/game/producing/rate';
import {producingStateOfRate} from '@/types/game/producing/state';


type ApplyMultiplierToProducingValueOfStatesOpts = {
  value: ProducingValueOfStates,
  isEffective: boolean,
  multiplier: number,
};

const applyMultiplierToProducingValueOfStates = ({
  value,
  isEffective,
  multiplier,
}: ApplyMultiplierToProducingValueOfStatesOpts): ProducingValueOfStates => {
  if (!isEffective) {
    return value;
  }

  return (
    Object.fromEntries(
      producingStateOfRate.map((state) => [state, value[state] * multiplier]),
    ) as ProducingValueOfStates
  );
};

type ApplyMultiplierCommonOpts = {
  target: ApplyMultiplierTarget[],
  multiplier: {
    original: number,
    target: number,
  },
};

type ApplyMultiplierToRateOfStatesOpts = ApplyMultiplierCommonOpts & {
  rate: ProducingRateOfStates,
};

export const applyMultiplierToRateOfStates = ({
  target,
  multiplier,
  rate,
}: ApplyMultiplierToRateOfStatesOpts): ProducingRateOfStates => {
  const multiplierToApply = multiplier.target / multiplier.original;

  return {
    ...rate,
    frequency: applyMultiplierToProducingValueOfStates({
      value: rate.frequency,
      isEffective: target.includes('frequency'),
      multiplier: 1 / multiplierToApply,
    }),
    quantity: applyMultiplierToProducingValueOfStates({
      value: rate.quantity,
      isEffective: target.includes('quantity'),
      multiplier: multiplierToApply,
    }),
    energy: applyMultiplierToProducingValueOfStates({
      value: rate.energy,
      isEffective: target.includes('energy'),
      multiplier: multiplierToApply,
    }),
  };
};

type ApplyMultiplierToPokemonRateOpts = ApplyMultiplierCommonOpts & {
  rate: PokemonProducingRate,
};

export const applyMultiplierToPokemonRate = ({
  rate,
  ...opts
}: ApplyMultiplierToPokemonRateOpts): PokemonProducingRate => {
  const berry = applyMultiplierToRateOfStates({rate: rate.berry, ...opts});
  const ingredient = Object.values(rate.ingredient)
    .map((rate) => applyMultiplierToRateOfStates({rate, ...opts}));
  const skill = applyMultiplierToRateOfStates({rate: rate.skill, ...opts});

  return {
    ...rate,
    berry,
    ingredient,
    skill,
  };
};
