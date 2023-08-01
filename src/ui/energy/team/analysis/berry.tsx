import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {imageIconSizes} from '@/styles/image';
import {ProductionRate} from '@/types/game/pokemon';
import {BerryData} from '@/types/mongo/berry';


type Props = {
  berryData: BerryData,
  rate: ProductionRate,
};

export const EnergyAnalysisOnBerry = ({berryData, rate}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex');
  const t2 = useTranslations('Game');

  const {id} = berryData;

  return (
    <Flex direction="row" center className="gap-1.5 text-sm">
      <Link href={`/images/berry/${id}.png`} className="button-clickable-bg">
        <div className="relative h-8 w-8">
          <Image
            src={`/images/berry/${id}.png`} alt={t2(`Berry.${id}`)}
            fill sizes={imageIconSizes}
          />
        </div>
      </Link>
      <Flex direction="col" noFullWidth className="ml-auto justify-end">
        <Flex direction="row" noFullWidth className="items-center justify-end gap-1">
          <div className="text-xs">
            {t('Stats.Energy.Daily')}
          </div>
          <div>
            {rate.daily.toFixed(2)}
          </div>
        </Flex>
        <Flex direction="row" noFullWidth className="items-center justify-end gap-1">
          <div className="text-xs">
            {t('Stats.Energy.Weekly')}
          </div>
          <div>
            {rate.weekly.toFixed(2)}
          </div>
        </Flex>
      </Flex>
      <div className="relative h-7 w-7">
        <Image src="/images/generic/energy.png" alt={t('Stats.Energy.Name')} fill sizes={imageIconSizes}/>
      </div>
    </Flex>
  );
};
