import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {imageIconSizes} from '@/styles/image';
import {SleepStyleDataFlattened} from '@/types/mongo/sleepStyle';
import {toUnique} from '@/utils/array';


type Props = {
  sleepStyles: SleepStyleDataFlattened[] | undefined,
};

export const MapStats = ({sleepStyles}: Props) => {
  const t = useTranslations('UI.InPage.Map');

  const sleepStyleCount = sleepStyles?.length ?? 0;
  const pokemonCount = toUnique(sleepStyles?.map(({pokemonId}) => pokemonId) ?? []).length;

  return (
    <Flex direction="row" center className="gap-4 text-lg">
      <Flex direction="row" center noFullWidth className="gap-1.5">
        <div className="relative h-6 w-6">
          <NextImage
            src="/images/generic/sleep.png" alt={t('SleepStyle')}
            sizes={imageIconSizes} className="invert-hoverable"
          />
        </div>
        <div>
          {sleepStyleCount}
        </div>
      </Flex>
      <Flex direction="row" center noFullWidth className="gap-1.5">
        <GenericPokeballIcon dimension="h-6 w-6" alt={t('Pokemon')}/>
        <div>
          {pokemonCount}
        </div>
      </Flex>
    </Flex>
  );
};
