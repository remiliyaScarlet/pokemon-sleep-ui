import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {imageIconSizes} from '@/styles/image';
import {ProductionStatsSingle} from '@/ui/energy/analysis/result/type';


type Props = {
  stats: ProductionStatsSingle,
};

export const EnergyTotalProductionRate = ({stats}: Props) => {
  const {berry} = stats;

  const t = useTranslations('UI.InPage.Pokedex');

  return (
    <Flex direction="row" className="button-bg items-center justify-end gap-2 rounded-lg p-2">
      <Flex direction="row" noFullWidth className="items-center justify-end gap-1">
        <div>
          {t('Stats.Energy.Daily')}
        </div>
        <div className="text-xl">
          {berry.daily.toFixed(2)}
        </div>
      </Flex>
      <Flex direction="row" noFullWidth className="items-center justify-end gap-1">
        <div>
          {t('Stats.Energy.Weekly')}
        </div>
        <div className="text-xl">
          {berry.weekly.toFixed(2)}
        </div>
      </Flex>
      <div className="relative h-7 w-7">
        <Image src="/images/generic/energy.png" alt={t('Stats.Energy.Name')} fill sizes={imageIconSizes}/>
      </div>
    </Flex>
  );
};
