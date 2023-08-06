import React from 'react';

import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {imageSmallIconSizes} from '@/styles/image';
import {IngredientId} from '@/types/mongo/ingredient';


type Props = {
  id: IngredientId | undefined,
};

export const PokemonIngredientLink = ({id}: Props) => {
  const t = useTranslations('Game.Food');

  if (id === undefined) {
    return <UnavailableIcon/>;
  }

  const ingredientName = t(id.toString());

  return (
    <Link href={`/ingredient/${id}`} className="button-clickable-bg p-1.5">
      <Flex direction="col" center className="gap-0.5">
        <div className="relative h-12 w-12">
          <NextImage src={`/images/ingredient/${id}.png`} alt={ingredientName} sizes={imageSmallIconSizes}/>
        </div>
        <div className="whitespace-nowrap text-sm">
          {ingredientName}
        </div>
      </Flex>
    </Link>
  );
};
