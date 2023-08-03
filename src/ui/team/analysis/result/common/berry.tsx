import React from 'react';

import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {ProductionRate} from '@/types/game/pokemon';
import {BerryId} from '@/types/mongo/berry';
import {TeamAnalysisRateLayoutWithQuantity} from '@/ui/team/analysis/result/common/rateLayoutWithQuantity';


type Props = {
  id: BerryId,
  rate: ProductionRate,
};

export const TeamAnalysisBerryRate = ({id, rate}: Props) => {
  const t = useTranslations('Game');

  return (
    <TeamAnalysisRateLayoutWithQuantity rate={rate} icon={
      <NextImage src={`/images/berry/${id}.png`} alt={t(`Berry.${id}`)} sizes={imageIconSizes}/>
    }/>
  );
};
