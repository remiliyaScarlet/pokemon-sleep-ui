import React from 'react';

import {clsx} from 'clsx';

import {AnimatedSwitchContent} from '@/components/layout/animatedSwitch/content';
import {Flex} from '@/components/layout/flex';
import {PokemonFrequency} from '@/components/shared/pokemon/frequency/main';
import {PokemonProducingRateContent} from '@/components/shared/pokemon/production/content';
import {PokemonProducingRateProps} from '@/components/shared/pokemon/production/type';
import {useRotatingNumbers} from '@/hooks/rotatingNumbers';
import {ProducingRateOfItem} from '@/types/game/producing/rate';


type Props = PokemonProducingRateProps & {
  rate: ProducingRateOfItem | null,
  icon: React.ReactNode,
  additionalContents?: React.ReactNode[],
  dailyTotalEnergy?: number,
};

export const PokemonProducingRateSingle = ({
  horizontal,
  hideFrequency,
  rate,
  icon,
  additionalContents,
  dailyTotalEnergy,
  ...props
}: Props) => {
  const {idx} = useRotatingNumbers({
    max: {
      additionalContents: !!additionalContents?.length ? 2 : 1,
      dailyTotalEnergy: dailyTotalEnergy ? 2 : 1,
    },
    interval: 5000,
  });

  const frequency = !hideFrequency && <PokemonFrequency frequency={rate?.frequency ?? NaN}/>;
  const rateInfo = (
    <Flex direction="row" noFullWidth className="gap-1">
      <PokemonProducingRateContent dailyRate={rate?.quantity} icon={icon} {...props}/>
      <PokemonProducingRateContent dailyRate={rate?.dailyEnergy} {...props}/>
    </Flex>
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
              <PokemonProducingRateContent key="dailyTotal" dailyRate={dailyTotalEnergy} {...props}/>,
            ]}
            className="place-items-end"
          /> :
          rateInfo
      }
    </Flex>
  );
};
