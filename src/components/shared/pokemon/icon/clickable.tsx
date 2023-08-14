import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {PokemonId, PokemonInfo} from '@/types/mongo/pokemon';


type Props = {
  pokemon: PokemonInfo[],
  onClick: (id: PokemonId) => void,
};

export const PokemonIconClickable = ({pokemon, onClick}: Props) => {
  const t = useTranslations('Game');

  return (
    <Flex direction="row" center wrap className="gap-1.5">
      {pokemon.map(({id, type}) => (
        <button key={id} onClick={() => onClick(id)} className="button-clickable relative rounded-lg p-1">
          <div className="absolute left-0.5 top-0.5 z-10">
            <div className="relative h-5 w-5">
              <NextImage
                src={`/images/type/${type}.png`} alt={t(`PokemonType.${type}`)}
                className="drop-shadow-thick" sizes={imageIconSizes}
              />
            </div>
          </div>
          <div className="relative h-14 w-14">
            <NextImage
              src={`/images/pokemon/icons/${id}.png`} alt={t(`PokemonName.${id}`)}
              sizes={imageIconSizes}
            />
          </div>
        </button>
      ))}
    </Flex>
  );
};
