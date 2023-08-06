import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImageProps} from '@/components/shared/common/image/main';
import {ColoredEnergyIcon} from '@/components/shared/pokemon/energy/colored';
import {formatFloat} from '@/utils/number';
import {classNames} from '@/utils/react';


export type TeamAnalysisRateLayoutProps = {
  dailyRate: number | null,
  isEnergy: boolean,
  larger?: boolean,
  shrink?: boolean,
  icon?: React.ReactElement<NextImageProps>,
};

export const TeamAnalysisRateLayout = ({
  dailyRate,
  isEnergy,
  larger,
  shrink,
  icon,
}: TeamAnalysisRateLayoutProps) => {
  const t = useTranslations('UI.InPage.Pokedex');

  const isSpecial = larger || shrink;
  const titleClass = classNames(larger ? '' : 'text-xs', isEnergy ? 'text-energy' : '', 'whitespace-nowrap');
  const textClass = classNames(larger ? 'text-xl' : '', isEnergy ? 'text-energy' : '');

  return (
    <Flex direction="row" center noFullWidth={larger || shrink} className={classNames(
      'text-sm', larger ? 'gap-2' : 'gap-1',
    )}>
      {isSpecial &&
        <div className="relative h-8 w-8">
          {icon}
        </div>}
      <Flex
        direction={larger ? 'row' : 'col'} noFullWidth
        className={classNames('ml-auto justify-end', larger ? 'gap-3' : '')}
      >
        <Flex direction="row" className="items-center justify-end gap-1">
          <div className={titleClass}>
            {t('Stats.Energy.Daily')}
          </div>
          <div className={textClass}>
            {dailyRate ? formatFloat(dailyRate) : '-'}
          </div>
        </Flex>
        <Flex direction="row" className="items-center justify-end gap-1">
          <div className={titleClass}>
            {t('Stats.Energy.Weekly')}
          </div>
          <div className={textClass}>
            {dailyRate ? formatFloat(dailyRate * 7) : '-'}
          </div>
        </Flex>
      </Flex>
      {!isSpecial && icon ?
        <div className="relative h-8 w-8">
          {icon}
        </div>:
        <ColoredEnergyIcon dimension="h-8 w-8" alt={t('Stats.Energy.Name')}/>}
    </Flex>
  );
};
