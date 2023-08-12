import React from 'react';

import {BerryPageParams} from '@/app/[locale]/berry/[id]/page';
import {PageLayout} from '@/ui/base/layout';


type Props = {
  params: BerryPageParams,
};

export const BerryPage = ({}: Props) => {
  return (
    <PageLayout>
    </PageLayout>
  );
};
