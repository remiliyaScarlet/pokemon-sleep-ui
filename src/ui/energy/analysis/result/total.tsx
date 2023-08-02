import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {imageSmallIconSizes} from '@/styles/image';
import {EnergyAnalysisIngredientBonusSlider} from '@/ui/energy/analysis/result/bonus/ingredient';
import {EnergyAnalysisOverallBonusSlider} from '@/ui/energy/analysis/result/bonus/overall';
import {EnergyFinalEstimate} from '@/ui/energy/analysis/result/finalEstimate';
import {EnergyRateLayout} from '@/ui/energy/analysis/result/rate';
import {EnergyProductionStats} from '@/ui/energy/analysis/result/type';
import {EnergyAnalysisBonus, EnergyAnalysisDataProps} from '@/ui/energy/analysis/type';


type Props = Pick<EnergyAnalysisDataProps, 'snorlaxRankData'> & {
  bonus: EnergyAnalysisBonus,
  setBonus: (newBonus: EnergyAnalysisBonus) => void,
  stats: EnergyProductionStats,
};

export const EnergyTotalProductionRate = ({stats, snorlaxRankData, bonus, setBonus}: Props) => {
  const {berry, ingredient} = stats.total;

  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <Flex direction="col" className="button-bg items-center justify-end gap-4 rounded-lg p-2 md:flex-row">
      <Flex direction="col">
        <EnergyAnalysisIngredientBonusSlider
          bonus={bonus.ingredient}
          setBonus={(ingredient) => setBonus({...bonus, ingredient})}
        />
        <EnergyAnalysisOverallBonusSlider
          bonus={bonus.overall}
          setBonus={(overall) => setBonus({...bonus, overall})}
        />
      </Flex>
      <Flex direction="col" className="gap-1.5">
        <Flex direction="row" noFullWidth className="justify-end gap-x-8 gap-y-1.5">
          <EnergyRateLayout shrink rate={ingredient}>
            <div className="relative h-8 w-8">
              <NextImage src="/images/generic/ingredient.png" alt={t('Ingredient')} sizes={imageSmallIconSizes}/>
            </div>
          </EnergyRateLayout>
          <EnergyRateLayout shrink rate={berry}>
            <div className="relative h-8 w-8">
              <NextImage src="/images/generic/berry.png" alt={t('Berry')} sizes={imageSmallIconSizes}/>
            </div>
          </EnergyRateLayout>
        </Flex>
        <Flex direction="row" className="justify-end">
          <EnergyRateLayout larger rate={stats.overall}/>
        </Flex>
        <HorizontalSplitter/>
        <EnergyFinalEstimate energyRate={stats.overall} snorlaxRankData={snorlaxRankData}/>
      </Flex>
    </Flex>
  );
};
