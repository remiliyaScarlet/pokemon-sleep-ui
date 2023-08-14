import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonNameProps} from '@/components/shared/pokemon/name/type';
import {imageSmallIconSizes} from '@/styles/image';


export const PokemonNameSmall = ({pokemon, override}: PokemonNameProps) => {
  const {type, id} = pokemon;
  const t = useTranslations('Game');

  return (
    <Flex direction="row" center className="justify-center gap-1 text-lg">
      <div className="relative h-6 w-6">
        <NextImage src={`/images/type/${type}.png`} alt={t(`PokemonType.${type}`)} sizes={imageSmallIconSizes}/>
      </div>
      <div>
        {override ?? t(`PokemonName.${id}`)}
      </div>
      <div className="self-end text-xs text-slate-500">
        #{id}
      </div>
    </Flex>
  );
};
