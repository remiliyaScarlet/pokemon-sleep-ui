import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {natureEffectImageSrcMap} from '@/const/game/pokemon';
import {NatureEffectId} from '@/types/game/pokemon/nature';


type Props = {
  effectId: NatureEffectId | null | undefined,
  showOnNull?: boolean,
};

export const NatureEffectIcon = ({effectId, showOnNull}: Props) => {
  const t = useTranslations('Game');

  if (!effectId) {
    if (showOnNull) {
      return <XCircleIcon/>;
    }

    return <></>;
  }

  return (
    <NextImage
      src={natureEffectImageSrcMap[effectId]}
      alt={t(`NatureEffect.${effectId}`)}
      className="invert-hoverable"
    />
  );
};
