import React from 'react';

import {useTranslations} from 'next-intl';

import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonImageType} from '@/components/shared/pokemon/image/type';
import {PokemonId} from '@/types/game/pokemon';


type Props = {
  pokemonId: PokemonId,
  pokemonSleepStyleId: PokemonId,
  image: PokemonImageType,
  isActive: boolean,
};

export const PokemonGalleryButton = ({pokemonId, pokemonSleepStyleId, image, isActive}: Props) => {
  const t = useTranslations(`Game.SleepFace.${pokemonSleepStyleId}`);
  const t2 = useTranslations('Game.SleepFace.onSnorlax');
  const t3 = useTranslations('Game.PokemonName');

  if (image === 'onSnorlax') {
    return t2('Default');
  }

  if (image === 'portrait') {
    return <GenericPokeballIcon alt={t3(pokemonId.toString())} isActive={isActive}/>;
  }

  return t(image.toString());
};
