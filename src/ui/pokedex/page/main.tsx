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
import {getAssociatedPokemonBranchData} from '@/controller/pokemon/branch';
import {getPokemonAsMap, getSinglePokemonInfo} from '@/controller/pokemon/info';
import {getSinglePokemonProducingParams} from '@/controller/pokemon/producing';
import {getSleepStyleNormalList} from '@/controller/sleepStyle';
import {getSleepStyleSpecialList} from '@/controller/sleepStyleSpecial';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {PokemonClient} from '@/ui/pokedex/page/client';
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

  const pokemonBranches = await getAssociatedPokemonBranchData(pokemon.id);

  const [
    session,
    pokedex,
    pokemonProducingParams,
    ingredientChainMap,
    sleepStyles,
    sleepStylesSpecial,
    berryData,
    ingredientMap,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokemonAsMap(getRelatedPokemonIds({pokemon, branchData: pokemonBranches})),
    getSinglePokemonProducingParams(pokemon.id),
    getIngredientChainMap(),
    getSleepStyleNormalList(idNumber),
    getSleepStyleSpecialList(idNumber),
    getBerryData(pokemon.berry.id),
    getAllIngredients(),
  ]);

  if (!berryData) {
    return <Failed text="Berry"/>;
  }

  const props: PokemonProps = {
    pokedex,
    pokemon,
    pokemonBranches,
    pokemonProducingParams,
    ingredientChainMap,
    sleepStyles,
    sleepStylesSpecial,
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
          'UI.InPage.Sleepdex',
          'UI.Metadata',
        ]}>
          <PokemonClient {...props}/>
        </I18nProvider>
        <AdsUnit/>
      </Flex>
    </PublicPageLayout>
  );
};
