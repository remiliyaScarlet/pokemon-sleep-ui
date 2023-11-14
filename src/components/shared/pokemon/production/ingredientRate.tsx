import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {Dimension} from '@/types/style';
import {formatFloat, formatFloat3} from '@/utils/number/format';


type Props = {
  split: number,
  noIcon?: boolean,
  dimension?: Dimension,
};

export const PokemonIngredientRate = ({split, noIcon, dimension}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex.Sort');

  return (
    <Flex direction="row" noFullWidth className="items-center gap-1">
      {!noIcon && <GenericIngredientIcon alt={t('IngredientRate')} dimension={dimension}/>}
      <span>
        {formatFloat(split * 100)}% (<span className="text-xs">1:</span>{formatFloat3(1 / split)})
      </span>
    </Flex>
  );
};
