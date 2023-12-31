'use client';
import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {CompletionResultUI} from '@/components/shared/completion/main';
import {useSleepdexLookupDataCalcWorker} from '@/ui/sleepStyle/sleepdex/lookup/calc/main';
import {useSleepdexLookupFilter} from '@/ui/sleepStyle/sleepdex/lookup/filter/hook';
import {SleepdexLookupInput} from '@/ui/sleepStyle/sleepdex/lookup/filter/main';
import {SleepdexLookupResult} from '@/ui/sleepStyle/sleepdex/lookup/result/main';
import {SleepdexLookupServerDataProps} from '@/ui/sleepStyle/sleepdex/lookup/type';


export const SleepdexLookupClient = (props: SleepdexLookupServerDataProps) => {
  const [loading, setLoading] = React.useState(false);
  const {
    data,
    filter,
    setFilter,
    isIncluded,
  } = useSleepdexLookupFilter(props);
  const dataProcessed = useSleepdexLookupDataCalcWorker({
    workerOpts: {
      entries: data,
      isIncluded,
      sort: filter.sort,
    },
    setLoading,
  });

  return (
    <Flex className="gap-1.5">
      <AdsUnit/>
      <SleepdexLookupInput
        filter={filter}
        setFilter={setFilter}
        {...props}
      />
      <CompletionResultUI
        completed={dataProcessed.length}
        total={data.length}
        className="self-end"
      />
      <SleepdexLookupResult
        dataToShow={dataProcessed}
        loading={loading}
        display={filter.display}
        {...props}
      />
      <AdsUnit/>
    </Flex>
  );
};
