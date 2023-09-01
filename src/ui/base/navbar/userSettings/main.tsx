import React from 'react';

import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon';
import {clsx} from 'clsx';
import {Session} from 'next-auth';
import {useLocale} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {Grid} from '@/components/layout/grid';
import {Popup} from '@/components/popup';
import {localeName} from '@/const/website';
import {useLanguageSwitch} from '@/ui/base/navbar/languageSwitch/hook';


type Props = {
  session: Session,
};

export const UserSettings = ({}: Props) => {
  const [show, setShow] = React.useState(false);
  const {isPending, onLocaleSwitch} = useLanguageSwitch();

  const currentLocale = useLocale();

  return (
    <>
      <button className="button-clickable-bg nav-height w-8 p-1" onClick={() => setShow(true)}>
        <Cog6ToothIcon/>
      </button>
      <Popup show={show} setShow={setShow}>
        <Flex direction="col" className="gap-1 sm:w-[70vw]">
          <Grid className="auto-cols-fr grid-cols-3 gap-2 lg:grid-flow-col lg:grid-cols-none lg:grid-rows-1">
            {Object.entries(localeName).map(([locale, name]) => (
              <button
                key={locale}
                disabled={isPending || currentLocale === locale}
                onClick={() => onLocaleSwitch(locale)}
                className={clsx(
                  'button-base p-3',
                  'enabled:button-clickable-bg disabled:button-disabled-border',
                )}
              >
                {name}
              </button>
            ))}
          </Grid>
        </Flex>
      </Popup>
    </>
  );
};
