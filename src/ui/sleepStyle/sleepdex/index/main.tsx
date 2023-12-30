import React from 'react';

import {navEntriesForSleepdex} from '@/const/nav/sleepStyle/sleepdex';
import {DefaultPageProps} from '@/types/next/page/common';
import {PageIndex} from '@/ui/base/pageIndex';


export const SleepdexIndex = (pageProps: DefaultPageProps) => {
  return <PageIndex pageProps={pageProps} entries={navEntriesForSleepdex}/>;
};
