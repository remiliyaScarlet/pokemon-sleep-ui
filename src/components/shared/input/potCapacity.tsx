import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/text';
import {FilterInputOnClickProps} from '@/components/input/filter/type';
import {potPossibleCapacity} from '@/data/potCapacity';


type Props = FilterInputOnClickProps<number>;

export const PotCapacityInput = (props: Props) => {
  const t = useTranslations('UI.InPage.Cooking');

  return (
    <FilterTextInput
      title={t('PotCapacity')}
      ids={potPossibleCapacity}
      idToButton={(id) => id.toString()}
      {...props}
    />
  );
};
