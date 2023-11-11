import React from 'react';

import {MapIndex} from '@/components/shared/sleepStyle/index/main';
import {getSleepStyleNormalUniqueByMap} from '@/controller/sleepStyle';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';


export const MapUniqueIndex = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <PublicPageLayout locale={locale}>
      <MapIndex getDataPromise={getSleepStyleNormalUniqueByMap} isUnique/>
    </PublicPageLayout>
  );
};
