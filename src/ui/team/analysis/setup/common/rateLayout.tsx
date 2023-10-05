import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImageProps} from '@/components/shared/common/image/main';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {productionMultiplierByPeriod, productionStatsPeriodI18nId} from '@/const/game/production';
import {ProductionPeriod} from '@/types/game/producing/display';
import {ProducingRate} from '@/types/game/producing/rate';
import {applyPeriodMultiplierToRate} from '@/utils/game/producing/apply';
import {formatFloat} from '@/utils/number';


export type TeamAnalysisRateLayoutProps = {
  rate: ProducingRate | null,
  period: ProductionPeriod,
  showQuantity: boolean,
  larger?: boolean,
  icon?: React.ReactElement<NextImageProps>,
};

export const TeamAnalysisRateLayout = ({
  rate,
  period,
  showQuantity,
  larger,
  icon,
}: TeamAnalysisRateLayoutProps) => {
  const t = useTranslations('UI.InPage.Pokedex.Stats.Energy');

  const titleClass = clsx('whitespace-nowrap', !larger && 'text-xs');
  const textClass = clsx(larger && 'text-xl');
  const dimension = larger ? 'h-6 w-6' : 'h-5 w-5';

  const calculatedRate = rate && applyPeriodMultiplierToRate(rate);

  return (
    <Flex direction="row" noFullWidth center className="gap-0.5">
      <div className={titleClass}>
        {t(productionStatsPeriodI18nId[period])}
      </div>
      {
        icon &&
        <div className={clsx('relative', dimension)}>
          {icon}
        </div>
      }
      {
        showQuantity && calculatedRate &&
        <div className={textClass}>
          x{formatFloat(calculatedRate.quantity * productionMultiplierByPeriod[period])}
        </div>
      }
      <ColoredEnergyIcon dimension={dimension} alt={t('Name')}/>
      <div className={clsx('text-energy', textClass)}>
        {calculatedRate ? formatFloat(calculatedRate.energy * productionMultiplierByPeriod[period]) : '-'}
      </div>
    </Flex>
  );
};
