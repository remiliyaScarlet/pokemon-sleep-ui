import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getAllBerryData} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getAllPokemonAsMap} from '@/controller/pokemon';
import {getSubSkillMap} from '@/controller/subSkill';
import {LoginRequiredPageLayout} from '@/ui/base/layout/loginRequired';
import {PokeboxClient} from '@/ui/team/pokebox/client/main';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';


export const Pokebox = () => {
  const session = React.use(getServerSession(authOptions));
  const pokedexMap = React.use(getAllPokemonAsMap());
  const subSkillMap = React.use(getSubSkillMap());
  const ingredientMap = React.use(getAllIngredients());
  const berryMap = React.use(getAllBerryData());

  const props: PokeboxCommonProps = {session, pokedexMap, subSkillMap, ingredientMap, berryMap};

  return (
    <LoginRequiredPageLayout>
      <I18nProvider namespaces={['Game', 'UI.InPage.Pokedex', 'UI.InPage.Team', 'UI.Metadata']}>
        <PokeboxClient {...props}/>
      </I18nProvider>
    </LoginRequiredPageLayout>
  );
};
