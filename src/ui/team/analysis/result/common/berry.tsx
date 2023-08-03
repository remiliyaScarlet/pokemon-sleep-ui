import React from 'react';

import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {ProductionRate} from '@/types/game/pokemon';
import {BerryId} from '@/types/mongo/berry';
import {TeamAnalysisRateLayoutWithQuantity} from '@/ui/team/analysis/result/common/rateLayoutWithQuantity';
import {TeamAnalysisRateLayoutCommonProps} from '@/ui/team/analysis/result/common/type';


type Props = TeamAnalysisRateLayoutCommonProps & {
  id: BerryId,
  rate: ProductionRate,
};

export const TeamAnalysisBerryRate = ({id, rate, highlight}: Props) => {
  const t = useTranslations('Game');

  return (
    <TeamAnalysisRateLayoutWithQuantity highlight={highlight} rate={rate} icon={
      <NextImage src={`/images/berry/${id}.png`} alt={t(`Berry.${id}`)} sizes={imageIconSizes}/>
    }/>
  );
};
