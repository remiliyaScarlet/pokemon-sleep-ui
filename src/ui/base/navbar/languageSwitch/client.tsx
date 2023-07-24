'use client';
import React from 'react';

import {usePathname, useRouter} from 'next-intl/client';

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
  const router = useRouter();

  const onLocaleClicked = (locale: string) => () => {
    router.replace(pathname, {locale});
  };

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
            <div key={locale} className="width-with-gap sm:width-with-gap-2-items">
              <button
                className={classNames(
                  'text-xl p-5 w-full',
                  buttonStyle.base,
                  buttonStyle.border,
                  buttonStyle.background,
                  buttonStyle.text,
                )}
                onClick={onLocaleClicked(locale)}
              >
                {name}
              </button>
            </div>
          ))}
        </Flex>
      </Popup>
    </>
  );
};
