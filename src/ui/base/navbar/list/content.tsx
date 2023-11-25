'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {AdsGap} from '@/components/ads/gap';
import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {useNavEntries} from '@/hooks/nav';
import {NavListHome} from '@/ui/base/navbar/list/entry/home';
import {NavListEntry} from '@/ui/base/navbar/list/entry/main';


export const NavListContent = () => {
  const entries = useNavEntries();
  const {data} = useSession();

  return (
    <Flex noFullWidth className="info-section-opaque h-full gap-1.5 overflow-y-auto p-4">
      <NavListHome/>
      <AdsUnit alwaysSingle/>
      {entries.map((entry) => <NavListEntry key={entry.i18nTextId} entry={entry}/>)}
      <AdsUnit alwaysSingle/>
      <AdsGap show={!data?.user.activation?.adsFree}/>
    </Flex>
  );
};
