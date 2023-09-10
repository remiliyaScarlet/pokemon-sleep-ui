import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {imageIconSizes} from '@/styles/image';
import {PokemonInfo} from '@/types/game/pokemon';
import {Dimension} from '@/types/style';


export type Props = {
  pokemon: PokemonInfo | null,
  dimension?: Dimension,
};

export const PokemonClickableIconImage = ({pokemon, dimension}: Props) => {
  const t = useTranslations('Game');
  dimension = dimension ?? 'h-14 w-14';

  if (!pokemon) {
    return <UnavailableIcon dimension={dimension}/>;
  }

  const {id, type} = pokemon;

  return (
    <>
      <div className="absolute left-0.5 top-0.5 z-10">
        <div className="relative h-5 w-5">
          <NextImage
            src={`/images/type/${type}.png`} alt={t(`PokemonType.${type}`)}
            className="drop-shadow-thick" sizes={imageIconSizes}
          />
        </div>
      </div>
      <div className={clsx('relative', dimension)}>
        <NextImage
          src={`/images/pokemon/icons/${id}.png`} alt={t(`PokemonName.${id}`)}
          sizes={imageIconSizes}
        />
      </div>
    </>
  );
};
