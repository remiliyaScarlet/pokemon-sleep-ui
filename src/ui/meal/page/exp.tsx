'use client';
import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {Slider} from '@/components/input/slider';
import {Flex} from '@/components/layout/flex';
import {imageIconSizes} from '@/styles/image';
import {Meal} from '@/types/mongo/meal';


export const MealExp = ({id, levels}: Meal) => {
  const t = useTranslations('UI.InPage.Cooking');
  const [levelIndex, setLevelIndex] = React.useState(0);

  const current = levels[levelIndex];

  return (
    <Flex direction="col" className="gap-1">
      <Flex direction="row">
        <Flex direction="row" className="gap-1">
          <div className="whitespace-nowrap">
            {t('RecipeLevel')}
          </div>
          <div>
            {current.lv}
          </div>
        </Flex>
        <Flex direction="row" className="ml-auto items-center justify-end gap-1">
          <div className="relative h-5 w-5">
            <Image src="/images/generic/energy.png" alt={t('Energy')} fill sizes={imageIconSizes}/>
          </div>
          <div>
            {current.energy}
          </div>
        </Flex>
      </Flex>
      <Slider
        id={`metaExp-${id}`}
        value={levelIndex}
        setValue={setLevelIndex}
        min={0}
        max={levels.length - 1}
      />
    </Flex>
  );
};
