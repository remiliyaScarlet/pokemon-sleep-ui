import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {imageIconSizes} from '@/styles/image';
import {ProductionRate} from '@/types/game/pokemon';
import {BerryId} from '@/types/mongo/berry';
import {EnergyRateLayout} from '@/ui/energy/analysis/result/rate';


type Props = {
  id: BerryId,
  rate: ProductionRate,
};

export const EnergyAnalysisOnBerry = ({id, rate}: Props) => {
  const t = useTranslations('Game');

  return (
    <EnergyRateLayout rate={rate}>
      <div className="button-bg relative h-8 w-8 rounded-lg">
        <Image
          src={`/images/berry/${id}.png`} alt={t(`Berry.${id}`)}
          fill sizes={imageIconSizes}
        />
      </div>
    </EnergyRateLayout>
  );
};
