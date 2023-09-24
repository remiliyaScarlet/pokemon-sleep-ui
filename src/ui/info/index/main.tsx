import React from 'react';

import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {Grid} from '@/components/layout/grid';
import {FeatureLinkImage} from '@/components/shared/link/featureImage';
import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';


export const InfoIndex = ({params}: DefaultPageProps) => {
  const {locale} = params;
  const t = useTranslations('UI.Metadata.Info');

  return (
    <PublicPageLayout locale={locale}>
      <Flex direction="col" center>
        <Flex direction="col" wrap center className="h-auto gap-2 md:w-1/2">
          <div className="w-full">
            <AdsUnit/>
          </div>
          <Grid className="grid-cols-1 gap-2 xl:grid-cols-2">
            <FeatureLinkImage
              href="/info/pot"
              imageSrc="/images/generic/pot.png"
              text={t('Pot.Title')}
            />
            <FeatureLinkImage
              href="/info/nature"
              imageSrc="/images/generic/memo.png"
              text={t('Nature.Title')}
            />
            <FeatureLinkImage
              href="/info/mainskill"
              imageSrc="/images/generic/mainSkill.png"
              text={t('MainSkill.Index.Title')}
            />
            <FeatureLinkImage
              href="/info/subskill"
              imageSrc="/images/generic/subSkill.png"
              text={t('SubSkill.Title')}
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
