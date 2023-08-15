import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokemonIconClickable} from '@/components/shared/pokemon/icon/clickable';
import {PokemonFilter} from '@/components/shared/pokemon/input/filter';
import {pokemonInputType} from '@/components/shared/pokemon/input/type';
import {PokemonId, PokemonInfo} from '@/types/mongo/pokemon';
import {usePokeboxPickerFilter} from '@/ui/team/pokebox/filter/hook';


type Props = {
  pokemon: PokemonInfo[],
  onClick: (pokemonId: PokemonId) => void,
};

export const PokeboxPickerInput = ({pokemon, onClick}: Props) => {
  const {
    filter,
    setFilter,
    isIncluded,
  } = usePokeboxPickerFilter({data: pokemon});

  return (
    <>
      <Flex direction="col" className="h-72 gap-1 overflow-x-hidden overflow-y-scroll pr-1 md:h-52">
        {pokemonInputType.map((type) => (
          <PokemonFilter
            key={type}
            type={type}
            pokemon={pokemon}
            filterKey={type}
            filter={filter}
            setFilter={setFilter}
            idPrefix="picker-"
          />
        ))}
      </Flex>
      <div className="h-80 overflow-y-scroll md:h-60 lg:h-40">
        <PokemonIconClickable pokemon={pokemon.filter(({id}) => isIncluded[id])} onClick={onClick}/>
      </div>
    </>
  );
};
