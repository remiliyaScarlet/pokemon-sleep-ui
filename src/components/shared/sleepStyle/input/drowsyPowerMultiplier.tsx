import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {defaultDrowsyPowerMultiplier} from '@/const/game/event';
import {iconFilterButtonStyle} from '@/styles/input';
import {generateNumberTicks} from '@/utils/number/generator';


type Props = {
  multiplier: number,
  setMultiplier: (multiplier: number) => void,
  maxMultiplier: number,
};

export const DrowsyPowerMultiplierInput = ({multiplier, setMultiplier, maxMultiplier}: Props) => {
  const t = useTranslations('UI.SleepStyle');

  return (
    <FilterTextInput
      title={t('DrowsyPowerMultiplier')}
      ids={[...generateNumberTicks({
        max: maxMultiplier,
        interval: 50,
        start: defaultDrowsyPowerMultiplier,
      })]}
      idToText={(multiplier) => multiplier.toString()}
      onClick={setMultiplier}
      isActive={(current) => current === multiplier}
      className={clsx(iconFilterButtonStyle, 'text-sm')}
    />
  );
};
