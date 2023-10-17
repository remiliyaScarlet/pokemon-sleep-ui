import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {natureEffectImageSrcMap} from '@/const/game/nature';
import {imageSmallIconSizes} from '@/styles/image';
import {NatureEffectId} from '@/types/game/pokemon/nature';


type Props = {
  effectId: NatureEffectId | null | undefined,
  showOnNull?: boolean,
  isActive?: boolean,
};

export const NatureEffectIcon = ({effectId, showOnNull, isActive}: Props) => {
  const t = useTranslations('Game');

  if (!effectId) {
    if (showOnNull) {
      return <XCircleIcon/>;
    }

    return null;
  }

  return (
    <NextImage
      src={natureEffectImageSrcMap[effectId]}
      alt={t(`NatureEffect.${effectId}`)}
      sizes={imageSmallIconSizes}
      className={isActive ? 'invert-hoverable-dark' : 'invert-hoverable'}
    />
  );
};
