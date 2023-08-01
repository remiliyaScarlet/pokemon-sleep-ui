import React from 'react';

import {I18nProvider} from '@/contexts/i18n';
import {getAllBerryData} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getAllPokemonAsMap} from '@/controller/pokemon';
import {getSnorlaxRank} from '@/controller/snorlaxRank';
import {PageLayout} from '@/ui/base/layout';
import {EnergyAnalysisClient} from '@/ui/energy/analysis/client';
import {EnergyAnalysisDataProps} from '@/ui/energy/analysis/type';


export const EnergyAnalysis = () => {
  const pokedex = React.use(getAllPokemonAsMap());
  const berryMap = React.use(getAllBerryData());
  const ingredientMap = React.use(getAllIngredients());
  const snorlaxRankData = React.use(getSnorlaxRank());

  const props: EnergyAnalysisDataProps = {pokedex, berryMap, ingredientMap, snorlaxRankData};

  return (
    <PageLayout>
      <I18nProvider namespaces={['Game', 'UI.InPage.Pokedex']}>
        <EnergyAnalysisClient {...props}/>
      </I18nProvider>
    </PageLayout>
  );
};
