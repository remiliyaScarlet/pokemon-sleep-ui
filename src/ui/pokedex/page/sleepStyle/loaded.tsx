import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {SleepdexMap} from '@/types/game/sleepdex';
import {PokemonSleepStylesIncenseOnly} from '@/ui/pokedex/page/sleepStyle/incenseOnly';
import {PokemonSleepStylesOfMap} from '@/ui/pokedex/page/sleepStyle/map';
import {PokemonDataProps} from '@/ui/pokedex/page/type';


type Props = PokemonDataProps & {
  initialSleepdex: SleepdexMap,
};

export const PokemonSleepStylesLoaded = ({
  pokemon,
  pokemonBranches,
  sleepStyles,
  sleepStylesSpecial,
  initialSleepdex,
}: Props) => {
  const [sleepdex, setSleepdex] = React.useState(initialSleepdex);

  if (sleepStyles.length === 0) {
    return null;
  }

  return (
    <Flex center wrap className="info-section md:flex-row">
      {sleepStyles.map((sleepStyleOfMap) => (
        <PokemonSleepStylesOfMap
          key={sleepStyleOfMap.mapId}
          sleepdex={sleepdex}
          setSleepdex={setSleepdex}
          pokemon={pokemon}
          pokemonBranch={pokemonBranches}
          sleepStyleOfMap={sleepStyleOfMap}
        />
      ))}
      <PokemonSleepStylesIncenseOnly
        pokemon={pokemon}
        pokemonBranch={pokemonBranches}
        sleepdex={sleepdex}
        setSleepdex={setSleepdex}
        sleepStylesIncenseOnly={sleepStylesSpecial}
      />
    </Flex>
  );
};
