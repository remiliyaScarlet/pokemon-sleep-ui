import React from 'react';

import {useTranslations} from 'next-intl';

import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonImageType} from '@/components/shared/pokemon/image/type';
import {useSleepStyleName} from '@/hooks/sleepdex/name';
import {PokemonId} from '@/types/game/pokemon';


type Props = {
  pokemonId: PokemonId,
  pokemonSleepStyleId: PokemonId,
  image: PokemonImageType,
  isActive: boolean,
};

export const PokemonGalleryButton = ({pokemonId, pokemonSleepStyleId, image, isActive}: Props) => {
  const t = useTranslations('Game.PokemonName');
  const sleepStyleName = useSleepStyleName(pokemonSleepStyleId);

  if (image === 'portrait') {
    return <GenericPokeballIcon alt={t(pokemonId.toString())} isActive={isActive}/>;
  }

  return sleepStyleName;
};
