import React from 'react';

import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {imageSmallIconSizes} from '@/styles/image';
import {EnergyAnalysisBonusSlider} from '@/ui/energy/analysis/result/bonus/base';
import {EnergyAnalysisBonusProps} from '@/ui/energy/analysis/result/bonus/type';


export const EnergyAnalysisIngredientBonusSlider = ({bonus, setBonus}: EnergyAnalysisBonusProps) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <EnergyAnalysisBonusSlider bonus={bonus} setBonus={setBonus} id="ingredient-bonus" min={0} max={150}>
      <div className="relative h-6 w-6">
        <NextImage
          src="/images/generic/ingredient.png" alt={t('Ingredient')}
          sizes={imageSmallIconSizes} className="invert-on-light"
        />
      </div>
      <div className="h-6 w-6">
        <ChevronUpIcon/>
      </div>
    </EnergyAnalysisBonusSlider>
  );
};
