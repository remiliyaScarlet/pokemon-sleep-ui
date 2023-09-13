import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokemonSleepType} from '@/components/shared/pokemon/sleepType/main';
import {PokemonSleepTypeId} from '@/types/game/pokemon';
import {formatInt} from '@/utils/number';


type Props = {
  sleepType: PokemonSleepTypeId,
  unlocked: number | undefined,
  unlockable: number | undefined,
};

export const MapUnlockTableStylesUnlocked = ({sleepType, unlocked, unlockable}: Props) => {
  return (
    <Flex direction="row" center className="gap-1">
      <PokemonSleepType sleepType={sleepType} dimension="h-4 w-4" hideText/>
      <div>{formatInt(unlocked)}</div>
      <div>/</div>
      <div>{formatInt(unlockable)}</div>
      {
        !!unlocked && !!unlockable &&
        <div>({(unlocked / unlockable * 100).toFixed(2)}%)</div>
      }
    </Flex>
  );
};
