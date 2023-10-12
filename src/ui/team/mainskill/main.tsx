import React from 'react';

import {getServerSession} from 'next-auth';

import {AdsUnit} from '@/components/ads/main';
import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getPokemonAsMap} from '@/controller/pokemon/info';
import {getAllPokemonProducingParams} from '@/controller/pokemon/producing';
import {getSubSkillMap} from '@/controller/subSkill';
import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {SkillTriggerAnalysisClient} from '@/ui/team/mainskill/client';
import {SkillTriggerAnalysisServerDataProps} from '@/ui/team/mainskill/type';
import {getOcrTranslationsForPokemonInfo} from '@/utils/ocr/translations/pokemon';
import {createUserSettings} from '@/utils/user/settings';


export const SkillTriggerAnalysis = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    subSkillMap,
    pokemonMaxLevel,
    session,
    ocrTranslations,
  ] = await Promise.all([
    getPokemonAsMap(),
    getAllPokemonProducingParams(),
    getIngredientChainMap(),
    getSubSkillMap(),
    getPokemonMaxLevelByBerry(),
    getServerSession(authOptions),
    getOcrTranslationsForPokemonInfo(),
  ]);

  const props: SkillTriggerAnalysisServerDataProps = {
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    subSkillMap,
    pokemonMaxLevel,
    preloadedSettings: createUserSettings(session?.user.preloaded.settings),
    ocrTranslations,
  };

  return (
    <PublicPageLayout locale={locale}>
      <AdsUnit/>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.InPage.Pokedex',
        'UI.Metadata.Pokedex',
        'UI.Ocr',
      ]}>
        <SkillTriggerAnalysisClient {...props}/>
      </I18nProvider>
      <AdsUnit/>
    </PublicPageLayout>
  );
};
