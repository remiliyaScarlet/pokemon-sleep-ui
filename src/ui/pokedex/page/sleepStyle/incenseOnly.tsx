import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {SleepStyleSpecial} from '@/types/game/sleepStyle';
import {PokemonSingleSleepStyle} from '@/ui/pokedex/page/sleepStyle/single';
import {PokemonSleepStyleProps} from '@/ui/pokedex/page/sleepStyle/type';


type Props = PokemonSleepStyleProps & {
  sleepStylesIncenseOnly: SleepStyleSpecial[],
};

export const PokemonSleepStylesIncenseOnly = ({sleepStylesIncenseOnly, ...props}: Props) => {
  const t = useTranslations('UI.InPage.Sleepdex');

  if (!sleepStylesIncenseOnly.length) {
    return null;
  }

  return (
    <Flex noFullWidth className="bg-plate justify-center self-stretch rounded-lg p-4">
      <Flex direction="row" noFullWidth center className="gap-1 p-1.5">
        <GenericIconLarger src="/images/generic/incense.png" alt={t('IncenseOnly')}/>
        <div className="text-lg">
          {t('IncenseOnly')}
        </div>
      </Flex>
      <Flex direction="row" center noFullWidth wrap className="z-10 gap-1">
        {sleepStylesIncenseOnly.map((sleepStyle) => (
          <PokemonSingleSleepStyle key={sleepStyle.style} sleepStyle={sleepStyle} {...props}/>
        ))}
      </Flex>
    </Flex>
  );
};
