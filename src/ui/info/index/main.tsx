import React from 'react';

import {navEntriesForInfo} from '@/const/nav/info';
import {DefaultPageProps} from '@/types/next/page';
import {PageIndex} from '@/ui/base/pageIndex';


export const InfoIndex = (pageProps: DefaultPageProps) => {
  return <PageIndex pageProps={pageProps} entries={navEntriesForInfo}/>;
};
