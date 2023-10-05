import React from 'react';

import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/main';
import {pokemonProducingStatsStateI18nId} from '@/components/shared/pokemon/production/stats/const';
import {PokemonProducingStatsOfState} from '@/components/shared/pokemon/production/stats/state';
import {PokemonProducingStatsCommonProps} from '@/components/shared/pokemon/production/stats/type';
import {staminaLevelImageSrc} from '@/const/game/stamina';
import {efficiencyBreakPoints} from '@/types/game/producing/efficiency';
import {getEfficiency} from '@/utils/game/stamina/efficiency';


export const PokemonProducingStats = (props: PokemonProducingStatsCommonProps) => {
  const t = useTranslations('UI.Producing');
  const t2 = useTranslations('UI.Common');

  return (
    <Flex noFullWidth className="gap-1 sm:w-[60vw]">
      <AdsUnit/>
      <PokemonProducingStatsOfState
        {...props}
        state="equivalent"
        title={t(pokemonProducingStatsStateI18nId.equivalent)}
      />
      <AdsUnit/>
      <PokemonProducingStatsOfState
        {...props}
        state="awake"
        title={t(pokemonProducingStatsStateI18nId.awake)}
      />
      <PokemonProducingStatsOfState
        {...props}
        state="sleepVacant"
        title={t(pokemonProducingStatsStateI18nId.sleepVacant)}
      />
      <PokemonProducingStatsOfState
        {...props}
        state="sleepFilled"
        title={t(pokemonProducingStatsStateI18nId.sleepFilled)}
      />
      <AdsUnit/>
      {/* If no +1 for `getEfficiency()`, the efficiency obtained is actually 1 level lower */}
      {efficiencyBreakPoints.map((breakPoint) => (
        <PokemonProducingStatsOfState
          {...props}
          key={breakPoint}
          state="awake"
          title={
            <Flex direction="row" center className="gap-1.5 p-1">
              <div>{t(pokemonProducingStatsStateI18nId.awake)}</div>
              <div>/</div>
              <GenericIcon src={staminaLevelImageSrc[breakPoint]} alt={`${breakPoint}+`}/>
              <div>{t2('Stamina')} {breakPoint}+</div>
            </Flex>
          }
          targetMultiplier={getEfficiency(breakPoint + 1)}
        />
      ))}
    </Flex>
  );
};
