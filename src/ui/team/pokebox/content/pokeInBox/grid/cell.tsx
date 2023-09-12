import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokeInBoxMeta} from '@/components/shared/pokebox/meta';
import {imageIconSizes} from '@/styles/image';
import {PokeInBoxLevel} from '@/ui/team/pokebox/content/pokeInBox/common/level';
import {PokeInBoxGridPopUps} from '@/ui/team/pokebox/content/pokeInBox/grid/decorations/popup';
import {PokeInBoxDetails} from '@/ui/team/pokebox/content/pokeInBox/grid/details/main';
import {PokeInBoxViewUnitProps} from '@/ui/team/pokebox/content/pokeInBox/type';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


type Props = PokeInBoxViewUnitProps & {
  displayType: PokeboxViewerDisplay['displayOfGrid'],
};

export const PokeInBoxGridCell = (props: Props) => {
  const {
    pokeInBox,
    pokedexMap,
    displayType,
    onClick,
    isLevelPreview,
  } = props;
  const {pokemon: pokemonId} = pokeInBox;
  const pokemon = pokedexMap[pokemonId];

  const t = useTranslations('Game');

  if (!pokemon) {
    return <></>;
  }

  const pokemonName = t(`PokemonName.${pokemonId}`);

  const pokeInBoxProps: PokeInBoxCommonProps = {
    ...props,
    pokemon,
  };

  return (
    <div className="group relative w-full">
      <PokeInBoxGridPopUps pokemon={pokemon} pokemonName={pokemonName} {...props}/>
      <PokeInBoxLevel viewType="grid" level={pokeInBox.level} isLevelPreview={isLevelPreview}/>
      <button onClick={onClick} className="button-clickable-bg w-full rounded-lg p-2">
        <Flex direction="row" className="relative h-24 gap-2">
          <div className="absolute bottom-0 right-0">
            <div className="relative h-16 w-16 opacity-50">
              <NextImage src={`/images/pokemon/icons/${pokemonId}.png`} alt={pokemonName} sizes={imageIconSizes}/>
            </div>
          </div>
          <Flex direction="col" className="z-10 gap-1">
            <PokeInBoxMeta {...pokeInBoxProps}/>
            <div className="mt-auto">
              <PokeInBoxDetails displayType={displayType} {...pokeInBoxProps}/>
            </div>
          </Flex>
        </Flex>
      </button>
    </div>
  );
};
