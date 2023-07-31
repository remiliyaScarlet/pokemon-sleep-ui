import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
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
          <Image
            src="/images/generic/sleep.png" alt={t('SleepStyle')} fill sizes={imageIconSizes}
            className="invert-icon"
          />
        </div>
        <div>
          {sleepStyleCount}
        </div>
      </Flex>
      <Flex direction="row" center noFullWidth className="gap-1.5">
        <div className="relative h-6 w-6">
          <Image
            src="/images/generic/pokeball.png" alt={t('Pokemon')} fill sizes={imageIconSizes}
            className="invert-icon"
          />
        </div>
        <div>
          {pokemonCount}
        </div>
      </Flex>
    </Flex>
  );
};
