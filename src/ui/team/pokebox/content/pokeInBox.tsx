import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {PokeInBox} from '@/types/game/pokebox';
import {PokedexMap} from '@/types/mongo/pokemon';
import {PokeboxPokeInBoxDetails} from '@/ui/team/pokebox/content/details/main';
import {PokeboxPokeInBoxFixedInfo} from '@/ui/team/pokebox/content/fixed';
import {PokeboxPokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';


type Props = PokeboxCommonProps & Pick<PokeboxPokeInBoxCommonProps, 'displayType'> & {
  pokeInBox: PokeInBox,
  pokedexMap: PokedexMap,
  onClick: () => void,
};

export const PokeboxContentPokeInBox = (props: Props) => {
  const {
    pokeInBox,
    pokedexMap,
    displayType,
    onClick,
  } = props;
  const {pokemon: pokemonId} = pokeInBox;
  const pokemon = pokedexMap[pokemonId];

  const t = useTranslations('Game');

  if (!pokemon) {
    return <></>;
  }

  const pokemonName = t(`PokemonName.${pokemonId}`);

  const pokeInBoxProps: PokeboxPokeInBoxCommonProps = {
    ...props,
    pokemon,
    displayType,
  };

  return (
    <button onClick={onClick} className={clsx(
      'button-clickable-bg group rounded-lg p-2',
      'width-with-gap-sm md:width-with-gap-2-items lg:width-with-gap-3-items',
    )}>
      <Flex direction="row" className="relative h-24 gap-2">
        <div className="absolute bottom-0 right-0">
          <div className="relative h-16 w-16 opacity-50">
            <NextImage src={`/images/pokemon/icons/${pokemonId}.png`} alt={pokemonName} sizes={imageIconSizes}/>
          </div>
        </div>
        <Flex direction="col" className="z-10 gap-1">
          <PokeboxPokeInBoxFixedInfo {...pokeInBoxProps}/>
          <div className="mt-auto">
            <PokeboxPokeInBoxDetails {...pokeInBoxProps}/>
          </div>
        </Flex>
      </Flex>
    </button>
  );
};
