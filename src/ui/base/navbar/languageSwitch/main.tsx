'use client';
import React from 'react';

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from 'next-intl/client';

import {Flex} from '@/components/layout/flex';
import {Popup} from '@/components/popup';
import {localeName} from '@/const/website';
import {isLocale} from '@/utils/i18n';
import {classNames} from '@/utils/react';


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
        <Flex direction="row" center wrap className="gap-2">
          {Object.entries(localeName).map(([locale, name]) => (
            <button
              key={locale}
              disabled={isPending || currentLocale === locale}
              onClick={() => onClick(locale)}
              className={classNames(
                'flex button-base w-full justify-center p-5 width-with-gap sm:width-with-gap-2-items text-xl',
                'disabled:button-disabled-border enabled:button-clickable-bg',
              )}
            >
              {name}
            </button>
          ))}
        </Flex>
      </Popup>
    </>
  );
};
