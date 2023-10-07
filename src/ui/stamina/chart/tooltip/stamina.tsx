import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {staminaLevelImageSrc} from '@/const/game/stamina';
import {StaminaChartTooltip} from '@/ui/stamina/chart/tooltip/common';
import {StaminaChartTooltipCommonProps} from '@/ui/stamina/chart/tooltip/type';
import {getStaminaBreakpoint} from '@/utils/game/stamina/utils';
import {formatInt} from '@/utils/number';


export const StaminaChartTooltipOfStamina = (props: StaminaChartTooltipCommonProps) => {
  const t = useTranslations('UI.Common');

  return (
    <StaminaChartTooltip
      {...props}
      getInfo={(stamina) => (
        <Flex direction="row" className="items-center gap-1">
          <GenericIcon src={staminaLevelImageSrc[getStaminaBreakpoint(stamina)]} alt={t('Stamina')} noInvert/>
          <div>{formatInt(stamina)}</div>
        </Flex>
      )}
    />
  );
};
