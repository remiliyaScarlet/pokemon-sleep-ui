import React from 'react';

import {PageLayout} from '@/ui/base/layout/common';
import {PageProps} from '@/ui/base/layout/type';


export const PublicPageLayout = ({announcement, children}: React.PropsWithChildren<PageProps>) => {
  return (
    <PageLayout announcement={announcement}>
      {children}
    </PageLayout>
  );
};
