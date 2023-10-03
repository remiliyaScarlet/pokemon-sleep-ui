import React from 'react';

import CheckIcon from '@heroicons/react/24/outline/CheckIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';

import {Flex} from '@/components/layout/flex/common';
import {PokemonSleepType} from '@/components/shared/pokemon/sleepType/main';
import {PokemonSleepTypeId} from '@/types/game/pokemon';
import {formatInt} from '@/utils/number';


type Props = {
  sleepType: PokemonSleepTypeId | null,
  unlocked: number | undefined,
  unlockable: number | undefined,
};

export const MapUnlockTableStylesUnlocked = ({sleepType, unlocked, unlockable}: Props) => {
  return (
    <Flex direction="row" center noFullWidth className="gap-1">
      {
        sleepType !== null ?
          <PokemonSleepType sleepType={sleepType} dimension="h-4 w-4" hideText/> :
          <div className="h-6 w-6">
            <XCircleIcon/>
          </div>
      }
      {
        unlocked !== undefined && unlockable !== undefined &&
        (
          unlocked !== unlockable ?
            <>
              <div>{formatInt(unlocked)}</div>
              <div>/</div>
              <div>{formatInt(unlockable)}</div>
              <div>({(unlocked / unlockable * 100).toFixed(2)}%)</div>
            </> :
            <div className="h-6 w-6">
              <CheckIcon/>
            </div>
        )
      }
    </Flex>
  );
};
