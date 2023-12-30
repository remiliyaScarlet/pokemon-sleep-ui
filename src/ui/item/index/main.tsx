import React from 'react';

import {navEntriesForItem} from '@/const/nav/item';
import {DefaultPageProps} from '@/types/next/page/common';
import {PageIndex} from '@/ui/base/pageIndex';


export const ItemIndex = (pageProps: DefaultPageProps) => {
  return <PageIndex pageProps={pageProps} entries={navEntriesForItem}/>;
};
