import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PokemonIngredientLevelIcon} from '@/components/shared/pokemon/ingredients/levelIcon';
import {IngredientLevelIconCommonProps} from '@/components/shared/pokemon/ingredients/type';


export const PokemonIngredientTypeTitle = (props: IngredientLevelIconCommonProps) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <Flex direction="row" noFullWidth center className="gap-1">
      <div>{t('Ingredient')}</div>
      <PokemonIngredientLevelIcon {...props}/>
    </Flex>
  );
};
