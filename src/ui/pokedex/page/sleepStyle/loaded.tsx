'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {SleepdexMap} from '@/types/game/sleepdex';
import {PokemonSleepStylesOfMap} from '@/ui/pokedex/page/sleepStyle/map';
import {PokemonProps} from '@/ui/pokedex/page/type';


type Props = PokemonProps & {
  initialSleepdex: SleepdexMap,
};

export const PokemonSleepStylesLoaded = ({pokemon, sleepStyles, initialSleepdex}: Props) => {
  const [sleepdex, setSleepdex] = React.useState(initialSleepdex);

  if (sleepStyles.length === 0) {
    return null;
  }

  return (
    <Flex center wrap className="info-section gap-1.5 md:flex-row">
      {sleepStyles.map((sleepStyleOfMap) => (
        <PokemonSleepStylesOfMap
          key={sleepStyleOfMap.mapId}
          sleepdex={sleepdex}
          setSleepdex={setSleepdex}
          pokemon={pokemon}
          sleepStyleOfMap={sleepStyleOfMap}
        />
      ))}
    </Flex>
  );
};
