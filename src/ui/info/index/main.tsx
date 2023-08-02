import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {FeatureLinkImage} from '@/components/shared/link/featureImage';
import {PageLayout} from '@/ui/base/layout';


export const InfoIndex = () => {
  const t = useTranslations('UI.Metadata.Info');

  return (
    <PageLayout>
      <Flex direction="col" center className="h-auto gap-2 md:mt-40">
        <div className="width-with-gap md:width-with-gap-2-items">
          <FeatureLinkImage
            href="/info/pot"
            imageSrc="/images/generic/pot.png"
            text={t('Pot.Title')}
          />
        </div>
        <div className="width-with-gap md:width-with-gap-2-items">
          <FeatureLinkImage
            href="/info/pot"
            imageSrc="/images/generic/memo.png"
            text={t('Nature.Title')}
            disabled
          />
        </div>
      </Flex>
    </PageLayout>
  );
};
