import React from 'react';

import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {ProducingRate} from '@/types/game/producing/rate';
import {BerryId} from '@/types/mongo/berry';
import {TeamAnalysisRateLayoutWithQuantity} from '@/ui/team/analysis/result/common/rateLayoutWithQuantity';
import {TeamAnalysisRateLayoutCommonProps} from '@/ui/team/analysis/result/common/type';


type Props = TeamAnalysisRateLayoutCommonProps & {
  id: BerryId,
  rate: ProducingRate,
};

export const TeamAnalysisBerryRate = ({id, rate, highlight}: Props) => {
  const t = useTranslations('Game');

  return (
    <TeamAnalysisRateLayoutWithQuantity highlight={highlight} rate={rate} icon={
      <NextImage src={`/images/berry/${id}.png`} alt={t(`Berry.${id}`)} sizes={imageIconSizes}/>
    }/>
  );
};
