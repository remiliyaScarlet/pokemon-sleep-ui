import React from 'react';

import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Flex} from '@/components/layout/flex';
import {MapUnlockTableStylesUnlocked} from '@/ui/map/page/unlockTable/stylesUnlocked';
import {MapUnlockTableRowProps} from '@/ui/map/page/unlockTable/type';
import {toSum, toUnique} from '@/utils/array';
import {isNotNullish} from '@/utils/type';


export const MapUnlockTableSleepdexStats = ({filter, accumulator}: MapUnlockTableRowProps) => {
  const {showSleepdexStats} = filter;
  const {unlockable, unlocked} = accumulator;

  const sleepTypes = toUnique([...Object.keys(unlockable), ...Object.keys(unlocked)]);

  return (
    <AnimatedCollapseQuick show={showSleepdexStats}>
      <Flex direction="row" wrap className="items-center justify-end gap-x-2 gap-y-1 p-1">
        {sleepTypes.map(Number).map((sleepType) => (
          <MapUnlockTableStylesUnlocked
            key={sleepType}
            sleepType={sleepType}
            unlocked={unlocked[sleepType]}
            unlockable={unlockable[sleepType]}
          />
        ))}
        <MapUnlockTableStylesUnlocked
          sleepType={null}
          unlocked={toSum(Object.values(unlocked).filter(isNotNullish))}
          unlockable={toSum(Object.values(unlockable).filter(isNotNullish))}
        />
      </Flex>
    </AnimatedCollapseQuick>
  );
};
