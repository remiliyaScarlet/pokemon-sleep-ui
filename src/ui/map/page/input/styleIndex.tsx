import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/text';
import {FilterInputProps} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes, imageSmallIconSizes} from '@/styles/image';
import {SleepStyleId} from '@/types/game/sleepStyle';
import {MapPageFilter} from '@/ui/map/page/type';


type Props = FilterInputProps<MapPageFilter> & {
  sleepStyles: SleepStyleId[],
};

export const MapInputSleepStyleToggle = (props: Props) => {
  const {filter, setFilter, sleepStyles} = props;

  const t = useTranslations('UI.InPage.Map');

  return (
    <FilterTextInput
      title={
        <Flex direction="row" center>
          <div className="relative h-8 w-8">
            <NextImage
              src="/images/generic/sleep.png" alt={t('SleepStyle')}
              sizes={imageIconSizes} className="invert-on-light"
            />
          </div>
        </Flex>
      }
      idToItemId={(id) => `SleepStyle-${id}`}
      idToButton={(id) => {
        if (id === 'onSnorlax') {
          return (
            <div className="relative h-6 w-6">
              <NextImage src="/images/generic/snorlax.png" alt={id} sizes={imageSmallIconSizes}/>
            </div>
          );
        }

        return `#${id}`;
      }}
      ids={sleepStyles}
      {...getMultiSelectOnClickProps({
        filter,
        setFilter,
        filterKey: 'sleepStyle',
      })}
    />
  );
};
