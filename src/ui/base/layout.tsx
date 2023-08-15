import React from 'react';

import {Toaster} from 'react-hot-toast';

import {Announcements} from '@/components/announcement/main';
import {Flex} from '@/components/layout/flex';
import {NavBar} from '@/ui/base/navbar/main';


type Props = {
  announcement?: boolean,
};

export const PageLayout = ({announcement = true, children}: React.PropsWithChildren<Props>) => {
  return (
    <main className="min-h-full w-full">
      <Toaster position="bottom-center" toastOptions={{duration: 3000}}/>
      <NavBar/>
      <Flex direction="col" className="gap-1.5 p-2">
        {announcement && <Announcements/>}
        {children}
      </Flex>
    </main>
  );
};
