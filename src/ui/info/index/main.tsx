import React from 'react';

import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {FeatureLinkImage} from '@/components/shared/link/featureImage';
import {PageLayout} from '@/ui/base/layout';


export const InfoIndex = () => {
  const t = useTranslations('UI.Metadata.Info');

  return (
    <PageLayout>
      <Flex direction="col" center>
        <Flex direction="col" wrap center className="h-auto gap-2 md:w-1/2">
          <div className="w-full">
            <AdsUnit/>
          </div>
          <Flex direction="row" wrap className="gap-2">
            <div className="width-with-gap">
              <FeatureLinkImage
                href="/info/pot"
                imageSrc="/images/generic/pot.png"
                text={t('Pot.Title')}
              />
            </div>
            <div className="width-with-gap xl:width-with-gap-2-items">
              <FeatureLinkImage
                href="/info/pot"
                imageSrc="/images/generic/memo.png"
                text={t('Nature.Title')}
                disabled
              />
            </div>
            <div className="width-with-gap xl:width-with-gap-2-items">
              <FeatureLinkImage
                href="/info/subskill"
                imageSrc="/images/generic/skill.png"
                text={t('SubSkill.Title')}
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
