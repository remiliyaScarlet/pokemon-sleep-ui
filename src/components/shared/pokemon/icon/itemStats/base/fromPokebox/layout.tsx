import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';


export const PokemonItemStatsFromPokeboxLayout = ({children}: React.PropsWithChildren) => {
  const t = useTranslations('UI.Common');

  return (
    <Flex className="info-highlight gap-1.5 p-2">
      <Flex direction="row" center className="gap-1 p-1.5 text-lg">
        <GenericIconLarger
          src="/images/generic/pokebox.png"
          alt={t('Pokebox')}
          dimension="h-6 w-6"
        />
        <div>{t('Pokebox')}</div>
      </Flex>
      {children}
    </Flex>
  );
};
