'use client';
import React from 'react';

import {Transition} from '@headlessui/react';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {getTextFilterButtonClass} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonImageType} from '@/components/shared/pokemon/image/type';
import {PokemonId} from '@/types/game/pokemon';
import {PokemonProps} from '@/ui/pokedex/page/type';
import {toUnique} from '@/utils/array';
import {getPokemonSleepStyleId} from '@/utils/game/pokemon';


type Props = {
  pokemonId: PokemonId,
  pokemonSleepStyleId: PokemonId,
  image: PokemonImageType,
  isActive: boolean,
};

const gallerySize = 'h-72 w-72';

const GalleryButton = ({pokemonId, pokemonSleepStyleId, image, isActive}: Props) => {
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

export const PokemonImageGallery = (props: PokemonProps) => {
  const {pokemon, pokemonBranches, sleepStyles} = props;

  const t = useTranslations('UI.Common');

  const imageOptions: PokemonImageType[] = React.useMemo(() => [
    'portrait',
    ...toUnique(sleepStyles.flatMap(({styles}) => styles.map(({style}) => style))),
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
              <GalleryButton
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
