import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {imageSmallIconSizes} from '@/styles/image';
import {TeamAnalysisBerryRate} from '@/ui/team/analysis/result/common/berry';
import {TeamAnalysisIngredientRate} from '@/ui/team/analysis/result/common/ingredient';
import {TeamAnalysisCategorySummary} from '@/ui/team/analysis/result/summary/grouped/category';
import {TeamProductionStatsGrouped} from '@/ui/team/analysis/result/type';


type Props = {
  grouped: TeamProductionStatsGrouped,
};

export const TeamAnalysisGroupedSummary = ({grouped}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <Flex direction="col" className="button-bg gap-2 rounded-lg p-2">
      <TeamAnalysisCategorySummary
        icon={
          <NextImage
            src="/images/generic/ingredient.png" alt={t('Ingredient')}
            sizes={imageSmallIconSizes} className="invert-on-light"
          />
        }
        data={Object.entries(grouped.berry).map(([id, rate]) => ({id: Number(id), rate}))}
        getReactNode={(id, rate) => <TeamAnalysisBerryRate key={id} id={Number(id)} rate={rate}/>}
      />
      <HorizontalSplitter/>
      <TeamAnalysisCategorySummary
        icon={
          <NextImage
            src="/images/generic/berry.png" alt={t('Berry')}
            sizes={imageSmallIconSizes} className="invert-on-light"
          />
        }
        data={Object.entries(grouped.ingredient).map(([id, rate]) => ({id: Number(id), rate}))}
        getReactNode={(id, rate) => <TeamAnalysisIngredientRate key={id} id={Number(id)} rate={rate}/>}
      />
    </Flex>
  );
};
