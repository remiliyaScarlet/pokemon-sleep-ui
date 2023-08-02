import React from 'react';

import WrenchScrewdriverIcon from '@heroicons/react/24/solid/WrenchScrewdriverIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {FeatureLink} from '@/components/shared/link/feature';
import {FeatureLinkImage} from '@/components/shared/link/featureImage';
import {PageLayout} from '@/ui/base/layout';


export const TeamIndex = () => {
  const t = useTranslations('UI.Metadata.Team');

  return (
    <PageLayout>
      <Flex direction="col" center className="h-auto gap-2 md:mt-40">
        <div className="width-with-gap md:width-with-gap-2-items">
          <FeatureLinkImage
            href="/energy/analysis"
            imageSrc="/images/generic/pokeball.png"
            text={t('Analysis.Title')}
          />
        </div>
        <div className="width-with-gap md:width-with-gap-2-items">
          <FeatureLink href="/energy/optimizer" text={t('Optimizer.Title')} disabled>
            <div className="h-10 w-10 p-1">
              <WrenchScrewdriverIcon/>
            </div>
          </FeatureLink>
        </div>
      </Flex>
    </PageLayout>
  );
};
