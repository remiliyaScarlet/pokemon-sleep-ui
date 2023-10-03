import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {formatFloat, formatFloat3} from '@/utils/number';


type Props = {
  split: number,
  noIcon?: boolean,
};

export const PokemonIngredientRate = ({split, noIcon}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex.Sort');

  return (
    <Flex direction="row" noFullWidth className="items-center gap-1">
      {!noIcon && <GenericIngredientIcon alt={t('IngredientRate')}/>}
      <span>
        {formatFloat(split * 100)}% (<span className="text-xs">1:</span>{formatFloat3(1 / split)})
      </span>
    </Flex>
  );
};
