import React from 'react';

import {getTranslator} from 'next-intl/server';

import {Flex} from '@/components/layout/flex';
import {PageParams, PageProps} from '@/types/next/page';
import {AuthLayout} from '@/ui/auth/common/layout';


export const AuthVerifyRequest = async ({params}: PageProps<PageParams>) => {
  const t = await getTranslator(params.locale, 'UI.Auth');

  return (
    <AuthLayout>
      <Flex direction="col" center className="info-section">
        {t('EmailSent')}
      </Flex>
    </AuthLayout>
  );
};
