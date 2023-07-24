/* eslint-disable new-cap */
import React from 'react';

// eslint-disable-next-line camelcase
import {Noto_Sans} from 'next/font/google';
import {notFound} from 'next/navigation';
import {useLocale} from 'next-intl';

import {LocaleLayoutProps} from '@/types/next/layout';
import {Providers} from '@/ui/base/providers';
import './globals.css';


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
    <html lang={locale} className="h-full">
      <body className={`${font.className} h-full w-full overflow-x-hidden`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
