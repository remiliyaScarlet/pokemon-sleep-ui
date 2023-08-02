import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/text';
import {FilterInputOnClickProps} from '@/components/input/filter/type';


type Props = FilterInputOnClickProps<number> & {
  capacityPossibilities: number[],
};

export const PotCapacityInput = ({capacityPossibilities, ...props}: Props) => {
  const t = useTranslations('UI.InPage.Cooking');

  return (
    <FilterTextInput
      title={t('PotCapacity')}
      idToItemId={(id) => `PotCapacity-${id.toString()}`}
      ids={capacityPossibilities}
      idToButton={(id) => id.toString()}
      {...props}
    />
  );
};
