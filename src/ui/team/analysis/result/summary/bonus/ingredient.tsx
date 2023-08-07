import React from 'react';

import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import {useTranslations} from 'next-intl';

import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {TeamAnalysisBonusSlider} from '@/ui/team/analysis/result/summary/bonus/base';
import {TeamAnalysisBonusProps} from '@/ui/team/analysis/result/summary/bonus/type';


export const TeamAnalysisIngredientBonusSlider = ({bonus, setBonus}: TeamAnalysisBonusProps) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <TeamAnalysisBonusSlider bonus={bonus} setBonus={setBonus} id="ingredient-bonus" min={0} max={150}>
      <GenericIngredientIcon dimension="h-6 w-6" alt={t('Ingredient')}/>
      <div className="h-6 w-6">
        <ChevronUpIcon/>
      </div>
    </TeamAnalysisBonusSlider>
  );
};
