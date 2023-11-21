'use client';
import React from 'react';

import {Transition} from '@headlessui/react';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {getTextFilterButtonClass} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {PokemonGalleryButton} from '@/components/shared/pokemon/gallery/button';
import {gallerySize} from '@/components/shared/pokemon/gallery/const';
import {PokemonGalleryCommonProps} from '@/components/shared/pokemon/gallery/type';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonImageType} from '@/components/shared/pokemon/image/type';
import {getPokemonSleepStyleId} from '@/utils/game/pokemon';
import {getAvailableSleepStylesFromNormal, getAvailableSleepStylesFromSpecial} from '@/utils/game/sleepdex';


export const PokemonGallery = ({
  pokemon,
  pokemonBranches,
  sleepStyles,
  sleepStylesSpecial,
}: PokemonGalleryCommonProps) => {
  const t = useTranslations('UI.Common');

  const imageOptions: PokemonImageType[] = React.useMemo(() => [
    'portrait',
    ...getAvailableSleepStylesFromNormal(sleepStyles),
    ...getAvailableSleepStylesFromSpecial(sleepStylesSpecial),
  ], [sleepStyles]);
  const [isShiny, setShiny] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState<PokemonImageType>('portrait');

  return (
    <Flex center>
      <Flex center noFullWidth className={clsx('relative', gallerySize)}>
        {imageOptions
          .flatMap<[PokemonImageType, boolean]>((image) => [[image, true], [image, false]])
          .map(([image, imageShiny]) => (
            <Transition
              key={`${image}-${imageShiny}`}
              show={image === currentImage && isShiny === imageShiny}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className={clsx('absolute', gallerySize)}
            >
              <PokemonImage pokemonId={pokemon.id} image={image} isShiny={imageShiny}/>
            </Transition>
          ))}
      </Flex>
      <Flex direction="row" center wrap className="gap-1.5">
        <ToggleButton
          active={isShiny}
          onClick={() => setShiny(!isShiny)}
          className={getTextFilterButtonClass(isShiny)}
        >
          {t('Shiny')}
        </ToggleButton>
        {imageOptions.map((image) => {
          const isActive = currentImage === image;

          return (
            <ToggleButton
              key={image}
              active={isActive}
              onClick={() => setCurrentImage(image)}
              className={getTextFilterButtonClass(isActive)}
            >
              <PokemonGalleryButton
                pokemonId={pokemon.id}
                pokemonSleepStyleId={getPokemonSleepStyleId({
                  pokemonId: pokemon.id,
                  branch: pokemonBranches,
                })}
                image={image}
                isActive={isActive}
              />
            </ToggleButton>
          );
        })}
      </Flex>
    </Flex>
  );
};
