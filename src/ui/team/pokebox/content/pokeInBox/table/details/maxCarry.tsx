import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';


export const PokeInBoxMaxCarryInTable = (props: PokeInBoxTableDetailsProps) => {
  const {pokeInBox} = props;

  const t = useTranslations('UI.InPage.Pokedex');

  return (
    <Flex direction="row" center noFullWidth className="w-14 gap-0.5">
      <PokemonDataIcon src="/images/generic/bag.png" alt={t('Stats.MaxCarry')} invert/>
      <div>{pokeInBox.carryLimit}</div>
    </Flex>
  );
};
