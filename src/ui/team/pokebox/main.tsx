import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {AuthProvider} from '@/contexts/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getAllBerryData} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getUserPokebox} from '@/controller/pokebox';
import {getAllPokemonAsMap} from '@/controller/pokemon';
import {getSubSkillMap} from '@/controller/subSkill';
import {PageLayout} from '@/ui/base/layout';
import {PokeboxClient} from '@/ui/team/pokebox/client';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';


export const Pokebox = () => {
  const session = React.use(getServerSession(authOptions));
  const initialPokebox = React.use(getUserPokebox(session?.user.id));
  const pokedexMap = React.use(getAllPokemonAsMap());
  const subSkillMap = React.use(getSubSkillMap());
  const ingredientMap = React.use(getAllIngredients());
  const berryMap = React.use(getAllBerryData());

  const props: PokeboxCommonProps = {session, pokedexMap, subSkillMap, ingredientMap, berryMap};

  return (
    <PageLayout>
      <I18nProvider namespaces={['Game', 'UI.InPage.Pokedex', 'UI.InPage.Team', 'UI.Metadata']}>
        <AuthProvider>
          <PokeboxClient initialPokebox={initialPokebox} {...props}/>
        </AuthProvider>
      </I18nProvider>
    </PageLayout>
  );
};
