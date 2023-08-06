import React from 'react';

import {I18nProvider} from '@/contexts/i18n';
import {getAllPokemonAsArray} from '@/controller/pokemon';
import {AnalysisIndexClient} from '@/ui/analysis/index/client';
import {AnalysisIndexProps} from '@/ui/analysis/index/type';
import {PageLayout} from '@/ui/base/layout';


export const AnalysisIndex = () => {
  const pokedex = React.use(getAllPokemonAsArray());

  const props: AnalysisIndexProps = {pokedex};

  return (
    <PageLayout>
      <I18nProvider namespaces={['Game', 'UI.InPage.Pokedex']}>
        <AnalysisIndexClient {...props}/>
      </I18nProvider>
    </PageLayout>
  );
};
