import React from 'react';

import {NextImage} from '@/components/shared/common/image/main';
import {PokemonImageType} from '@/components/shared/pokemon/image/type';
import {imagePortraitSizes} from '@/styles/image';
import {PokemonId} from '@/types/game/pokemon';


type Props = {
  pokemonId: PokemonId,
  image: PokemonImageType,
  isShiny: boolean,
};

export const PokemonImage = ({pokemonId, image, isShiny}: Props) => {
  if (image === 'onSnorlax') {
    return (
      <NextImage src="/images/generic/pokeball_unavailable.png" alt="N/A" sizes={imagePortraitSizes}/>
    );
  }

  const alt = `Pokemon #${pokemonId}`;

  if (image === 'portrait') {
    return (
      <NextImage
        src={`/images/pokemon/portrait/${isShiny ? 'shiny/' : ''}${pokemonId}.png`} alt={alt}
        sizes={imagePortraitSizes}
      />
    );
  }

  return (
    <NextImage
      src={`/images/sleep/${image}/${isShiny ? 'shiny/' : ''}${pokemonId}.png`} alt={alt}
      sizes={imagePortraitSizes}
    />
  );
};
