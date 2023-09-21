import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const PokeInBoxGridMaxCarry = (props: PokeInBoxCommonProps) => {
  const {pokeInBox} = props;

  const t = useTranslations('UI.Common');

  return (
    <Flex direction="row" noFullWidth className="gap-0.5">
      <PokemonDataIcon src="/images/generic/bag.png" alt={t('MaxCarry')} invert/>
      <div>{pokeInBox.carryLimit}</div>
    </Flex>
  );
};
