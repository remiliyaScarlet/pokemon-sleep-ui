import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {PokemonNameProps} from '@/components/shared/pokemon/name/type';


export const PokemonNameSimple = ({pokemon, override}: PokemonNameProps) => {
  const {type, id} = pokemon;
  const t = useTranslations('Game');

  return (
    <Flex direction="row" center className="gap-0.5">
      <GenericIcon
        alt={t(`PokemonType.${type}`)}
        src={`/images/type/${type}.png`}
        dimension="h-5 w-5"
        noInvert
        noShrink
        dropShadow
      />
      <div className="truncate">
        {override ?? t(`PokemonName.${id}`)}
      </div>
      <div className="self-end text-sm text-slate-500">
        #{id}
      </div>
    </Flex>
  );
};
