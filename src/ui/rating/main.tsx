import React from 'react';

import {getServerSession} from 'next-auth';

import {AdsUnit} from '@/components/ads/main';
import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getAllBerryData, getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getAllMapMeta} from '@/controller/mapMeta';
import {getPokemonAsMap} from '@/controller/pokemon/info';
import {getAllPokemonProducingParams} from '@/controller/pokemon/producing';
import {getSubSkillMap} from '@/controller/subSkill';
import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {RatingClient} from '@/ui/rating/client';
import {RatingServerDataProps} from '@/ui/rating/type';
import {getOcrTranslationsForPokemonInfo} from '@/utils/ocr/translations/pokemon';
import {createUserSettings} from '@/utils/user/settings';


export const Rating = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    ingredientMap,
    berryDataMap,
    subSkillMap,
    mapMeta,
    pokemonMaxLevel,
    session,
    ocrTranslations,
  ] = await Promise.all([
    getPokemonAsMap(),
    getAllPokemonProducingParams(),
    getIngredientChainMap(),
    getAllIngredients(),
    getAllBerryData(),
    getSubSkillMap(),
    getAllMapMeta(),
    getPokemonMaxLevelByBerry(),
    getServerSession(authOptions),
    getOcrTranslationsForPokemonInfo(),
  ]);

  const props: RatingServerDataProps = {
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    ingredientMap,
    berryDataMap,
    subSkillMap,
    mapMeta,
    pokemonMaxLevel,
    preloadedSettings: createUserSettings(session?.user.preloaded.settings),
    ocrTranslations,
  };

  return (
    <PublicPageLayout locale={locale}>
      <AdsUnit/>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.InPage.Pokedex',
        'UI.InPage.Team',
        'UI.Metadata',
        'UI.Ocr',
      ]}>
        <RatingClient {...props}/>
      </I18nProvider>
      <AdsUnit/>
    </PublicPageLayout>
  );
};
