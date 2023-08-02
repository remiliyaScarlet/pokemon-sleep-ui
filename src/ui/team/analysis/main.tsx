import React from 'react';

import {I18nProvider} from '@/contexts/i18n';
import {getAllBerryData} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getAllPokemonAsMap} from '@/controller/pokemon';
import {getSnorlaxRank} from '@/controller/snorlaxRank';
import {PageLayout} from '@/ui/base/layout';
import {TeamAnalysisClient} from '@/ui/team/analysis/client';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';


export const TeamAnalysis = () => {
  const pokedex = React.use(getAllPokemonAsMap());
  const berryMap = React.use(getAllBerryData());
  const ingredientMap = React.use(getAllIngredients());
  const snorlaxRankData = React.use(getSnorlaxRank());

  const props: TeamAnalysisDataProps = {pokedex, berryMap, ingredientMap, snorlaxRankData};

  return (
    <PageLayout>
      <I18nProvider namespaces={['Game', 'UI.Common', 'UI.InPage.Team', 'UI.InPage.Pokedex']}>
        <TeamAnalysisClient {...props}/>
      </I18nProvider>
    </PageLayout>
  );
};
