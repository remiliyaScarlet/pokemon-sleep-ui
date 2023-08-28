import React from 'react';

import {getServerSession} from 'next-auth';

import {AdsUnit} from '@/components/ads/main';
import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getAllBerryData, getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getAllMapMeta} from '@/controller/mapMeta';
import {getPokemonAsMap} from '@/controller/pokemon';
import {getPokemonSleepStyleMap} from '@/controller/sleepStyle';
import {getSubSkillMap} from '@/controller/subSkill';
import {userDataTeamAnalysisSetup} from '@/controller/user/manager';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {RatingClient} from '@/ui/rating/client';
import {RatingServerDataProps} from '@/ui/rating/type';


export const Rating = async () => {
  const [
    pokedexMap,
    sleepStyleMap,
    ingredientChainMap,
    ingredientMap,
    berryDataMap,
    subSkillMap,
    mapMeta,
    pokemonMaxLevel,
    session,
  ] = await Promise.all([
    getPokemonAsMap(),
    getPokemonSleepStyleMap(),
    getIngredientChainMap(),
    getAllIngredients(),
    getAllBerryData(),
    getSubSkillMap(),
    getAllMapMeta(),
    getPokemonMaxLevelByBerry(),
    getServerSession(authOptions),
  ]);

  const teamAnalysisSetup = session?.user.id ?
    await userDataTeamAnalysisSetup.getData(session.user.id) :
    undefined;

  const props: RatingServerDataProps = {
    pokedexMap,
    sleepStyleMap,
    ingredientChainMap,
    ingredientMap,
    berryDataMap,
    subSkillMap,
    mapMeta,
    pokemonMaxLevel,
    preloadSetupBonus: teamAnalysisSetup?.data.bonus,
  };

  return (
    <PublicPageLayout>
      <AdsUnit/>
      <I18nProvider namespaces={['Game', 'UI.Common', 'UI.InPage.Pokedex', 'UI.InPage.Team', 'UI.Metadata']}>
        <RatingClient {...props}/>
      </I18nProvider>
      <AdsUnit/>
    </PublicPageLayout>
  );
};
