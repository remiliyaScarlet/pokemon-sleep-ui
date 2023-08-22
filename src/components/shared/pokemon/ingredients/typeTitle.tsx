import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PokemonIngredientTypeIcon} from '@/components/shared/pokemon/ingredients/typeIcon';
import {PokemonIngredientType} from '@/types/game/pokemon';


type Props = {
  type: PokemonIngredientType,
};

export const PokemonIngredientTypeTitle = ({type}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <Flex direction="row" center className="gap-1.5">
      <div className="h-5 w-5">
        <PokemonIngredientTypeIcon type={type}/>
      </div>
      <div>{t('Ingredient')}</div>
    </Flex>
  );
};
