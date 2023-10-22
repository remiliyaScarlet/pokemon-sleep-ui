import React from 'react';

import {InputRow} from '@/components/input/filter/row';
import {Flex} from '@/components/layout/flex/common';
import {PokemonFilter} from '@/components/shared/pokemon/filter/main';
import {MapInputDisplayType} from '@/ui/map/page/input/displayType';
import {MapInputMarkSleepdexToggle} from '@/ui/map/page/input/markSleepdex';
import {MapInputSleepStyleToggle} from '@/ui/map/page/input/styleIndex';
import {MapInputEmptyRankToggle} from '@/ui/map/page/input/toggleOfEmptyRank';
import {MapInputLockedOnlyToggle} from '@/ui/map/page/input/toggleOfLockedOnly';
import {MapInputSleepdexStatsToggle} from '@/ui/map/page/input/toggleOfSleepdexStats';
import {MapInputWithDataProps} from '@/ui/map/page/input/type';
import {toUnique} from '@/utils/array';
import {isNotNullish} from '@/utils/type';


export const MapInfoInput = (props: MapInputWithDataProps) => {
  const {
    filter,
    setFilter,
    pokedexMap,
    sleepStyles,
  } = props;

  return (
    <Flex className="gap-1">
      <PokemonFilter
        pokemonList={Object.values(pokedexMap).filter(isNotNullish)}
        {...props}
      />
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
          <MapInputLockedOnlyToggle {...props}/>
          <MapInputEmptyRankToggle filter={filter} setFilter={setFilter}/>
        </Flex>
      </InputRow>
    </Flex>
  );
};
