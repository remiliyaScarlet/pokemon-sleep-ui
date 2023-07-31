'use client';
import React from 'react';

import {useTranslations} from 'next-intl';

import {AdsHomepage} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {FeatureLink} from '@/components/shared/link/feature';
import {useNavEntries} from '@/hooks/nav';


export const HomeClient = () => {
  const t = useTranslations('UI.Metadata');
  const t2 = useTranslations('UI.InPage.Home');

  const entries = useNavEntries();

  return (
    <>
      <AdsHomepage/>
      <Flex direction="row" center className="h-28 gap-1.5 text-2xl">
        {t2('Welcome')}
      </Flex>
      <Flex direction="row" center wrap className="h-auto gap-2 md:h-full md:px-10">
        {entries.map(({i18nTextId, ...props}) => {
          return (
            <div key={i18nTextId} className="width-with-gap md:width-with-gap-2-items">
              <FeatureLink text={t(i18nTextId)} {...props}/>
            </div>
          );
        })}
      </Flex>
    </>
  );
};
