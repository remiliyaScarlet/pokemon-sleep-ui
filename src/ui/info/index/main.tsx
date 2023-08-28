import React from 'react';

import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
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
                imageSrc="/images/generic/subSkill.png"
                text={t('SubSkill.Title')}
              />
            </div>
          </Flex>
          <div className="w-full">
            <AdsUnit/>
          </div>
        </Flex>
      </Flex>
    </PublicPageLayout>
  );
};
