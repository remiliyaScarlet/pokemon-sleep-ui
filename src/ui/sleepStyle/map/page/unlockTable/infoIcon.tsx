import React from 'react';

import QuestionMarkCircleIcon from '@heroicons/react/24/solid/QuestionMarkCircleIcon';

import {PokemonSleepType} from '@/components/shared/pokemon/sleepType/main';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty/main';
import {SleepdexStyleIcon} from '@/components/shared/sleepdex/styleIcon';
import {PokedexMap} from '@/types/game/pokemon';
import {SleepStyleNormalFlattened} from '@/types/game/sleepStyle';
import {MapUnlockTableDisplayType} from '@/ui/sleepStyle/map/page/type';


type Props = {
  data: SleepStyleNormalFlattened,
  pokedex: PokedexMap,
  displayType: MapUnlockTableDisplayType,
};

export const MapTableInfoIcon = ({data, pokedex, displayType}: Props) => {
  if (displayType === 'sleepStyle') {
    const {style} = data;

    return <SleepdexStyleIcon styleId={style.style} dimension="h-4 w-4"/>;
  }

  const pokemon = pokedex[data.pokemonId];

  if (!pokemon) {
    return (
      <div className="h-4 w-4">
        <QuestionMarkCircleIcon/>
      </div>
    );
  }

  if (displayType === 'specialty') {
    return <PokemonSpecialty specialty={pokemon.specialty} dimension="h-4 w-4" hideText/>;
  }

  if (displayType === 'sleepType') {
    return <PokemonSleepType sleepType={pokemon.sleepType} dimension="h-4 w-4" hideText/>;
  }

  console.error(`Unhandled map unlock table display type: ${displayType satisfies never}`);
};
