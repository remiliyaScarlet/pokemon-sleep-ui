import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokemonFilter} from '@/components/shared/pokemon/input/filter';
import {pokemonInputType} from '@/components/shared/pokemon/input/type';
import {MapInputEmptyRankToggle} from '@/ui/map/page/input/hideEmptyRank';
import {MapInputCommonProps} from '@/ui/map/page/input/type';
import {isNotNullish} from '@/utils/array';


export const MapInfoInput = (props: MapInputCommonProps) => {
  const {pokedexMap} = props;

  return (
    <Flex direction="col" className="gap-1 md:w-3/4">
      {pokemonInputType.map((type) => (
        <PokemonFilter
          key={type}
          type={type}
          filterKey={type}
          pokemon={Object.values(pokedexMap).filter(isNotNullish)}
          {...props}
        />
      ))}
      <MapInputEmptyRankToggle {...props}/>
    </Flex>
  );
};
