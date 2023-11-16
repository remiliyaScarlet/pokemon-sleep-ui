import React from 'react';

import {useBeforeunload} from 'react-beforeunload';

import {usePathname, useRouter} from '@/components/i18n/exports';


export const useOnBeforeUnload = () => {
  const {replace} = useRouter();
  const pathname = usePathname();

  useBeforeunload((e) => e.preventDefault());

  React.useEffect(() => {
    const handler = () => {
      if (confirm('Reload?')) {
        return;
      }
      replace(pathname);
    };

    window.addEventListener('popstate', handler, false);

    return () => window.removeEventListener('popstate', handler);
  }, []);
};
