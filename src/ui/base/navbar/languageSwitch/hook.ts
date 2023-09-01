import React from 'react';

import {usePathname, useRouter} from 'next-intl/client';


export const useLanguageSwitch = () => {
  const [isPending, startTransition] = React.useTransition();

  const router = useRouter();
  const pathname = usePathname();

  const onLocaleSwitch = (nextLocale: string) => {
    startTransition(() => {
      router.push(pathname, {locale: nextLocale});
    });
  };

  return {isPending, onLocaleSwitch};
};
