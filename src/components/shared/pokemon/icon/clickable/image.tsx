import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {PokemonId, PokemonTypeId} from '@/types/game/pokemon';
import {Dimension} from '@/types/style';


export type Props = {
  id: PokemonId,
  type: PokemonTypeId,
  dimension?: Dimension,
};

export const PokemonClickableIconImage = ({id, type, dimension}: Props) => {
  const t = useTranslations('Game');

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
      <div className={clsx('relative', dimension ?? 'h-14 w-14')}>
        <NextImage
          src={`/images/pokemon/icons/${id}.png`} alt={t(`PokemonName.${id}`)}
          sizes={imageIconSizes}
        />
      </div>
    </>
  );
};
