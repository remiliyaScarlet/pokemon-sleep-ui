import React from 'react';

import {usePathname} from 'next/navigation';


export const usePageView = () => {
  const pathname = usePathname();

  React.useEffect(() => {
    // @ts-ignore
    window.gtag('event', 'page_view');
  }, [pathname]);
};
