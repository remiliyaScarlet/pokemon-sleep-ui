import React from 'react';

import {PageLayout} from '@/ui/base/layout/common';
import {UiPageProps} from '@/ui/base/layout/type';


export const PublicPageLayout = ({children, ...props}: React.PropsWithChildren<UiPageProps>) => {
  return (
    <PageLayout {...props}>
      {children}
    </PageLayout>
  );
};
