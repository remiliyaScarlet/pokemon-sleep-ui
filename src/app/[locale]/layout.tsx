/* eslint-disable new-cap */
import React from 'react';

// eslint-disable-next-line camelcase
import {Noto_Sans} from 'next/font/google';
import {notFound} from 'next/navigation';
import Script from 'next/script';
import {useLocale} from 'next-intl';

import {adsClientId} from '@/components/ads/const';
import {LocaleLayoutProps} from '@/types/next/layout';
import {Providers} from '@/ui/base/providers';
import {isProduction} from '@/utils/environment';
import {classNames} from '@/utils/react';

import '../globals.css';


const font = Noto_Sans({
  weight: '400',
  subsets: ['latin'],
});

const RootLayout = ({children, params}: React.PropsWithChildren<LocaleLayoutProps>) => {
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale} className="h-full" suppressHydrationWarning>
      {/* Google AdSense */}
      {isProduction() &&
        <Script
          async
          strategy="lazyOnload"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsClientId}`}
          crossOrigin="anonymous"
        />}
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
      <body className={classNames(font.className, 'h-full w-full overflow-x-hidden')}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
