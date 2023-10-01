import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {PokemonTimeToFullPack} from '@/components/shared/pokemon/fullPack/main';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';
import {getRateOfPokemon} from '@/ui/team/pokebox/content/pokeInBox/utils';


export const PokeInBoxTableMaxCarry = (props: PokeInBoxTableDetailsProps) => {
  const {pokeInBox} = props;
  const t = useTranslations('UI.Common');

  const {fullPackStats} = getRateOfPokemon(props);

  return (
    <Flex direction="row">
      <Flex direction="row" center noFullWidth className="w-14 gap-0.5">
        <PokemonDataIcon src="/images/generic/bag.png" alt={t('MaxCarry')} invert/>
        <div>{pokeInBox.carryLimit}</div>
      </Flex>
      <PokemonTimeToFullPack timeToFullPack={fullPackStats.secondsToFull} normalText className="w-24"/>
    </Flex>
  );
};
