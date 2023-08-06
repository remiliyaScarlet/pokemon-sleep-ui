import React from 'react';

import {NextImage} from '@/components/shared/common/image/main';
import {PokemonImageType} from '@/components/shared/pokemon/image/type';
import {imagePortraitSizes} from '@/styles/image';
import {PokemonInfo} from '@/types/mongo/pokemon';


type Props = {
  pokemon: PokemonInfo,
  image: PokemonImageType,
  isShiny: boolean,
};

export const PokemonImage = ({pokemon, image, isShiny}: Props) => {
  const {id} = pokemon;

  if (image === 'onSnorlax') {
    return (
      <NextImage src="/images/generic/pokeball_unavailable.png" alt="N/A" sizes={imagePortraitSizes}/>
    );
  }

  const alt = `Pokemon #${id}`;

  if (image === 'portrait') {
    return (
      <NextImage
        src={`/images/pokemon/portrait/${isShiny ? 'shiny/' : ''}${id}.png`} alt={alt}
        sizes={imagePortraitSizes}
      />
    );
  }

  return (
    <NextImage
      src={`/images/sleep/${image}/${isShiny ? 'shiny/' : ''}${id}.png`} alt={alt}
      sizes={imagePortraitSizes}
    />
  );
};
