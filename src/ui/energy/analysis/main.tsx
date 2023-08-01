import React from 'react';

import {I18nProvider} from '@/contexts/i18n';
import {getAllBerryData} from '@/controller/berry';
import {getAllPokemonAsMap} from '@/controller/pokemon';
import {PageLayout} from '@/ui/base/layout';
import {EnergyAnalysisClient} from '@/ui/energy/analysis/client';
import {EnergyAnalysisProps} from '@/ui/energy/analysis/type';


export const EnergyAnalysis = () => {
  const pokedex = React.use(getAllPokemonAsMap());
  const berryMap = React.use(getAllBerryData());

  const props: EnergyAnalysisProps = {pokedex, berryMap};

  return (
    <PageLayout>
      <I18nProvider namespaces={['Game', 'UI.InPage.Pokedex']}>
        <EnergyAnalysisClient {...props}/>
      </I18nProvider>
    </PageLayout>
  );
};
