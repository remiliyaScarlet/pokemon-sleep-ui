import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {PokemonNameProps} from '@/components/shared/pokemon/name/type';


export const PokemonNameSmall = ({pokemon, override}: PokemonNameProps) => {
  const {id, type} = pokemon;
  const t = useTranslations('Game');

  return (
    <Flex direction="row" noFullWidth className="items-center gap-1 text-lg">
      <GenericIcon
        alt={t(`PokemonType.${type}`)}
        src={`/images/type/${type}.png`}
        dimension="h-6 w-6"
        noInvert
        noShrink
        dropShadow
      />
      <div className="truncate">
        {override ?? t(`PokemonName.${id}`)}
      </div>
      <div className="self-end text-xs text-slate-500">
        #{id}
      </div>
    </Flex>
  );
};
