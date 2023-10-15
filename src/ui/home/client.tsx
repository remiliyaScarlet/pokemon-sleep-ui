'use client';
import React from 'react';

import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {FeatureLinkImage} from '@/components/shared/link/featureImage';
import {useNavEntries} from '@/hooks/nav';
import {HomePokeball} from '@/ui/home/pokeball';
import {HomeUserCount} from '@/ui/home/userCount';


type Props = {
  userCount: number,
};

export const HomeClient = ({userCount}: Props) => {
  const t = useTranslations('UI.Metadata');

  const entries = useNavEntries();

  return (
    <Flex className="gap-2 md:h-full md:px-10">
      <Flex className="relative">
        <HomePokeball/>
        <div className="absolute bottom-0 right-0">
          <HomeUserCount userCount={userCount}/>
        </div>
      </Flex>
      <AdsUnit/>
      <Flex direction="row" center wrap className="h-auto gap-2">
        {entries.map((opts) => {
          const {i18nTextId} = opts;

          // `showInHome` being `undefined` (falsy) should be treated as `true`
          if (opts.type === 'link' && opts.showInHome === false) {
            return null;
          }

          return (
            <div key={i18nTextId} className="width-with-gap md:width-with-gap-2-items">
              <FeatureLinkImage text={t(i18nTextId)} {...opts}/>
            </div>
          );
        })}
      </Flex>
      <AdsUnit/>
    </Flex>
  );
};
