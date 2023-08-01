import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {imageSmallIconSizes} from '@/styles/image';
import {EnergyRateLayout} from '@/ui/energy/analysis/result/rate';
import {ProductionStats} from '@/ui/energy/analysis/result/type';


type Props = {
  stats: ProductionStats,
};

export const EnergyTotalProductionRate = ({stats}: Props) => {
  const {berry, ingredient} = stats.total;

  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <Flex direction="col" className="button-bg items-center justify-end gap-4 rounded-lg p-2">
      <Flex direction="row" wrap className="justify-end gap-x-8 gap-y-2">
        <EnergyRateLayout shrink rate={ingredient}>
          <div className="relative h-8 w-8">
            <Image src="/images/generic/ingredient.png" alt={t('Ingredient')} fill sizes={imageSmallIconSizes}/>
          </div>
        </EnergyRateLayout>
        <EnergyRateLayout shrink rate={berry}>
          <div className="relative h-8 w-8">
            <Image src="/images/generic/berry.png" alt={t('Berry')} fill sizes={imageSmallIconSizes}/>
          </div>
        </EnergyRateLayout>
      </Flex>
      <Flex direction="row" className="justify-end">
        <EnergyRateLayout larger rate={stats.overall}/>
      </Flex>
    </Flex>
  );
};
