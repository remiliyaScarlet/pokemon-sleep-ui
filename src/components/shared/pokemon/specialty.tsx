import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {specialtyImageSrcMap} from '@/const/game/pokemon';
import {specialtyTextClass} from '@/styles/classes';
import {imageSmallIconSizes} from '@/styles/image';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {Dimension} from '@/types/style';
import {classNames} from '@/utils/react';


type Props = {
  specialty: PokemonInfo['specialty'],
  dimension?: Dimension,
  hideText?: boolean,
};

export const PokemonSpecialty = ({specialty, dimension, hideText}: Props) => {
  const t = useTranslations('Game');

  return (
    <Flex direction="row" noFullWidth center className="gap-1">
      {specialty ?
        <>
          <div className={classNames('relative', dimension ?? 'h-5 w-5')}>
            <NextImage
              src={specialtyImageSrcMap[specialty]} alt={t(`Specialty.${specialty}`)}
              sizes={imageSmallIconSizes} className="invert-on-light"
            />
          </div>
          {!hideText && <div className={specialtyTextClass[specialty]}>{t(`Specialty.${specialty}`)}</div>}
        </> :
        <div className={dimension ?? 'h-5 w-5'}>
          <XCircleIcon/>
        </div>}
    </Flex>
  );
};
