'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonProducingRate} from '@/components/shared/pokemon/rate/main';
import {imageSmallIconSizes} from '@/styles/image';
import {BerryData} from '@/types/game/berry';
import {PokemonInfo} from '@/types/game/pokemon';
import {getBerryProducingRate} from '@/utils/game/producing/berry';
import {defaultNeutralOpts} from '@/utils/game/producing/const';


type Props = {
  pokemon: PokemonInfo,
  berryName: string,
  berryData: BerryData,
  level: number,
};

export const PokemonBerryMeta = ({pokemon, berryName, berryData, level}: Props) => {
  const {berry} = pokemon;

  const atLevel = getBerryProducingRate({
    level,
    pokemon,
    ...defaultNeutralOpts,
    berryData,
    snorlaxFavorite: {},
  });

  return (
    <Flex direction="col" center className="gap-1">
      <Flex direction="row" center className="gap-1">
        <PokemonBerryIcon id={berry.id} dimension="h-10 w-10"/>
        <div className="whitespace-nowrap text-lg">
          {berryName} &times; {berry.quantity}
        </div>
      </Flex>
      <Flex direction="col" className="gap-1">
        <PokemonProducingRateSingle
          simplified
          horizontal
          rate={atLevel}
          icon={<NextImage src={`/images/berry/${berry.id}.png`} alt={berryName} sizes={imageSmallIconSizes}/>}
        />
      </Flex>
    </Flex>
  );
};
