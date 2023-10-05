import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {GenericBerryIcon} from '@/components/shared/icon/berry';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {TeamAnalysisBerryRate} from '@/ui/team/analysis/setup/common/berry';
import {TeamAnalysisIngredientRate} from '@/ui/team/analysis/setup/common/ingredient';
import {TeamAnalysisCategorySummary} from '@/ui/team/analysis/setup/summary/grouped/category';
import {TeamProducingStatsGrouped} from '@/ui/team/analysis/setup/type';


type Props = {
  grouped: TeamProducingStatsGrouped,
};

export const TeamAnalysisGroupedSummary = ({grouped}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <Flex className="button-bg gap-2 rounded-lg p-2">
      <TeamAnalysisCategorySummary
        icon={<GenericBerryIcon alt={t('Berry')} noWrap/>}
        data={Object.entries(grouped.berry).map(([id, rate]) => ({id: Number(id), rate}))}
        getReactNode={(id, rate) => (
          <div className="px-4">
            <TeamAnalysisBerryRate key={id} id={Number(id)} rate={rate}/>
          </div>
        )}
      />
      <HorizontalSplitter/>
      <TeamAnalysisCategorySummary
        icon={<GenericIngredientIcon alt={t('Ingredient')} noWrap/>}
        data={Object.entries(grouped.ingredient).map(([id, rate]) => ({id: Number(id), rate}))}
        getReactNode={(id, rate) => (
          <div className="px-4">
            <TeamAnalysisIngredientRate key={id} id={Number(id)} rate={rate}/>
          </div>
        )}
      />
    </Flex>
  );
};
