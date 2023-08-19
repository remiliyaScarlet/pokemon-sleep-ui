import React from 'react';

import {PageLayout} from '@/ui/base/layout/common';
import {UiPageProps} from '@/ui/base/layout/type';


export const PublicPageLayout = ({announcement, children}: React.PropsWithChildren<UiPageProps>) => {
  return (
    <PageLayout announcement={announcement}>
      {children}
    </PageLayout>
  );
};
