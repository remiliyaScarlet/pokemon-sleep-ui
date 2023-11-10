import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {ProgressBar} from '@/components/progressBar';
import {CompletionResultUI} from '@/components/shared/completion/main';
import {SleepdexMap} from '@/types/game/sleepdex';
import {SleepStyleNormalMap} from '@/types/game/sleepStyle';
import {getAllPossibleSleepStyles} from '@/utils/game/sleepdex';


type Props = {
  sleepStyleMap: SleepStyleNormalMap,
  sleepdex: SleepdexMap,
};

export const SleepdexUnlockedCount = ({sleepdex, sleepStyleMap}: Props) => {
  const total = React.useMemo(
    () => getAllPossibleSleepStyles(sleepStyleMap).length,
    [sleepStyleMap],
  );
  const count = React.useMemo(
    () => Object.values(sleepdex).map((unlocked) => !!unlocked).length
    , [sleepdex],
  );

  return (
    <Flex className="info-section">
      <CompletionResultUI completed={count} total={total} className="self-end"/>
      <ProgressBar percent={count / total * 100}/>
    </Flex>
  );
};
