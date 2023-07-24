'use client';
import React from 'react';

import {ThemeProvider} from 'next-themes';

import {Loading} from '@/components/icons/loading';


export const Providers = ({children}: React.PropsWithChildren) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Loading/>;
  }

  return (
    <ThemeProvider attribute="class">
      {children}
    </ThemeProvider>
  );
};
