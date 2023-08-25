import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getAllBerryData} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getAllMapMeta} from '@/controller/mapMeta';
import {getPokemonAsMap} from '@/controller/pokemon';
import {getSubSkillMap} from '@/controller/subSkill';
import {LoginRequiredPageLayout} from '@/ui/base/layout/loginRequired';
import {PokeboxClient} from '@/ui/team/pokebox/client/main';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';


export const Pokebox = () => {
  const session = React.use(getServerSession(authOptions));
  const pokedexMap = React.use(getPokemonAsMap());
  const ingredientChainMap = React.use(getIngredientChainMap());
  const subSkillMap = React.use(getSubSkillMap());
  const ingredientMap = React.use(getAllIngredients());
  const berryMap = React.use(getAllBerryData());
  const mapMeta = React.use(getAllMapMeta());

  const props: PokeboxCommonProps = {
    session,
    pokedexMap,
    ingredientChainMap,
    subSkillMap,
    ingredientMap,
    berryMap,
    mapMeta,
  };

  return (
    <LoginRequiredPageLayout>
      <I18nProvider namespaces={[
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
