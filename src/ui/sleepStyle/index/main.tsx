import React from 'react';

import {navEntriesForSleepStyle} from '@/const/nav/sleepStyle/main';
import {DefaultPageProps} from '@/types/next/page/common';
import {PageIndex} from '@/ui/base/pageIndex';


export const SleepStyleIndex = (pageProps: DefaultPageProps) => {
  return <PageIndex pageProps={pageProps} entries={navEntriesForSleepStyle}/>;
};
