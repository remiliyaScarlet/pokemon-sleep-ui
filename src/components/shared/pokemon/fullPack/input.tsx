import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {getTextFilterButtonClass} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';


type Props = {
  title: string,
  alwaysFullPack: boolean | null,
  setAlwaysFullPack: (updated: boolean | null) => void,
};

export const PokemonIntentionalFullPackInput = ({title, alwaysFullPack, setAlwaysFullPack}: Props) => {
  const t = useTranslations('UI.Common');

  // Checks have to be exact comparison because of the possible `null` on `alwaysFullPack`
  return (
    <InputRowWithTitle
      title={<div className="px-1">{title}</div>}
      noFixedTitleWidth className="px-2"
      directionOverrideClassName="md:flex-row"
    >
      <Flex direction="row" className="justify-center gap-1 md:justify-start">
        <ToggleButton
          active={alwaysFullPack === null}
          onClick={() => setAlwaysFullPack(null)}
          className={clsx('group', getTextFilterButtonClass(alwaysFullPack === null))}
        >
          {t('Default')}
        </ToggleButton>
        <ToggleButton
          active={alwaysFullPack === true}
          onClick={() => setAlwaysFullPack(true)}
          className={clsx('group', getTextFilterButtonClass(alwaysFullPack === true))}
        >
          <CheckCircleIcon className="h-6 w-6"/>
        </ToggleButton>
        <ToggleButton
          active={alwaysFullPack === false}
          onClick={() => setAlwaysFullPack(false)}
          className={clsx('group', getTextFilterButtonClass(alwaysFullPack === false))}
        >
          <XCircleIcon className="h-6 w-6"/>
        </ToggleButton>
      </Flex>
    </InputRowWithTitle>
  );
};
