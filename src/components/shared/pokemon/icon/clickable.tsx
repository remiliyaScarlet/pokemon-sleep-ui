import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {getToggleButtonClass} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';


type Props = {
  pokemonList: PokemonInfo[],
  onClick: (id: PokemonId) => void,
  isActive?: (id: PokemonId) => boolean,
};

export const PokemonIconClickable = ({pokemonList, onClick, isActive}: Props) => {
  const t = useTranslations('Game');

  return (
    <Flex direction="row" center wrap className="gap-1.5">
      {pokemonList.map(({id, type}) => (
        <button key={id} onClick={() => onClick(id)} className={clsx(
          'relative rounded-lg p-1',
          isActive ? getToggleButtonClass(isActive(id)) : 'button-clickable',
        )}>
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
