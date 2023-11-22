import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterInputOnClickProps} from '@/components/input/filter/common/type';
import {FilterTextInput} from '@/components/input/filter/preset/text';
import {potPossibleCapacity} from '@/data/potCapacity';


type Props = FilterInputOnClickProps<number>;

export const PotCapacityInput = (props: Props) => {
  const t = useTranslations('UI.InPage.Cooking');

  return (
    <FilterTextInput
      title={t('PotCapacity')}
      ids={potPossibleCapacity}
      idToText={(id) => id.toString()}
      {...props}
    />
  );
};
