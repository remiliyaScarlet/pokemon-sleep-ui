import React from 'react';

import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
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
      <div className="relative h-8 w-8 rounded-lg">
        <NextImage src={`/images/berry/${id}.png`} alt={t(`Berry.${id}`)} sizes={imageIconSizes}/>
      </div>
    </EnergyRateLayout>
  );
};
