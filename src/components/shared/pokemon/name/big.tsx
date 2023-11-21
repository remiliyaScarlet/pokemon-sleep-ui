import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PokemonTypeIcon} from '@/components/shared/icon/pokeType';
import {PokemonNameProps} from '@/components/shared/pokemon/name/type';


export const PokemonNameBig = ({pokemon, override}: PokemonNameProps) => {
  const {type, id} = pokemon;
  const t = useTranslations('Game');

  return (
    <Flex direction="row" center className="gap-1 p-2.5 text-2xl">
      <PokemonTypeIcon type={type} dimension="h-8 w-8"/>
      <div className="truncate">
        {override ?? t(`PokemonName.${id}`)}
      </div>
      <div className="self-end text-sm text-slate-500">
        #{id}
      </div>
    </Flex>
  );
};
