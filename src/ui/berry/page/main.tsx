import React from 'react';

import {getServerSession} from 'next-auth';

import {BerryPageParams} from '@/app/[locale]/berry/[id]/page';
import {I18nProvider} from '@/components/i18n/provider';
import {Failed} from '@/components/icons/failed';
import {authOptions} from '@/const/auth';
import {getAllBerryData, getBerryData} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMainSkillMap} from '@/controller/mainSkill';
import {getFavoriteInfoOfBerry} from '@/controller/mapMeta';
import {getPokemonAsMap, getPokemonByBerry} from '@/controller/pokemon/info';
import {getPokemonIngredientProductionByBerry} from '@/controller/pokemon/ingredient';
import {getAllPokemonProducingParams} from '@/controller/pokemon/producing';
import {getSubSkillMap} from '@/controller/subSkill';
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
    mainSkillMap,
    subSkillMap,
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
    getMainSkillMap(),
    getSubSkillMap(),
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
    mainSkillMap,
    subSkillMap,
    pokemonOfBerry,
    berryData,
    favoriteInfo,
    preloadedSettings: createUserSettings(session?.user.preloaded.settings),
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.InPage.Berry',
        'UI.InPage.Pokedex',
        'UI.InPage.Team',
        'UI.Metadata',
      ]}>
        <BerryPageClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
