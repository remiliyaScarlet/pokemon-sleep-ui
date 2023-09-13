import React from 'react';

import {Flex} from '@/components/layout/flex';
import {MapUnlockTableStylesUnlocked} from '@/ui/map/page/unlockTable/stylesUnlocked';
import {MapUnlockTableRowProps} from '@/ui/map/page/unlockTable/type';
import {toUnique} from '@/utils/array';


export const MapUnlockTableStatsRow = ({accumulator}: MapUnlockTableRowProps) => {
  const {unlockable, unlocked} = accumulator;

  const sleepTypes = toUnique([...Object.keys(unlockable), ...Object.keys(unlocked)]);

  return (
    <tr className="border-b border-b-gray-700 text-center last:border-b-0">
      <td colSpan={100}>
        <Flex direction="col" center className="gap-0.5 p-1 sm:flex-row">
          {sleepTypes.map(Number).map((sleepType) => {
            return (
              <MapUnlockTableStylesUnlocked
                key={sleepType}
                sleepType={sleepType}
                unlocked={unlocked[sleepType]}
                unlockable={unlockable[sleepType]}
              />
            );
          })}
        </Flex>
      </td>
    </tr>
  );
};
