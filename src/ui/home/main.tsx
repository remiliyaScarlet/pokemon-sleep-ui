import React from 'react';

import {useTranslations} from 'next-intl';

import {AdsHomepage} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {PageLayout} from '@/ui/base/layout';
import {navEntries} from '@/ui/base/navbar/const';
import {HomePageLink} from '@/ui/home/link';


export const Home = () => {
  const t = useTranslations('UI.Metadata');
  const t2 = useTranslations('UI.InPage.Home');

  return (
    <PageLayout>
      <Flex direction="row" center className="h-28 gap-1.5 text-2xl">
        {t2('Welcome')}
      </Flex>
      <Flex direction="row" center wrap className="h-auto gap-2 md:h-full md:px-10">
        {navEntries.map(({i18nTextId, ...props}) => {
          return (
            <div key={i18nTextId} className="width-with-gap md:width-with-gap-2-items">
              <HomePageLink text={t(i18nTextId)} {...props}/>
            </div>
          );
        })}
      </Flex>
      <AdsHomepage/>
    </PageLayout>
  );
};
