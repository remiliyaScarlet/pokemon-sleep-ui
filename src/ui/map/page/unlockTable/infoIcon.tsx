import React from 'react';

import QuestionMarkCircleIcon from '@heroicons/react/24/solid/QuestionMarkCircleIcon';

import {NextImage} from '@/components/shared/common/image/main';
import {PokemonSleepType} from '@/components/shared/pokemon/sleepType';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty';
import {imageSmallIconSizes} from '@/styles/image';
import {PokedexMap} from '@/types/mongo/pokemon';
import {SleepStyleDataFlattened} from '@/types/mongo/sleepStyle';
import {MapUnlockTableDisplayType} from '@/ui/map/page/type';


type Props = {
  data: SleepStyleDataFlattened,
  pokedex: PokedexMap,
  displayType: MapUnlockTableDisplayType,
};

export const MapTableInfoIcon = ({data, pokedex, displayType}: Props) => {
  if (displayType === 'sleepStyle') {
    const {style} = data;

    if (style.style === 'onSnorlax') {
      return (
        <div className="relative h-4 w-4">
          <NextImage src="/images/generic/snorlax.png" alt={style.style} sizes={imageSmallIconSizes}/>
        </div>
      );
    }

    return <>#{style.style}</>;
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
