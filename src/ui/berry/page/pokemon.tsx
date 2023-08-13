import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokemonIconsBerryStats} from '@/components/shared/pokemon/icon/berryStats';
import {BerryPageCommonProps} from '@/ui/berry/page/type';


type Props = BerryPageCommonProps & {
  level: number,
};

export const BerryProducingRatesOfPokemon = ({pokemonOfBerry, level, berryData}: Props) => {
  return (
    <Flex direction="row" wrap className="info-section">
      <PokemonIconsBerryStats data={pokemonOfBerry} level={level} berryData={berryData}/>
    </Flex>
  );
};
