import React from 'react';

import WrenchScrewdriverIcon from '@heroicons/react/24/solid/WrenchScrewdriverIcon';
import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {FeatureLink} from '@/components/shared/link/feature';
import {FeatureLinkImage} from '@/components/shared/link/featureImage';
import {PageLayout} from '@/ui/base/layout';


export const TeamIndex = () => {
  const t = useTranslations('UI.Metadata.Team');

  return (
    <PageLayout>
      <Flex direction="col" center>
        <Flex direction="col" wrap center className="h-auto gap-2 md:mt-32 md:w-1/2">
          <div className="w-full">
            <AdsUnit/>
          </div>
          <Flex direction="row" wrap className="gap-2">
            <div className="width-with-gap xl:width-with-gap-2-items">
              <FeatureLinkImage
                href="/team/analysis"
                imageSrc="/images/generic/pokeball.png"
                text={t('Calculate.Title')}
              />
            </div>
            <div className="width-with-gap xl:width-with-gap-2-items">
              <FeatureLink href="/team/maker" text={t('Maker.Title')} disabled>
                <div className="h-10 w-10 p-1">
                  <WrenchScrewdriverIcon/>
                </div>
              </FeatureLink>
            </div>
            <div className="width-with-gap">
              <FeatureLinkImage
                href="/team/box"
                imageSrc="/images/generic/bag.png"
                text={t('Box.Title')}
                disabled
              />
            </div>
          </Flex>
          <div className="w-full">
            <AdsUnit/>
          </div>
        </Flex>
      </Flex>
    </PageLayout>
  );
};
