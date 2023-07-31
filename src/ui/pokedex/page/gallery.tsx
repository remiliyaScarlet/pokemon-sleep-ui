'use client';
import React from 'react';

import {Transition} from '@headlessui/react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {getTextFilterButtonClass} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex';
import {imageIconSizes} from '@/styles/image';
import {PokemonId} from '@/types/mongo/pokemon';
import {PokemonImage} from '@/ui/pokedex/page/image';
import {CurrentPokemonImage, PokemonProps} from '@/ui/pokedex/page/type';
import {toUnique} from '@/utils/array';
import {classNames} from '@/utils/react';

import styles from './main.module.css';


type Props = {
  pokemonId: PokemonId,
  image: CurrentPokemonImage,
  isActive: boolean,
};

const GalleryButton = ({pokemonId, image, isActive}: Props) => {
  const t = useTranslations(`Game.SleepFace.${pokemonId}`);
  const t2 = useTranslations('Game.SleepFace.onSnorlax');
  const t3 = useTranslations('UI.InPage.Pokedex.Info');

  if (image === 'onSnorlax') {
    return t2('Default');
  }

  if (image === 'portrait') {
    return (
      <div className="relative h-5 w-5">
        <Image
          src="/images/generic/pokeball.png" alt={t3('Name')} fill sizes={imageIconSizes}
          className={classNames('transform-smooth', isActive ? 'invert-on-dark' : '')}
        />
      </div>
    );
  }

  return t(image.toString());
};

export const PokemonImageGallery = (props: PokemonProps) => {
  const {pokemon, sleepStyles} = props;

  const t = useTranslations('UI.Common');

  const imageOptions: CurrentPokemonImage[] = React.useMemo(() => [
    'portrait',
    ...toUnique(sleepStyles.flatMap(({styles}) => styles.map(({style}) => style))),
  ], [sleepStyles]);
  const [isShiny, setShiny] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState<CurrentPokemonImage>('portrait');

  return (
    <Flex direction="col" center className="info-section-md-fit">
      <Flex direction="col" center noFullWidth className={styles['gallery-wrapper']}>
        {imageOptions
          .flatMap<[CurrentPokemonImage, boolean]>((image) => [[image, true], [image, false]])
          .map(([image, imageShiny]) => (
            <Transition
              key={`${image}-${imageShiny}`}
              show={image === currentImage && isShiny === imageShiny}
              enter="transition-opacity duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-250"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className={styles['gallery-wrapper']}
            >
              <PokemonImage image={image} isShiny={imageShiny} {...props}/>
            </Transition>
          ))}
      </Flex>
      <Flex direction="row" center wrap className="gap-1.5">
        <ToggleButton
          active={isShiny}
          id="shiny"
          onChange={setShiny}
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
              id={image.toString()}
              onClick={() => setCurrentImage(image)}
              className={getTextFilterButtonClass(isActive)}
            >
              <GalleryButton pokemonId={pokemon.id} image={image} isActive={isActive}/>
            </ToggleButton>
          );
        })}
      </Flex>
    </Flex>
  );
};
