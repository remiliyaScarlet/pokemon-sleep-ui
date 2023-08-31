import React from 'react';

import {PokedexPageParams} from '@/app/[locale]/pokedex/[id]/page';
import {AdsUnit} from '@/components/ads/main';
import {Failed} from '@/components/icons/failed';
import {Flex} from '@/components/layout/flex';
import {I18nProvider} from '@/contexts/i18n';
import {getBerryData} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getPokemonAsMap, getSinglePokemonInfo} from '@/controller/pokemon';
import {getPokemonSleepStyles} from '@/controller/sleepStyle';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {PokemonEvolution} from '@/ui/pokedex/page/evolution/main';
import {PokemonMeta} from '@/ui/pokedex/page/meta/main';
import {PokemonProduction} from '@/ui/pokedex/page/production/main';
import {PokemonSleepStyles} from '@/ui/pokedex/page/sleepStyle';
import {PokemonProps} from '@/ui/pokedex/page/type';
import {getRelatedPokemonIds} from '@/utils/game/pokemon';


type Props = {
  params: PokedexPageParams,
};

export const Pokemon = async ({params}: Props) => {
  const {id, locale} = params;
  const idNumber = Number(id);
  const pokemon = await getSinglePokemonInfo(idNumber);

  if (!pokemon) {
    return <Failed text="Pokemon"/>;
  }

  const [
    ingredientChainMap,
    pokedex,
    sleepStyles,
    berryData,
    ingredientMap,
  ] = await Promise.all([
    getIngredientChainMap(),
    getPokemonAsMap(getRelatedPokemonIds(pokemon)),
    getPokemonSleepStyles(idNumber),
    getBerryData(pokemon.berry.id),
    getAllIngredients(),
  ]);

  if (!berryData) {
    return <Failed text="Berry"/>;
  }

  const props: PokemonProps = {pokemon, ingredientChainMap, sleepStyles, berryData, ingredientMap};

  return (
    <PublicPageLayout locale={locale}>
      <Flex direction="col" center className="gap-2">
        <AdsUnit/>
        <I18nProvider locale={locale} namespaces={[
          'Game',
          'UI.Common',
          'UI.Evolution',
          'UI.InPage.Pokedex',
          'UI.Metadata',
        ]}>
          <PokemonMeta {...props}/>
          <AdsUnit/>
          <PokemonProduction {...props}/>
          <AdsUnit/>
          <PokemonEvolution pokedex={pokedex} {...props}/>
        </I18nProvider>
        <AdsUnit/>
        <PokemonSleepStyles {...props}/>
        <AdsUnit/>
      </Flex>
    </PublicPageLayout>
  );
};
