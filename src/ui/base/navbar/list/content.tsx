import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {useNavEntries} from '@/hooks/nav';
import {NavListHome} from '@/ui/base/navbar/list/entry/home';
import {NavListEntry} from '@/ui/base/navbar/list/entry/main';


export const NavListContent = () => {
  const entries = useNavEntries();

  return (
    <Flex className="info-section-opaque h-full gap-1.5 overflow-y-scroll p-6">
      <NavListHome/>
      <HorizontalSplitter/>
      {entries.map((entry) => <NavListEntry key={entry.i18nTextId} entry={entry}/>)}
    </Flex>
  );
};
