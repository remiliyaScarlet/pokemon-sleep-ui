import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getAllBerryData} from '@/controller/berry';
import {loadRatingBonusFromSession} from '@/controller/game/rating/bonus';
import {getAllIngredients} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getAllMapMeta} from '@/controller/mapMeta';
import {getPokemonAsMap} from '@/controller/pokemon';
import {getSubSkillMap} from '@/controller/subSkill';
import {DefaultPageProps} from '@/types/next/page';
import {LoginRequiredPageLayout} from '@/ui/base/layout/loginRequired';
import {PokeboxClient} from '@/ui/team/pokebox/client/main';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';


export const Pokebox = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    session,
    pokedexMap,
    ingredientChainMap,
    subSkillMap,
    ingredientMap,
    berryMap,
    mapMeta,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokemonAsMap(),
    getIngredientChainMap(),
    getSubSkillMap(),
    getAllIngredients(),
    getAllBerryData(),
    getAllMapMeta(),
  ]);

  const props: PokeboxCommonProps = {
    session,
    pokedexMap,
    ingredientChainMap,
    subSkillMap,
    ingredientMap,
    berryMap,
    mapMeta,
    preloadedRatingBonus: await loadRatingBonusFromSession(session),
  };

  return (
    <LoginRequiredPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.InPage.Pokedex',
        'UI.InPage.Team',
        'UI.Metadata',
      ]}>
        <PokeboxClient {...props}/>
      </I18nProvider>
    </LoginRequiredPageLayout>
  );
};
