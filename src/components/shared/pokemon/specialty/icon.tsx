import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {specialtyImageSrcMap} from '@/const/game/pokemon';
import {specialtyBgClass} from '@/styles/classes';
import {imageSmallIconSizes} from '@/styles/image';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {Dimension} from '@/types/style';


type Props = {
  specialty: PokemonInfo['specialty'],
  dimension?: Dimension,
};

export const PokemonSpecialtyIcon = ({specialty, dimension}: Props) => {
  const t = useTranslations('Game');

  return (
    <div className={clsx('rounded-full p-0.5', specialty && specialtyBgClass[specialty])}>
      {specialty ?
        <>
          <div className={clsx('relative', dimension ?? 'h-5 w-5')}>
            <NextImage
              src={specialtyImageSrcMap[specialty]} alt={t(`Specialty.${specialty}`)}
              sizes={imageSmallIconSizes} className="invert-on-dark"
            />
          </div>
        </> :
        <div className={dimension ?? 'h-5 w-5'}>
          <XCircleIcon/>
        </div>}
    </div>
  );
};
