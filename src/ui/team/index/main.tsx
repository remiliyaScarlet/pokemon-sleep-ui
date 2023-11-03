import React from 'react';

import {navEntriesForTeam} from '@/const/nav/team';
import {DefaultPageProps} from '@/types/next/page/common';
import {PageIndex} from '@/ui/base/pageIndex';


export const TeamIndex = (pageProps: DefaultPageProps) => {
  return <PageIndex pageProps={pageProps} entries={navEntriesForTeam}/>;
};
