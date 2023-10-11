import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getPokemonAsMap} from '@/controller/pokemon/info';
import {getAllPokemonProducingParams} from '@/controller/pokemon/producing';
import {getSubSkillMap} from '@/controller/subSkill';
import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {SkillTriggerComparerClient} from '@/ui/team/mainskill/client';
import {SkillTriggerComparerServerDataProps} from '@/ui/team/mainskill/type';
import {createUserSettings} from '@/utils/user/settings';


export const SkillTriggerComparer = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    session,
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    subSkillMap,
    pokemonMaxLevel,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokemonAsMap(),
    getAllPokemonProducingParams(),
    getIngredientChainMap(),
    getSubSkillMap(),
    getPokemonMaxLevelByBerry(),
  ]);

  const props: SkillTriggerComparerServerDataProps = {
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    subSkillMap,
    pokemonMaxLevel,
    preloadedSettings: createUserSettings(session?.user.preloaded.settings),
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.InPage.Pokedex',
      ]}>
        <SkillTriggerComparerClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
