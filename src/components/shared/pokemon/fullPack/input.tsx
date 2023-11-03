import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {getTextFilterButtonClass} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';


type Props = {
  idPrefix: string,
  title: string,
  alwaysFullPack: boolean | null,
  setAlwaysFullPack: (updated: boolean | null) => void,
};

export const PokemonIntentionalFullPackInput = ({idPrefix, title, alwaysFullPack, setAlwaysFullPack}: Props) => {
  const t = useTranslations('UI.Common');

  // Checks have to be exact comparison because of the possible `null` on `alwaysFullPack`
  return (
    <InputRowWithTitle title={<div className="px-1">{title}</div>} className="px-2" noFixedTitleWidth>
      <ToggleButton
        id={`${idPrefix}FullPackDefault`}
        active={alwaysFullPack === null}
        onClick={() => setAlwaysFullPack(null)}
        className={clsx('group', getTextFilterButtonClass(alwaysFullPack === null))}
      >
        {t('Default')}
      </ToggleButton>
      <ToggleButton
        id={`${idPrefix}FullPackActive`}
        active={alwaysFullPack === true}
        onClick={() => setAlwaysFullPack(true)}
        className={clsx('group', getTextFilterButtonClass(alwaysFullPack === true))}
      >
        <CheckCircleIcon className="h-6 w-6"/>
      </ToggleButton>
      <ToggleButton
        id={`${idPrefix}FullPackInactive`}
        active={alwaysFullPack === false}
        onClick={() => setAlwaysFullPack(false)}
        className={clsx('group', getTextFilterButtonClass(alwaysFullPack === false))}
      >
        <XCircleIcon className="h-6 w-6"/>
      </ToggleButton>
    </InputRowWithTitle>
  );
};
