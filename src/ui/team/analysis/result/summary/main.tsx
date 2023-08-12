import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {GenericBerryIcon} from '@/components/shared/icon/berry';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {TeamAnalysisRateLayout} from '@/ui/team/analysis/result/common/rateLayout';
import {TeamAnalysisIngredientBonusSlider} from '@/ui/team/analysis/result/summary/bonus/ingredient';
import {TeamAnalysisOverallBonusSlider} from '@/ui/team/analysis/result/summary/bonus/overall';
import {TeamAnalysisFinalEstimate} from '@/ui/team/analysis/result/summary/finalEstimate';
import {TeamProducingStats} from '@/ui/team/analysis/result/type';
import {TeamAnalysisBonus, TeamAnalysisDataProps} from '@/ui/team/analysis/type';


type Props = Pick<TeamAnalysisDataProps, 'snorlaxRankData'> & {
  bonus: TeamAnalysisBonus,
  setBonus: (newBonus: TeamAnalysisBonus) => void,
  stats: TeamProducingStats,
};

export const TeamAnalysisSummary = ({stats, snorlaxRankData, bonus, setBonus}: Props) => {
  const {berry, ingredient} = stats.total;

  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <Flex direction="col" className="button-bg items-center justify-end gap-4 rounded-lg p-2 md:flex-row">
      <Flex direction="col">
        <TeamAnalysisIngredientBonusSlider
          bonus={bonus.ingredient}
          setBonus={(ingredient) => setBonus({...bonus, ingredient})}
        />
        <TeamAnalysisOverallBonusSlider
          bonus={bonus.overall}
          setBonus={(overall) => setBonus({...bonus, overall})}
        />
      </Flex>
      <Flex direction="col" className="gap-1.5">
        <Flex direction="col" className="lg:flex-row">
          <Flex direction="row" noFullWidth className="justify-end gap-x-8 gap-y-1.5">
            <TeamAnalysisRateLayout
              shrink isEnergy dailyRate={berry.dailyEnergy}
              icon={<GenericBerryIcon alt={t('Berry')} noWrap/>}
            />
            <TeamAnalysisRateLayout
              shrink isEnergy dailyRate={ingredient?.dailyEnergy ?? null}
              icon={<GenericIngredientIcon alt={t('Ingredient')} noWrap/>}
            />
          </Flex>
          <Flex direction="row" className="justify-end">
            <TeamAnalysisRateLayout larger isEnergy dailyRate={stats.overall.dailyEnergy}/>
          </Flex>
        </Flex>
        <HorizontalSplitter/>
        <TeamAnalysisFinalEstimate energyRate={stats.overall} snorlaxRankData={snorlaxRankData}/>
      </Flex>
    </Flex>
  );
};
