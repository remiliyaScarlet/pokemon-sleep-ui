import React from 'react';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex';
import {PokemonId} from '@/types/mongo/pokemon';
import {PokedexData} from '@/ui/pokedex/index/type';


type Props = {
  data: PokedexData,
  inclusionMap: FilterInclusionMap<PokemonId>,
};

export const PokedexResultCount = ({data, inclusionMap}: Props) => {
  const selected = Object.values(inclusionMap).filter((included) => included).length;
  const total = data.length;

  return (
    <Flex direction="row" className="justify-end gap-1">
      <div>{selected}</div>
      <div>/</div>
      <div>{total}</div>
      <div>({(selected / total * 100).toFixed(2)}%)</div>
    </Flex>
  );
};
