import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {SleepdexLookupSortType} from '@/ui/sleepStyle/sleepdex/lookup/filter/type';
import {SleepdexLookupSortTypeIcon} from '@/ui/sleepStyle/sleepdex/lookup/sort/icon';
import {useSleepdexLookupSortTypeText} from '@/ui/sleepStyle/sleepdex/lookup/sort/text';


type Props = {
  sort: SleepdexLookupSortType,
};

export const SleepdexLookupSortTypeUi = ({sort}: Props) => {
  const text = useSleepdexLookupSortTypeText(sort);

  return (
    <Flex direction="row" center noFullWidth className="gap-1">
      <SleepdexLookupSortTypeIcon sort={sort}/>
      <div>{text}</div>
    </Flex>
  );
};
