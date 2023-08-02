import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {ProductionRate} from '@/types/game/pokemon';
import {formatFloat} from '@/utils/number';
import {classNames} from '@/utils/react';


type Props = {
  rate: ProductionRate,
  larger?: boolean,
  shrink?: boolean,
};

export const EnergyRateLayout = ({rate, larger, shrink, children}: React.PropsWithChildren<Props>) => {
  const t = useTranslations('UI.InPage.Pokedex');

  const titleClass = classNames(larger ? '' : 'text-xs', 'whitespace-nowrap');
  const textClass = larger ? 'text-xl' : '';

  return (
    <Flex direction="row" center noFullWidth={larger || shrink} className="gap-2 text-sm">
      {children}
      <Flex
        direction={larger ? 'row' : 'col'} noFullWidth
        className={classNames('ml-auto justify-end', larger ? 'gap-2' : '')}
      >
        <Flex direction="row" className="items-center justify-end gap-1">
          <div className={titleClass}>
            {t('Stats.Energy.Daily')}
          </div>
          <div className={textClass}>
            {formatFloat(rate.daily)}
          </div>
        </Flex>
        <Flex direction="row" className="items-center justify-end gap-1">
          <div className={titleClass}>
            {t('Stats.Energy.Weekly')}
          </div>
          <div className={textClass}>
            {formatFloat(rate.weekly)}
          </div>
        </Flex>
      </Flex>
      <div className="relative h-7 w-7">
        <NextImage src="/images/generic/energy.png" alt={t('Stats.Energy.Name')} sizes={imageIconSizes}/>
      </div>
    </Flex>
  );
};
