import React from 'react';

import Script from 'next/script';
import {getServerSession} from 'next-auth';
import {Toaster} from 'react-hot-toast';

import {adsClientId} from '@/components/ads/const';
import {Announcements} from '@/components/announcement/main';
import {Flex} from '@/components/layout/flex';
import {authOptions} from '@/const/auth';
import {PageProps} from '@/ui/base/layout/type';
import {NavBar} from '@/ui/base/navbar/main';
import {isProduction} from '@/utils/environment';


export const PageLayout = ({announcement = true, children}: React.PropsWithChildren<PageProps>) => {
  const session = React.use(getServerSession(authOptions));

  return (
    <main className="min-h-full w-full">
      {/* Google AdSense */}
      {isProduction() && !session?.user.isAdsFree &&
        <Script
          async
          strategy="lazyOnload"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsClientId}`}
          crossOrigin="anonymous"
        />}
      <Toaster position="bottom-center" toastOptions={{duration: 3000}}/>
      <NavBar/>
      <Flex direction="col" className="gap-1.5 p-2">
        {announcement && <Announcements/>}
        {children}
      </Flex>
    </main>
  );
};
