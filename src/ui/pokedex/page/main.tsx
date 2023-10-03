import React from 'react';

import {getServerSession} from 'next-auth';

import {PokedexPageParams} from '@/app/[locale]/pokedex/[id]/page';
import {AdsUnit} from '@/components/ads/main';
import {Failed} from '@/components/icons/failed';
import {Flex} from '@/components/layout/flex/common';
import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getBerryData} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getPokemonAsMap, getSinglePokemonInfo} from '@/controller/pokemon/info';
import {getSinglePokemonProducingParams} from '@/controller/pokemon/producing';
import {getPokemonSleepStyles} from '@/controller/sleepStyle';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {PokemonEvolution} from '@/ui/pokedex/page/evolution/main';
import {PokemonMeta} from '@/ui/pokedex/page/meta/main';
import {PokemonProduction} from '@/ui/pokedex/page/production/main';
import {PokemonSleepStyles} from '@/ui/pokedex/page/sleepStyle/main';
import {PokemonProps} from '@/ui/pokedex/page/type';
import {getRelatedPokemonIds} from '@/utils/game/pokemon';
import {createUserSettings} from '@/utils/user/settings';


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
    session,
    pokemonProducingParams,
    ingredientChainMap,
    pokedex,
    sleepStyles,
    berryData,
    ingredientMap,
  ] = await Promise.all([
    getServerSession(authOptions),
    getSinglePokemonProducingParams(pokemon.id),
    getIngredientChainMap(),
    getPokemonAsMap(getRelatedPokemonIds(pokemon)),
    getPokemonSleepStyles(idNumber),
    getBerryData(pokemon.berry.id),
    getAllIngredients(),
  ]);

  if (!berryData) {
    return <Failed text="Berry"/>;
  }

  const props: PokemonProps = {
    pokemon,
    pokemonProducingParams,
    ingredientChainMap,
    sleepStyles,
    berryData,
    ingredientMap,
    preloadedSettings: createUserSettings(session?.user.preloaded.settings),
  };

  return (
    <PublicPageLayout locale={locale}>
      <Flex center className="gap-2">
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
          <AdsUnit/>
          <PokemonSleepStyles {...props}/>
        </I18nProvider>
        <AdsUnit/>
      </Flex>
    </PublicPageLayout>
  );
};
