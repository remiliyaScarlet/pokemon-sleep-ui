import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {getAllMapMeta} from '@/controller/mapMeta';
import {getSleepdexMap} from '@/controller/sleepdex';
import {getSleepStyleByMaps} from '@/controller/sleepStyle';
import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {MapIndexContent} from '@/ui/map/index/content';
import {MapIndexServerDataProps} from '@/ui/map/index/type';


export const MapIndex = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const session = await getServerSession(authOptions);

  const [
    data,
    sleepdexMap,
    mapMeta,
  ] = await Promise.all([
    getSleepStyleByMaps(),
    getSleepdexMap(session?.user.id),
    getAllMapMeta(),
  ]);

  const props: MapIndexServerDataProps = {
    data,
    sleepdexMap,
    mapMeta,
  };

  return (
    <PublicPageLayout locale={locale}>
      <MapIndexContent {...props}/>
    </PublicPageLayout>
  );
};
