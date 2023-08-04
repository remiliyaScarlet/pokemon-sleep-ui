'use client';
import React from 'react';

import {ThemeProvider} from 'next-themes';

import {Loading} from '@/components/icons/loading';
import {useMounted} from '@/hooks/mounted';


export const Providers = ({children}: React.PropsWithChildren) => {
  const {mounted} = useMounted();

  if (!mounted) {
    return (
      <div className="h-screen">
        <Loading/>
      </div>
    );
  }

  return (
    <ThemeProvider attribute="class">
      {children}
    </ThemeProvider>
  );
};
