import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/text';
import {FilterInputOnClickProps} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageGallerySizes} from '@/styles/image';
import {SleepMapId} from '@/types/mongo/sleepStyle';


type Props = FilterInputOnClickProps<SleepMapId> & {
  mapIds: SleepMapId[],
  isHidden?: (mapId: SleepMapId) => boolean,
  highlight?: boolean,
};

export const PokemonMapFilter = ({mapIds, isHidden, highlight, ...props}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex');
  const t2 = useTranslations('Game');

  return (
    <FilterTextInput
      style={highlight ? 'highlight' : undefined}
      title={t('Info.Map')}
      idToItemId={(id) => `Map-${id}`}
      ids={mapIds}
      isHidden={(id) => (isHidden && isHidden(id)) ?? false}
      idToButton={(id) => {
        const mapName = t2(`Field.${id}`);

        return (
          <>
            <div className="relative -mx-2 h-full w-40">
              <NextImage
                src={`/images/field/${id}.png`} alt={mapName}
                sizes={imageGallerySizes} className="rounded-xl opacity-50 dark:opacity-25"
              />
            </div>
            <Flex direction="row" center className="absolute z-10 h-full">
              {mapName}
            </Flex>
          </>
        );
      }}
      {...props}
    />
  );
};
