import React from 'react';

import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {FeatureLinkImage} from '@/components/shared/link/featureImage';
import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';


export const ItemIndex = ({params}: DefaultPageProps) => {
  const {locale} = params;
  const t = useTranslations('UI.Metadata.Item');

  return (
    <PublicPageLayout locale={locale}>
      <Flex direction="col" center>
        <Flex direction="col" wrap center className="h-auto gap-2 md:w-1/2">
          <div className="w-full">
            <AdsUnit/>
          </div>
          <Grid className="grid-rows-2 gap-2">
            <FeatureLinkImage
              href="/item/evolution"
              imageSrc="/images/generic/flash.png"
              text={t('Evolution.Title')}
            />
            <FeatureLinkImage
              href="/item/incense"
              imageSrc="/images/generic/incense.png"
              text={t('Incense.Index.Title')}
              disabled
            />
          </Grid>
          <div className="w-full">
            <AdsUnit/>
          </div>
        </Flex>
      </Flex>
    </PublicPageLayout>
  );
};
