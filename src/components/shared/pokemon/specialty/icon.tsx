import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonSpecialtyProps} from '@/components/shared/pokemon/specialty/type';
import {specialtyImageSrcMap} from '@/const/game/pokemon';
import {imageSmallIconSizes} from '@/styles/image';
import {classNames} from '@/utils/react';


export const PokemonSpecialtyIcon = ({specialty, dimension}: PokemonSpecialtyProps) => {
  const t = useTranslations('Game');

  return (
    <Flex direction="row" noFullWidth center className="gap-1">
      {specialty ?
        <div className={classNames('relative', dimension ?? 'h-5 w-5')}>
          <NextImage
            src={specialtyImageSrcMap[specialty]} alt={t(`Specialty.${specialty}`)}
            sizes={imageSmallIconSizes} className="invert-on-light"
          />
        </div> :
        <div className={dimension ?? 'h-5 w-5'}>
          <XCircleIcon/>
        </div>}
    </Flex>
  );
};
