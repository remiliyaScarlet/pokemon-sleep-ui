import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageSmallIconSizes} from '@/styles/image';
import {EnergyAnalysisIngredientBonusSlider} from '@/ui/energy/analysis/result/ingredientBonus';
import {EnergyRateLayout} from '@/ui/energy/analysis/result/rate';
import {IngredientBonusProps, ProductionStats} from '@/ui/energy/analysis/result/type';


type Props = IngredientBonusProps & {
  stats: ProductionStats,
};

export const EnergyTotalProductionRate = ({stats, ...props}: Props) => {
  const {berry, ingredient} = stats.total;

  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <Flex direction="col" className="button-bg items-center justify-end gap-4 rounded-lg p-2 md:flex-row">
      <Flex direction="col">
        <EnergyAnalysisIngredientBonusSlider {...props}/>
      </Flex>
      <Flex direction="col">
        <Flex direction="row" noFullWidth wrap className="justify-end gap-x-8 gap-y-2">
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
      </Flex>
    </Flex>
  );
};
