import React from 'react';

import {useTranslations} from 'next-intl';

import {I18nProvider} from '@/components/i18n/provider';
import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {ItemId} from '@/types/game/item';
import {PokemonInfo} from '@/types/game/pokemon';
import {Locale} from '@/types/next/locale';
import {EvolutionIconPokemon} from '@/ui/item/evolution/pokemon';


type Props = {
  locale: Locale,
  itemId: ItemId,
  pokemonList: PokemonInfo[],
};

export const EvolutionItemSingle = ({locale, itemId, pokemonList}: Props) => {
  const t = useTranslations('Game');
  const itemName = t(`Item.${itemId}`);

  return (
    <Flex center className="info-section-bg h-full gap-1.5 rounded-lg p-2">
      <Flex direction="row" center>
        <GenericIconLarger
          src={`/images/item/${itemId}.png`}
          alt={itemName}
          dimension="h-12 w-12"
          noInvert
        />
        <div className="text-lg">{itemName}</div>
      </Flex>
      <Flex direction="row" center className="gap-2">
        <I18nProvider locale={locale} namespaces={[]}>
          <EvolutionIconPokemon pokemonList={pokemonList}/>
        </I18nProvider>
      </Flex>
    </Flex>
  );
};
