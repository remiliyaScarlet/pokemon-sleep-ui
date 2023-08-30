import React from 'react';

import WrenchScrewdriverIcon from '@heroicons/react/24/solid/WrenchScrewdriverIcon';
import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {Grid} from '@/components/layout/grid';
import {FeatureLink} from '@/components/shared/link/feature';
import {FeatureLinkImage} from '@/components/shared/link/featureImage';
import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';


export const TeamIndex = ({params}: DefaultPageProps) => {
  const {locale} = params;
  const t = useTranslations('UI.Metadata.Team');

  return (
    <PublicPageLayout locale={locale}>
      <Flex direction="col" center>
        <Flex direction="col" wrap center className="h-auto gap-2 md:w-1/2">
          <div className="w-full">
            <AdsUnit/>
          </div>
          <Grid className="gap-2">
            <FeatureLinkImage
              href="/team/box"
              imageSrc="/images/generic/bag.png"
              text={t('Box.Title')}
            />
            <Grid className="grid-cols-1 gap-2 xl:grid-cols-2">
              <FeatureLinkImage
                href="/team/analysis"
                imageSrc="/images/generic/pokeball.png"
                text={t('Analysis.Title')}
              />
              <FeatureLink href="/team/maker" text={t('Maker.Title')} disabled>
                <div className="h-10 w-10 p-1">
                  <WrenchScrewdriverIcon/>
                </div>
              </FeatureLink>
            </Grid>
          </Grid>
          <div className="w-full">
            <AdsUnit/>
          </div>
        </Flex>
      </Flex>
    </PublicPageLayout>
  );
};
