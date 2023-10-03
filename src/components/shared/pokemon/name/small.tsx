import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonNameProps} from '@/components/shared/pokemon/name/type';
import {PokemonSleepTypeIcon} from '@/components/shared/pokemon/sleepType/icon';
import {PokemonSpecialtyIcon} from '@/components/shared/pokemon/specialty/icon';
import {imageSmallIconSizes} from '@/styles/image';


export const PokemonNameSmall = ({pokemon, override}: PokemonNameProps) => {
  const {id, type, sleepType, specialty} = pokemon;
  const t = useTranslations('Game');

  return (
    <Flex direction="row" noFullWidth className="items-center gap-1 text-lg">
      <div className="relative h-6 w-6">
        <NextImage src={`/images/type/${type}.png`} alt={t(`PokemonType.${type}`)} sizes={imageSmallIconSizes}/>
      </div>
      <PokemonSleepTypeIcon sleepType={sleepType} dimension="h-4 w-4" className="invert-hoverable-dark"/>
      <PokemonSpecialtyIcon specialty={specialty} dimension="h-4 w-4" className="invert-hoverable-dark"/>
      <div className="truncate">
        {override ?? t(`PokemonName.${id}`)}
      </div>
      <div className="self-end text-xs text-slate-500">
        #{id}
      </div>
    </Flex>
  );
};
