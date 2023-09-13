import React from 'react';

import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Flex} from '@/components/layout/flex';
import {MapUnlockTableStylesUnlocked} from '@/ui/map/page/unlockTable/stylesUnlocked';
import {MapUnlockTableRowProps} from '@/ui/map/page/unlockTable/type';
import {toUnique} from '@/utils/array';


export const MapUnlockTableStatsRow = ({filter, accumulator}: MapUnlockTableRowProps) => {
  const {showSleepdexStats} = filter;
  const {unlockable, unlocked} = accumulator;

  const sleepTypes = toUnique([...Object.keys(unlockable), ...Object.keys(unlocked)]);

  return (
    <tr>
      <td colSpan={100}>
        <AnimatedCollapseQuick show={showSleepdexStats}>
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
        </AnimatedCollapseQuick>
      </td>
    </tr>
  );
};
