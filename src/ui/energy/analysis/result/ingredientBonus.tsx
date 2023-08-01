import React from 'react';

import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {Slider} from '@/components/input/slider';
import {Flex} from '@/components/layout/flex';
import {imageSmallIconSizes} from '@/styles/image';
import {IngredientBonusProps} from '@/ui/energy/analysis/result/type';


export const EnergyAnalysisIngredientBonusSlider = ({bonusPercent, setBonusPercent}: IngredientBonusProps) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <Flex direction="col" className="gap-2 p-1">
      <Flex direction="row" className="items-center justify-end gap-2">
        <Flex direction="row" noFullWidth>
          <div className="relative h-6 w-6">
            <Image src="/images/generic/ingredient.png" alt={t('Ingredient')} fill sizes={imageSmallIconSizes}/>
          </div>
          <div className="h-6 w-6">
            <ChevronUpIcon/>
          </div>
        </Flex>
        <InputBox
          id="ingredient-bonus"
          type="number"
          min={0}
          max={150}
          className="w-16 text-center"
          value={bonusPercent}
          onChange={({target}) => setBonusPercent(Number(target.value))}
        />
        <div>
          %
        </div>
      </Flex>
      <Slider
        id="ingredient-bonus-slider"
        value={bonusPercent}
        setValue={setBonusPercent}
        min={0}
        max={150}
      />
    </Flex>
  );
};
