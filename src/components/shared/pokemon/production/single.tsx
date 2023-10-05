import React from 'react';

import {clsx} from 'clsx';

import {AnimatedSwitchContent} from '@/components/layout/animatedSwitch/content';
import {Flex} from '@/components/layout/flex/common';
import {PokemonFrequency} from '@/components/shared/pokemon/frequency/main';
import {PokemonProducingRateProps} from '@/components/shared/pokemon/production/type';
import {ProducingRateContent} from '@/components/shared/production/rate/content';
import {ProducingRateUI} from '@/components/shared/production/rate/main';
import {useRotatingNumbers} from '@/hooks/rotatingNumbers';
import {ProducingRateOfStates} from '@/types/game/producing/rate';
import {ProducingStateOfRate} from '@/types/game/producing/state';
import {Dimension} from '@/types/style';
import {toProducingRateOfState} from '@/utils/game/producing/convert';


type Props = PokemonProducingRateProps & {
  rate: ProducingRateOfStates | null,
  getIcon: (dimension: Dimension) => React.ReactNode,
  additionalContents?: React.ReactNode[],
  dailyTotalEnergy?: number,
  state?: ProducingStateOfRate,
};

export const PokemonProducingRateSingle = ({
  horizontal,
  hideFrequency,
  rate,
  getIcon,
  additionalContents,
  dailyTotalEnergy,
  state = 'equivalent',
}: Props) => {
  const {idx} = useRotatingNumbers({
    max: {
      additionalContents: !!additionalContents?.length ? 2 : 1,
      dailyTotalEnergy: dailyTotalEnergy ? 2 : 1,
    },
    interval: 5000,
  });

  const frequency = !hideFrequency && <PokemonFrequency frequency={rate?.frequency[state] ?? NaN}/>;
  const rateInfo = (
    <ProducingRateUI
      rate={rate && toProducingRateOfState({rate, state})}
      getIcon={getIcon}
    />
  );

  return (
    <Flex direction={horizontal ? 'row' : 'col'} wrap className={clsx(
      'gap-1',
      horizontal && 'items-center justify-end md:flex-row',
      !horizontal && 'items-end justify-center',
    )}>
      {
        !!additionalContents?.length ?
          <AnimatedSwitchContent
            idx={idx.additionalContents}
            contents={[frequency, ...additionalContents]}
            className="place-items-end"
          /> :
          frequency
      }
      {
        dailyTotalEnergy !== undefined ?
          <AnimatedSwitchContent
            idx={idx.dailyTotalEnergy}
            contents={[
              rateInfo,
              <ProducingRateContent key="dailyTotal" dailyRate={dailyTotalEnergy} isEnergy/>,
            ]}
            className="place-items-end"
          /> :
          rateInfo
      }
    </Flex>
  );
};
