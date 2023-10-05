import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {PokemonProducingStatsOfState} from '@/components/shared/pokemon/production/stats/state';
import {PokemonProducingStatsCommonProps} from '@/components/shared/pokemon/production/stats/type';
import {EffectiveBonus} from '@/types/game/bonus';


type Props = PokemonProducingStatsCommonProps & {
  bonus: EffectiveBonus,
};

export const PokemonProducingStats = ({bonus, ...props}: Props) => {
  return (
    <Flex noFullWidth className="gap-1 sm:w-[60vw]">
      <AdsUnit/>
      <PokemonProducingStatsOfState {...props} state="equivalent"/>
      <AdsUnit/>
      <PokemonProducingStatsOfState {...props} state="awake"/>
      <PokemonProducingStatsOfState {...props} state="sleepVacant"/>
      <PokemonProducingStatsOfState {...props} state="sleepFilled"/>
      <AdsUnit/>
    </Flex>
  );
};
