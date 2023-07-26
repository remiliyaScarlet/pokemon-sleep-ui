'use client';
import React from 'react';

import Link from 'next/link';
import {usePathname} from 'next-intl/client';

import {Flex} from '@/components/layout/flex';
import {Popup} from '@/components/popup';
import {localeName} from '@/const';
import {buttonStyle} from '@/styles/classes';
import {isLocale} from '@/utils/i18n';
import {classNames} from '@/utils/react';


type Props = {
  locale: string,
};

export const LanguageSwitchClient = ({locale}: Props) => {
  const [show, setShow] = React.useState(false);

  const pathname = usePathname();

  // Putting locale manually in `href` because putting in `locale` doesn't work
  return (
    <>
      <button
        className={classNames('text-sm px-2.5', ...Object.values(buttonStyle))}
        onClick={() => setShow(true)}
      >
        {isLocale(locale) ? localeName[locale] : `(${locale})`}
      </button>
      <Popup show={show} setShow={setShow}>
        <Flex direction="row" center wrap className="gap-2">
          {Object.entries(localeName).map(([locale, name]) => (
            <Link
              key={locale}
              locale={false}
              href={`/${locale}${pathname}`}
              className={classNames(
                'flex w-full justify-center p-5 text-xl width-with-gap sm:width-with-gap-2-items',
                buttonStyle.base,
                buttonStyle.border,
                buttonStyle.background,
                buttonStyle.text,
                buttonStyle.textHover,
              )}
            >
              {name}
            </Link>
          ))}
        </Flex>
      </Popup>
    </>
  );
};
