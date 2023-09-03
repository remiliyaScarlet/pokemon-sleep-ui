import React from 'react';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonProducingRateSingle} from '@/components/shared/pokemon/production/single';
import {imageSmallIconSizes} from '@/styles/image';
import {BerryData} from '@/types/game/berry';
import {EffectiveBonus} from '@/types/game/bonus';
import {PokemonInfo} from '@/types/game/pokemon';
import {getBerryProducingRate} from '@/utils/game/producing/berry';
import {defaultNeutralOpts} from '@/utils/game/producing/const';


type Props = {
  pokemon: PokemonInfo,
  level: number,
  berryName: string,
  berryData: BerryData,
  bonus: EffectiveBonus,
};

export const PokemonBerryProduction = ({pokemon, level, berryName, berryData, bonus}: Props) => {
  const {berry} = pokemon;

  const atLevel = getBerryProducingRate({
    level,
    pokemon,
    ...defaultNeutralOpts,
    berryData,
    bonus,
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
