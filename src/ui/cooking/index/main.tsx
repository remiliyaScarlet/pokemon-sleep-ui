import React from 'react';

import {navEntriesForCooking} from '@/const/nav/cooking';
import {DefaultPageProps} from '@/types/next/page';
import {PageIndex} from '@/ui/base/pageIndex';


export const CookingIndex = (pageProps: DefaultPageProps) => {
  return <PageIndex pageProps={pageProps} entries={navEntriesForCooking}/>;
};
