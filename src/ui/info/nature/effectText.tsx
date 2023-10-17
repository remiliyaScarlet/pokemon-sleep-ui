import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NatureEffectIcon} from '@/components/shared/pokemon/nature/effectIcon';
import {natureEffectIconMap} from '@/const/game/nature';
import {NatureInfoEffectProps} from '@/ui/info/nature/type';


export const NatureInfoEffectText = ({direction, effectId, dimension, isActive}: NatureInfoEffectProps) => {
  const t = useTranslations('Game');

  dimension = dimension ?? 'h-5 w-5';
  const hasEffect = effectId !== null;

  return (
    <Flex direction="row" className="items-center gap-0.5">
      <div className={dimension}>
        {natureEffectIconMap[direction]}
      </div>
      <div className={clsx('relative', dimension)}>
        <NatureEffectIcon effectId={effectId} showOnNull isActive={isActive}/>
      </div>
      <div className="whitespace-nowrap">
        {hasEffect && `${t(`NatureEffect.${effectId}`)}`}
      </div>
    </Flex>
  );
};
