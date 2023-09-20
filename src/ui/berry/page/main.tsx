import React from 'react';

import {getServerSession} from 'next-auth';

import {BerryPageParams} from '@/app/[locale]/berry/[id]/page';
import {Failed} from '@/components/icons/failed';
import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getAllBerryData, getBerryData} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getFavoriteInfoOfBerry} from '@/controller/mapMeta';
import {getPokemonAsMap, getPokemonByBerry} from '@/controller/pokemon/info';
import {getPokemonIngredientProductionByBerry} from '@/controller/pokemon/ingredient';
import {getAllPokemonProducingParams} from '@/controller/pokemon/producing';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {BerryPageClient} from '@/ui/berry/page/client';
import {BerryPageDataProps} from '@/ui/berry/page/type';
import {createUserSettings} from '@/utils/user/settings';


type Props = {
  params: BerryPageParams,
};

export const BerryPage = async ({params}: Props) => {
  const {id, locale} = params;
  const idNumber = parseInt(id);

  const [
    pokedex,
    pokemonProducingParamsMap,
    pokemonIngredientProduction,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    pokemonOfBerry,
    berryData,
    favoriteInfo,
    session,
  ] = await Promise.all([
    getPokemonAsMap(),
    getAllPokemonProducingParams(),
    getPokemonIngredientProductionByBerry(idNumber),
    getAllBerryData(),
    getAllIngredients(),
    getIngredientChainMap(),
    getPokemonByBerry(idNumber),
    getBerryData(idNumber),
    getFavoriteInfoOfBerry(idNumber),
    getServerSession(authOptions),
  ]);

  if (!berryData) {
    return <Failed text="Berry"/>;
  }

  const props: BerryPageDataProps = {
    pokedex,
    pokemonProducingParamsMap,
    pokemonIngredientProduction,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    pokemonOfBerry,
    berryData,
    favoriteInfo,
    preloadedSettings: createUserSettings(session?.user.preloaded.settings),
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game.Berry',
        'Game.Food',
        'Game.Field',
        'Game.PokemonName',
        'UI.Common',
        'UI.InPage.Pokedex',
        'UI.InPage.Berry',
      ]}>
        <BerryPageClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
