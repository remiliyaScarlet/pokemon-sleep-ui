import React from 'react';

import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {FeatureLinkImage} from '@/components/shared/link/featureImage';
import {NavEntryLink} from '@/types/nav';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';


type Props = {
  pageProps: DefaultPageProps,
  entries: NavEntryLink[],
};

export const PageIndex = ({pageProps, entries}: Props) => {
  const {params} = pageProps;
  const {locale} = params;
  const t = useTranslations('UI.Metadata');

  return (
    <PublicPageLayout locale={locale}>
      <Flex center>
        <Flex wrap center className="h-auto gap-2 md:w-1/2">
          <div className="w-full">
            <AdsUnit/>
          </div>
          <Grid className="grid-cols-1 gap-2">
            {entries.map(({i18nTextId, ...props}) => (
              <FeatureLinkImage key={i18nTextId} text={t(i18nTextId)} {...props}/>
            ))}
          </Grid>
          <div className="w-full">
            <AdsUnit/>
          </div>
        </Flex>
      </Flex>
    </PublicPageLayout>
  );
};
