/* eslint-disable new-cap */
import React from 'react';

// eslint-disable-next-line camelcase
import {Noto_Sans} from 'next/font/google';
import {notFound} from 'next/navigation';
import {useLocale} from 'next-intl';
import {getTranslator} from 'next-intl/server';

import {LocaleLayoutProps} from '@/types/next/layout';
import {GenerateMetadata} from '@/types/next/metadata';

import './globals.css';


const font = Noto_Sans({
  weight: '500',
  subsets: ['latin'],
});

export const generateMetadata: GenerateMetadata = async ({params}) => {
  const {locale} = params;
  const t = await getTranslator(locale, 'UI.Metadata');

  return {
    title: t('Title'),
    colorScheme: 'dark',
  };
};

const RootLayout = ({children, params}: React.PropsWithChildren<LocaleLayoutProps>) => {
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale} className="h-full">
      <body className={`${font.className} h-full w-full`}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
