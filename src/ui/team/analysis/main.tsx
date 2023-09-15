import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getAllBerryData, getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getAllMapMeta} from '@/controller/mapMeta';
import {getPokemonAsMap} from '@/controller/pokemon/info';
import {getSnorlaxRank} from '@/controller/snorlaxRank';
import {getSubSkillMap} from '@/controller/subSkill';
import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {TeamAnalysisClient} from '@/ui/team/analysis/client/main';
import {TeamAnalysisServerDataProps} from '@/ui/team/analysis/type';
import {createUserSettings} from '@/utils/user/settings';


export const TeamAnalysis = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    session,
    pokedex,
    ingredientChainMap,
    berryDataMap,
    ingredientMap,
    snorlaxRankData,
    mapMeta,
    subSkillMap,
    pokemonMaxLevel,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokemonAsMap(),
    getIngredientChainMap(),
    getAllBerryData(),
    getAllIngredients(),
    getSnorlaxRank(),
    getAllMapMeta(),
    getSubSkillMap(),
    getPokemonMaxLevelByBerry(),
  ]);

  const props: TeamAnalysisServerDataProps = {
    pokedex,
    ingredientChainMap,
    berryDataMap,
    ingredientMap,
    snorlaxRankData,
    mapMeta,
    subSkillMap,
    pokemonMaxLevel,
    preloadedSettings: createUserSettings(session?.user.preloaded.settings),
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.InPage.Pokedex',
        'UI.InPage.Team',
        'UI.Metadata',
      ]}>
        <TeamAnalysisClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
