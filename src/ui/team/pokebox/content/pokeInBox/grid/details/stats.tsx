import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {PokeboxPokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const PokeboxPokeInBoxStats = ({pokemon, pokeInBox}: PokeboxPokeInBoxCommonProps) => {
  const {stats} = pokemon;
  const {carryLimit} = pokeInBox;

  const t = useTranslations('UI.InPage.Pokedex');

  return (
    <Flex direction="col" className="gap-1.5">
      <Flex direction="row" className="gap-0.5">
        <PokemonDataIcon src="/images/generic/bag.png" alt={t('Stats.MaxCarry')} invert/>
        <div>{carryLimit}</div>
      </Flex>
      <Flex direction="row" className="gap-0.5">
        <PokemonDataIcon src="/images/generic/clock.png" alt={t('Stats.Frequency')} invert/>
        <div>{stats.frequency}</div>
      </Flex>
    </Flex>
  );
};
