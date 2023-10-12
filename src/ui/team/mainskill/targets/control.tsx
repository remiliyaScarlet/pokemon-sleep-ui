import React from 'react';

import Bars3BottomLeftIcon from '@heroicons/react/24/solid/Bars3BottomLeftIcon';
import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  onSort: () => void,
  disableSort: boolean,
};

export const SkillTriggerAnalysisTargetControl = ({onSort, disableSort}: Props) => {
  return (
    <Flex className="items-end">
      <button onClick={onSort} disabled={disableSort} className={clsx(
        'enabled:button-clickable-bg disabled:button-disabled h-9 w-9 p-1',
      )}>
        <Bars3BottomLeftIcon/>
      </button>
    </Flex>
  );
};
