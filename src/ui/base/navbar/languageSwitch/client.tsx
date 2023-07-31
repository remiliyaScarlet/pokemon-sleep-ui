'use client';
import React from 'react';

import {useLocale} from 'next-intl';
import {usePathname} from 'next-intl/client';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {Popup} from '@/components/popup';
import {localeName} from '@/const';
import {isLocale} from '@/utils/i18n';
import {classNames} from '@/utils/react';

import styles from '../main.module.css';


export const LanguageSwitchClient = () => {
  const [show, setShow] = React.useState(false);

  const currentLocale = useLocale();
  const pathname = usePathname();

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
            <Link key={locale} href={pathname} locale={locale} className={classNames(
              'button-base flex w-full justify-center p-5 text-xl width-with-gap sm:width-with-gap-2-items',
              currentLocale === locale ? 'button-disabled' : 'button-clickable-border',
            )}>
              {name}
            </Link>
          ))}
        </Flex>
      </Popup>
    </>
  );
};
