import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericBerryIcon} from '@/components/shared/icon/berry';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonFrequency} from '@/components/shared/pokemon/frequency/main';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {PokemonProducingRateSingle} from '@/components/shared/pokemon/production/single';
import {PokemonProductionSplitFromPokemonRate} from '@/components/shared/pokemon/production/split/fromPokemon';
import {PokemonProducingStatsItemLayout} from '@/components/shared/pokemon/production/stats/item';
import {PokemonProducingStatsCommonProps} from '@/components/shared/pokemon/production/stats/type';
import {ProducingRateUI} from '@/components/shared/production/rate/main';
import {ProducingStateOfRate} from '@/types/game/producing/state';
import {applyStaminaMultiplierOpts} from '@/utils/game/producing/apply';
import {getEquivalentFrequencyFromPokemonRate} from '@/utils/game/producing/frequency';
import {getTotalOfPokemonProducingRate} from '@/utils/game/producing/rateReducer';


type Props = PokemonProducingStatsCommonProps & {
  title: React.ReactNode,
} & ({
  state: ProducingStateOfRate,
  targetMultiplier?: never,
} | {
  state: 'awake',
  targetMultiplier: number,
});

export const PokemonProducingStatsOfState = ({bonus, rate, specialty, title, state, targetMultiplier}: Props) => {
  const original = bonus.stamina.awake;
  const berry = targetMultiplier ?
    applyStaminaMultiplierOpts({rate: rate.berry, multiplier: {original, target: targetMultiplier}}) :
    rate.berry;
  const ingredient = targetMultiplier ?
    Object.values(rate.ingredient).map((rate) => applyStaminaMultiplierOpts({
      rate,
      multiplier: {original, target: targetMultiplier},
    })) :
    Object.values(rate.ingredient);

  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <Flex className="gap-1 rounded-lg bg-slate-500/10 p-2">
      <Flex className="text-lg">
        {title}
      </Flex>
      <Flex className="button-bg rounded-lg p-1">
        <PokemonFrequency
          normalText
          frequency={getEquivalentFrequencyFromPokemonRate({rate, state})}
        />
      </Flex>
      <Flex className="gap-1 md:flex-row">
        <PokemonProducingStatsItemLayout icon={<GenericBerryIcon alt={t('Berry')} noWrap/>}>
          <PokemonProducingRateSingle
            key={berry.id}
            rate={berry}
            state={state}
            getIcon={(dimension) => <PokemonBerryIcon id={berry.id} dimension={dimension}/>}
          />
        </PokemonProducingStatsItemLayout>
        <PokemonProducingStatsItemLayout icon={<GenericIngredientIcon alt={t('Ingredient')} dimension="h-10 w-10"/>}>
          <Flex className="gap-1.5">
            {Object.values(ingredient).map((rate) => (
              <PokemonProducingRateSingle
                key={rate.id}
                rate={rate}
                state={state}
                getIcon={(dimension) => <PokemonIngredientIcon id={rate.id} dimension={dimension}/>}
              />
            ))}
          </Flex>
        </PokemonProducingStatsItemLayout>
      </Flex>
      <Flex className="items-end gap-1 sm:flex-row">
        <PokemonProductionSplitFromPokemonRate rate={rate} state={state} specialty={specialty}/>
        <ProducingRateUI
          className="button-bg rounded-lg px-2"
          rate={getTotalOfPokemonProducingRate({rate, state})}
          hideQuantity
          normalSize
        />
      </Flex>
    </Flex>
  );
};
