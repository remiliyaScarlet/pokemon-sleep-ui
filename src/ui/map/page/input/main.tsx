import React from 'react';

import {InputRow} from '@/components/input/filter/row';
import {Flex} from '@/components/layout/flex/common';
import {PokemonFilter} from '@/components/shared/pokemon/input/filter';
import {pokemonInputType} from '@/components/shared/pokemon/input/type';
import {MapInputDisplayType} from '@/ui/map/page/input/displayType';
import {MapInputEmptyRankToggle} from '@/ui/map/page/input/hideEmptyRank';
import {MapInputSleepdexStatsToggle} from '@/ui/map/page/input/hideSleepdexStats';
import {MapInputMarkSleepdexToggle} from '@/ui/map/page/input/markSleepdex';
import {MapInputSleepStyleToggle} from '@/ui/map/page/input/styleIndex';
import {MapInputCommonProps} from '@/ui/map/page/input/type';
import {toUnique} from '@/utils/array';
import {isNotNullish} from '@/utils/type';


export const MapInfoInput = (props: MapInputCommonProps) => {
  const {
    filter,
    setFilter,
    pokedexMap,
    sleepStyles,
  } = props;

  return (
    <Flex className="gap-1">
      {pokemonInputType.map((type) => (
        <PokemonFilter
          key={type}
          type={type}
          filterKey={type}
          pokemonList={Object.values(pokedexMap).filter(isNotNullish)}
          {...props}
        />
      ))}
      <MapInputSleepStyleToggle
        sleepStyles={toUnique(sleepStyles.map(({style}) => style.style))}
        filter={filter}
        setFilter={setFilter}
      />
      <MapInputDisplayType filter={filter} setFilter={setFilter}/>
      <InputRow>
        <Flex direction="row" noFullWidth className="ml-auto gap-1.5">
          <MapInputMarkSleepdexToggle {...props}/>
          <MapInputSleepdexStatsToggle {...props}/>
          <MapInputEmptyRankToggle {...props}/>
        </Flex>
      </InputRow>
    </Flex>
  );
};
