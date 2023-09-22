import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import Link from 'next-intl/link';

import {PokemonIngredientIconContent} from '@/components/shared/pokemon/ingredients/iconContent';
import {IngredientIconCommonProps} from '@/components/shared/pokemon/ingredients/type';


type Props = IngredientIconCommonProps & {
  id: number | null,
};

export const PokemonIngredientIcon = (props: Props) => {
  const {dimension, noLink, id} = props;

  if (id === null) {
    return (
      <div className={dimension ?? 'h-5 w-5'}>
        <XCircleIcon/>
      </div>
    );
  }

  if (noLink) {
    return <PokemonIngredientIconContent {...props} id={id}/>;
  }

  return (
    <Link href={`/ingredient/${id}`} tabIndex={-1}>
      <PokemonIngredientIconContent {...props} id={id} clickableStyle/>
    </Link>
  );
};
