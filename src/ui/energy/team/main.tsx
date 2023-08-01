import React from 'react';

import {I18nProvider} from '@/contexts/i18n';
import {getAllBerryData} from '@/controller/berry';
import {getAllPokemonAsMap} from '@/controller/pokemon';
import {PageLayout} from '@/ui/base/layout';
import {EnergyTeamClient} from '@/ui/energy/team/client';
import {EnergyTeamProps} from '@/ui/energy/team/type';


export const EnergyTeam = () => {
  const pokedex = React.use(getAllPokemonAsMap());
  const berryMap = React.use(getAllBerryData());

  const props: EnergyTeamProps = {pokedex, berryMap};

  return (
    <PageLayout>
      <I18nProvider namespaces={['Game', 'UI.InPage.Pokedex']}>
        <EnergyTeamClient {...props}/>
      </I18nProvider>
    </PageLayout>
  );
};
