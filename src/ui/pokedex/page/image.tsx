import React from 'react';

import Image from 'next/image';

import {imagePortraitSizes} from '@/styles/image';
import {CurrentPokemonImage, PokemonProps} from '@/ui/pokedex/page/type';


type Props = PokemonProps & {
  image: CurrentPokemonImage,
  isShiny: boolean,
};

export const PokemonImage = ({pokemon, image, isShiny}: Props) => {
  const {id} = pokemon;

  if (image === 'onSnorlax') {
    return (
      <Image src="/images/generic/pokeball_unavailable.png" alt="N/A" fill sizes={imagePortraitSizes}/>
    );
  }

  const alt = `Pokemon #${id}`;

  if (image === 'portrait') {
    return (
      <Image
        src={`/images/pokemon/portrait/${isShiny ? 'shiny/' : ''}${id}.png`} alt={alt}
        fill sizes={imagePortraitSizes}
      />
    );
  }

  return (
    <Image
      src={`/images/sleep/${image}/${isShiny ? 'shiny/' : ''}${id}.png`} alt={alt}
      fill sizes={imagePortraitSizes}
    />
  );
};
