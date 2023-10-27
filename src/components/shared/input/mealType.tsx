import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/text';
import {FilterInputOnClickProps} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex/common';
import {mealTypeDotStyle} from '@/styles/classes';
import {MealTypeId} from '@/types/game/meal/main';


type Props = FilterInputOnClickProps<MealTypeId> & {
  mealTypes: MealTypeId[],
};

export const MealTypeInput = ({mealTypes, ...props}: Props) => {
  const t = useTranslations('UI.InPage.Cooking');
  const t2 = useTranslations('Game.MealType');

  return (
    <FilterTextInput
      style="highlight"
      title={t('MealType')}
      idToItemId={(id) => `MealType-${id}`}
      ids={mealTypes}
      idToButton={(id) => (
        <Flex direction="row" className="gap-1" center>
          <div className={clsx('h-3 w-3 rounded-full', mealTypeDotStyle[id])}/>
          <div>{t2(id.toString())}</div>
        </Flex>
      )}
      {...props}
    />
  );
};
