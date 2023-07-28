'use client';
import React from 'react';

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from 'next-intl/client';

import {Flex} from '@/components/layout/flex';
import {Popup} from '@/components/popup';
import {localeName} from '@/const';
import {isLocale} from '@/utils/i18n';
import {classNames} from '@/utils/react';

import styles from '../main.module.css';


export const LanguageSwitchClient = () => {
  const [show, setShow] = React.useState(false);

  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onClick = (nextLocale: string) => {
    router.push(pathname, {locale: nextLocale});
  };

  return (
    <>
      <button
        className={classNames('button-clickable-border text-sm px-2.5', styles['nav-button'])}
        onClick={() => setShow(true)}
      >
        {isLocale(currentLocale) ? localeName[currentLocale] : `(${currentLocale})`}
      </button>
      <Popup show={show} setShow={setShow}>
        <Flex direction="row" center wrap className="gap-2">
          {Object.entries(localeName).map(([locale, name]) => (
            <button
              key={locale}
              disabled={currentLocale === locale}
              onClick={() => onClick(locale)}
              className={classNames(
                'flex w-full justify-center p-5 text-xl width-with-gap sm:width-with-gap-2-items',
                'button-base',
                currentLocale === locale ? 'button-disabled' : 'button-clickable-border',
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
