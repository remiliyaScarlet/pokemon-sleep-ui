import React from 'react';

import {FilterInputRow} from '@/components/input/filter/inputRow';
import {Flex} from '@/components/layout/flex';
import {PokemonFilter} from '@/components/shared/pokemon/input/filter';
import {pokemonInputType} from '@/components/shared/pokemon/input/type';
import {MapInputEmptyRankToggle} from '@/ui/map/page/input/hideEmptyRank';
import {MapInputSleepStyleToggle} from '@/ui/map/page/input/styleIndex';
import {MapInputCommonProps} from '@/ui/map/page/input/type';
import {toUnique} from '@/utils/array';
import {isNotNullish} from '@/utils/type';


export const MapInfoInput = (props: MapInputCommonProps) => {
  const {filter, setFilter, pokedexMap, sleepStyles} = props;

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
      <MapInputSleepStyleToggle
        sleepStyles={toUnique(sleepStyles.map(({style}) => style.style))}
        filter={filter}
        setFilter={setFilter}
      />
      <FilterInputRow>
        <div className="ml-auto">
          <MapInputEmptyRankToggle {...props}/>
        </div>
      </FilterInputRow>
    </Flex>
  );
};
