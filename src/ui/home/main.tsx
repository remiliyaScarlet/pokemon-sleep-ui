import React from 'react';

import {useTranslations} from 'next-intl';

import {Row} from '@/components/layout/row';
import {PageLayout} from '@/ui/base/layout';
import {NavEntries} from '@/ui/base/navbar/const';
import {HomePageLink} from '@/ui/home/link';


export const Home = () => {
  const t = useTranslations('UI.Metadata');

  return (
    <PageLayout>
      <Row className="h-full items-center justify-center">
        {NavEntries.map(({href, imageSrc, i18nTextId}) => {
          return (
            <div key={i18nTextId}>
              <HomePageLink href={href} imageSrc={imageSrc} text={t(i18nTextId)}/>
            </div>
          );
        })}
      </Row>
    </PageLayout>
  );
};
