import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {DefaultPageProps} from '@/types/next/page';
import {AuthLayout} from '@/ui/auth/common/layout';
import {getI18nTranslator} from '@/utils/i18n';


export const AuthVerifyRequest = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const t = await getI18nTranslator({locale, namespace: 'UI.Auth'});

  return (
    <AuthLayout locale={locale}>
      <Flex direction="col" center className="info-section">
        {t('EmailSent')}
      </Flex>
    </AuthLayout>
  );
};
