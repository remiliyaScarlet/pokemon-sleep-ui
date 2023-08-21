'use client';
import React from 'react';

import {clsx} from 'clsx';
import {useLocale} from 'next-intl';
import {usePathname, useRouter} from 'next-intl/client';

import {Grid} from '@/components/layout/grid';
import {Popup} from '@/components/popup';
import {localeName} from '@/const/website';
import {isLocale} from '@/utils/i18n';


export const LanguageSwitch = () => {
  const [show, setShow] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onClick = (nextLocale: string) => {
    startTransition(() => {
      router.push(pathname, {locale: nextLocale});
    });
  };

  return (
    <>
      <button className="nav-button-text" onClick={() => setShow(true)} disabled={isPending}>
        {isLocale(currentLocale) ? localeName[currentLocale] : `(${currentLocale})`}
      </button>
      <Popup show={show} setShow={setShow}>
        <Grid center className="grid-cols-1 gap-2 sm:grid-cols-2">
          {Object.entries(localeName).map(([locale, name]) => (
            <button
              key={locale}
              disabled={isPending || currentLocale === locale}
              onClick={() => onClick(locale)}
              className={clsx(
                'button-base flex w-full justify-center p-5 text-xl sm:w-48',
                'enabled:button-clickable-bg disabled:button-disabled-border',
              )}
            >
              {name}
            </button>
          ))}
        </Grid>
      </Popup>
    </>
  );
};
