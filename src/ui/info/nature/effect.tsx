import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {natureIdEffectMap} from '@/const/game/nature';
import {natureStyle} from '@/styles/game/nature';
import {NatureId} from '@/types/game/pokemon/nature';
import {NatureInfoEffectText} from '@/ui/info/nature/effectText';
import {NatureInfoEffectProps} from '@/ui/info/nature/type';
import {getNatureMultiplier} from '@/utils/game/nature';


type Props = NatureInfoEffectProps & {
  natureId: NatureId,
};

export const NatureInfoEffect = ({natureId, ...props}: Props) => {
  const {effectId, direction} = props;

  const hasEffect = effectId !== null;

  return (
    <Flex direction="row" className={clsx('items-center justify-between', effectId && natureStyle[direction])}>
      <NatureInfoEffectText {...props}/>
      {
        hasEffect &&
        <div>
          {getNatureMultiplier({id: natureId, effect: natureIdEffectMap[effectId]})}x
        </div>
      }
    </Flex>
  );
};
