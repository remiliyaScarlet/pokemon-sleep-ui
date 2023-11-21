import React from 'react';

import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon';
import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/text';
import {Flex} from '@/components/layout/flex/common';
import {displayTypeToI18nId} from '@/components/shared/sleepStyle/page/input/const';
import {MapInputCommonProps} from '@/components/shared/sleepStyle/page/input/type';
import {MapPageFilter, mapUnlockTableDisplayType} from '@/components/shared/sleepStyle/page/type';


export const MapInputDisplayType = ({filter, setFilter}: MapInputCommonProps) => {
  const t = useTranslations('UI.InPage');

  return (
    <FilterTextInput
      onClick={(displayType) => setFilter((original) => ({
        ...original,
        displayType,
      } satisfies MapPageFilter))}
      isActive={(display) => filter.displayType === display}
      title={
        <Flex direction="row" center>
          <InformationCircleIcon className="h-6 w-6"/>
        </Flex>
      }
      ids={[...mapUnlockTableDisplayType]}
      idToButton={(display) => t(displayTypeToI18nId[display])}
    />
  );
};
