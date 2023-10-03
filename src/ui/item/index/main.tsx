import React from 'react';

import {navEntryForItem} from '@/const/nav/item';
import {DefaultPageProps} from '@/types/next/page';
import {PageIndex} from '@/ui/base/pageIndex';


export const ItemIndex = (pageProps: DefaultPageProps) => {
  return <PageIndex pageProps={pageProps} entries={navEntryForItem}/>;
};
