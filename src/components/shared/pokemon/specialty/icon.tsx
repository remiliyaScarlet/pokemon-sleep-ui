import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {PokemonSpecialtyCommonProps} from '@/components/shared/pokemon/specialty/type';
import {specialtyImageSrcMap} from '@/const/game/pokemon';
import {getSpecialtyBgClass} from '@/styles/game/specialty';
import {imageSmallIconSizes} from '@/styles/image';


export const PokemonSpecialtyIcon = ({specialty, dimension, active}: PokemonSpecialtyCommonProps) => {
  const t = useTranslations('Game');

  return (
    <div className={clsx('rounded-full p-0.5', specialty && getSpecialtyBgClass(specialty, active ?? false))}>
      {specialty ?
        <>
          <div className={clsx('relative', dimension ?? 'h-5 w-5')}>
            <NextImage
              src={specialtyImageSrcMap[specialty]} alt={t(`Specialty.${specialty}`)}
              sizes={imageSmallIconSizes} className={active ? 'invert-on-light' : 'invert-on-dark'}
            />
          </div>
        </> :
        <div className={dimension ?? 'h-5 w-5'}>
          <XCircleIcon/>
        </div>}
    </div>
  );
};
