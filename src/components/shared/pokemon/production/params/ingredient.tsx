import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {PokemonProducingParamsCommonProps} from '@/components/shared/pokemon/production/params/type';
import {getProducingParamsSectionStyle} from '@/components/shared/pokemon/production/params/utils';
import {formatFloat, formatFloat3} from '@/utils/number/format';


export const PokemonIngredientRate = ({params, noIcon, dimension}: PokemonProducingParamsCommonProps) => {
  const {ingredientSplit} = params;

  const t = useTranslations('UI.InPage.Pokedex.Sort');

  return (
    <Flex direction="row" noFullWidth className={getProducingParamsSectionStyle(params)}>
      {!noIcon && <GenericIngredientIcon alt={t('IngredientRate')} dimension={dimension}/>}
      <span>
        {formatFloat(ingredientSplit * 100)}%
        (<span className="text-xs">1:</span>{formatFloat3(1 / ingredientSplit)})
      </span>
    </Flex>
  );
};
