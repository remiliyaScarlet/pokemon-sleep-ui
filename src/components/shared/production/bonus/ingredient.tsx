import React from 'react';

import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import {useTranslations} from 'next-intl';

import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {BonusSlider} from '@/components/shared/production/bonus/base';
import {BonusSliderProps} from '@/components/shared/production/bonus/type';


export const IngredientBonusSlider = (props: BonusSliderProps) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <BonusSlider min={0} max={300} {...props}>
      <GenericIngredientIcon dimension="h-6 w-6" alt={t('Ingredient')}/>
      <div className="h-6 w-6">
        <ChevronUpIcon/>
      </div>
    </BonusSlider>
  );
};
