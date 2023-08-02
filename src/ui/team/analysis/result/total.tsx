import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {imageSmallIconSizes} from '@/styles/image';
import {TeamAnalysisIngredientBonusSlider} from '@/ui/team/analysis/result/bonus/ingredient';
import {TeamAnalysisOverallBonusSlider} from '@/ui/team/analysis/result/bonus/overall';
import {TeamFinalEstimate} from '@/ui/team/analysis/result/finalEstimate';
import {TeamRateLayout} from '@/ui/team/analysis/result/rate';
import {TeamProductionStats} from '@/ui/team/analysis/result/type';
import {TeamAnalysisBonus, TeamAnalysisDataProps} from '@/ui/team/analysis/type';


type Props = Pick<TeamAnalysisDataProps, 'snorlaxRankData'> & {
  bonus: TeamAnalysisBonus,
  setBonus: (newBonus: TeamAnalysisBonus) => void,
  stats: TeamProductionStats,
};

export const TeamTotalProductionRate = ({stats, snorlaxRankData, bonus, setBonus}: Props) => {
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
        <Flex direction="row" noFullWidth className="justify-end gap-x-8 gap-y-1.5">
          <TeamRateLayout shrink rate={ingredient}>
            <div className="relative h-8 w-8">
              <NextImage src="/images/generic/ingredient.png" alt={t('Ingredient')} sizes={imageSmallIconSizes}/>
            </div>
          </TeamRateLayout>
          <TeamRateLayout shrink rate={berry}>
            <div className="relative h-8 w-8">
              <NextImage src="/images/generic/berry.png" alt={t('Berry')} sizes={imageSmallIconSizes}/>
            </div>
          </TeamRateLayout>
        </Flex>
        <Flex direction="row" className="justify-end">
          <TeamRateLayout larger rate={stats.overall}/>
        </Flex>
        <HorizontalSplitter/>
        <TeamFinalEstimate energyRate={stats.overall} snorlaxRankData={snorlaxRankData}/>
      </Flex>
    </Flex>
  );
};
