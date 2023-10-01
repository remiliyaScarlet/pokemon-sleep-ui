import React from 'react';

import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonNameBig} from '@/components/shared/pokemon/name/big';
import {imageIconSizes} from '@/styles/image';
import {PokemonInfo} from '@/types/game/pokemon';


type Props = {
  pokemon: PokemonInfo,
};

export const PokemonLinkPopupContent = ({pokemon}: Props) => {
  const t = useTranslations('UI.Metadata');
  const t2 = useTranslations('Game');

  const {id} = pokemon;

  const name = t2(`PokemonName.${id}`);

  return (
    <Flex direction="col" center className="gap-2 md:w-96">
      <PokemonNameBig pokemon={pokemon}/>
      <div className="relative h-60 w-60">
        <PokemonImage pokemonId={pokemon.id} image="portrait" isShiny={false}/>
      </div>
      <Flex direction="row" className="gap-2">
        <Flex direction="col">
          <Link href={`/pokedex/${id}`}>
            <Flex direction="col" center className="button-clickable-bg group p-2">
              <GenericPokeballIcon dimension="h-10 w-10" alt={t('Pokedex.Page.Title', {name})}/>
            </Flex>
          </Link>
        </Flex>
        <Flex direction="col">
          <Link href={`/analysis/${id}`}>
            <Flex direction="col" center className="button-clickable-bg group p-2">
              <div className="relative h-10 w-10">
                <NextImage
                  src="/images/generic/analysis.png" alt={t('Analysis.Title', {name})}
                  sizes={imageIconSizes} className="invert-hoverable"
                />
              </div>
            </Flex>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
