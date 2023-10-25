import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {StaminaChartTooltipCommonProps} from '@/components/shared/stamina/chart/tooltip/type';
import {toFormattedTimeFromTiming} from '@/components/shared/stamina/chart/utils';
import {staminaEventTypeI18nId} from '@/const/game/stamina';


type Props = StaminaChartTooltipCommonProps & {
  getInfo: (value: number) => React.ReactNode,
};

export const StaminaChartTooltip = ({active, payload, label, logs, start, getInfo}: Props) => {
  const t = useTranslations('UI.Stamina.EventType');

  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0];
  const log = logs.find(({timing}) => timing === label);

  // `data.value` could be `0`, therefore explicitly checking here
  if (!log || data.value === undefined) {
    return null;
  }

  const timing = label as number;
  const type = log.type;

  return (
    <Flex noFullWidth className="info-section w-40">
      <div>{toFormattedTimeFromTiming({timing, start})}</div>
      {getInfo(data.value)}
      {
        type &&
        <div>
          {t(staminaEventTypeI18nId[type])}
        </div>
      }
    </Flex>
  );
};
