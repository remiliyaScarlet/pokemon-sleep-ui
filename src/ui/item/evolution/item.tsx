import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {PokemonClickableIcons} from '@/components/shared/pokemon/icon/clickable/main';
import {ItemId} from '@/types/game/item';
import {PokemonInfo} from '@/types/game/pokemon';


type Props = {
  itemId: ItemId,
  pokemonList: PokemonInfo[],
};

export const EvolutionItemSingle = ({itemId, pokemonList}: Props) => {
  const t = useTranslations('Game');
  const itemName = t(`Item.${itemId}`);

  return (
    <Flex direction="col" center className="info-section-bg gap-1.5 rounded-lg p-2">
      <Flex direction="row" center>
        <PokemonDataIcon
          src={`/images/item/${itemId}.png`}
          alt={itemName}
          dimension="h-12 w-12"
        />
        <div className="text-lg">{itemName}</div>
      </Flex>
      <Flex direction="row" center className="gap-2">
        <PokemonClickableIcons pokemonList={pokemonList} dimension="h-16 w-16"/>
      </Flex>
    </Flex>
  );
};
