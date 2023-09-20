import React from 'react';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonProducingRateSingle} from '@/components/shared/pokemon/production/single';
import {imageSmallIconSizes} from '@/styles/image';
import {PokemonInfo} from '@/types/game/pokemon';
import {ProducingRateOfItem} from '@/types/game/producing/rate';


type Props = {
  pokemon: PokemonInfo,
  berryName: string,
  rate: ProducingRateOfItem,
};

export const PokemonBerryProduction = ({pokemon, berryName, rate}: Props) => {
  const {berry} = pokemon;

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
          horizontal
          rate={rate}
          icon={<NextImage src={`/images/berry/${berry.id}.png`} alt={berryName} sizes={imageSmallIconSizes}/>}
        />
      </Flex>
    </Flex>
  );
};
