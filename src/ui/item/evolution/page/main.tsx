import React from 'react';

import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';


export const EvolutionItemPage = ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <PublicPageLayout locale={locale}>
      TODO: Evolution Item Page
    </PublicPageLayout>
  );
};
