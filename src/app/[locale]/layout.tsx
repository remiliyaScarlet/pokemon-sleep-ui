/* eslint-disable new-cap */
import React from 'react';

import {clsx} from 'clsx';
// eslint-disable-next-line camelcase
import {Noto_Sans} from 'next/font/google';
import {notFound} from 'next/navigation';
import Script from 'next/script';

import {locales} from '@/const/website';
import {LocaleLayoutProps} from '@/types/next/layout';
import {Providers} from '@/ui/base/providers';
import {isProduction} from '@/utils/environment';
import {isLocale} from '@/utils/i18n';

import '../globals.css';
import '@/polyfills';


export const generateStaticParams = async () => {
  return locales.map((locale) => ({locale}));
};

const font = Noto_Sans({
  weight: '400',
  subsets: ['latin'],
});

const RootLayout = ({children, params}: React.PropsWithChildren<LocaleLayoutProps>) => {
  const {locale} = params;

  // Show a 404 error if the user requests an unknown locale
  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale} className="h-full" suppressHydrationWarning>
      {/* Google Analytics */}
      {isProduction() &&
        <>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-2LL7T4CCZP"/>
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
     
              gtag('config', 'G-2LL7T4CCZP');
            `}
          </Script>
        </>}
      <body className={clsx('h-full overflow-hidden', font.className)}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
