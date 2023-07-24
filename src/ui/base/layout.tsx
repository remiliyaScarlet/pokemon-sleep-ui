import React from 'react';

import {NavBar} from '@/ui/base/navbar/main';


export const PageLayout = ({children}: React.PropsWithChildren) => {
  return (
    <main className="flex h-full w-full flex-col gap-1.5 bg-gradient-radial from-slate-800 to-slate-950 p-2">
      <NavBar/>
      {children}
    </main>
  );
};
