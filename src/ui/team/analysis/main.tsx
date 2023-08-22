import React from 'react';

import {I18nProvider} from '@/contexts/i18n';
import {getAllBerryData} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getAllMapMeta} from '@/controller/mapMeta';
import {getPokemonAsMap} from '@/controller/pokemon';
import {getSnorlaxRank} from '@/controller/snorlaxRank';
import {getSubSkillMap} from '@/controller/subSkill';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {TeamAnalysisClient} from '@/ui/team/analysis/client/main';
import {TeamAnalysisServerDataProps} from '@/ui/team/analysis/type';


export const TeamAnalysis = () => {
  const pokedex = React.use(getPokemonAsMap());
  const berryMap = React.use(getAllBerryData());
  const ingredientMap = React.use(getAllIngredients());
  const snorlaxRankData = React.use(getSnorlaxRank());
  const mapMeta = React.use(getAllMapMeta());
  const subSkillMap = React.use(getSubSkillMap());

  const props: TeamAnalysisServerDataProps = {
    pokedex,
    berryMap,
    ingredientMap,
    snorlaxRankData,
    mapMeta,
    subSkillMap,
  };

  return (
    <PublicPageLayout>
      <I18nProvider namespaces={['Game', 'UI.Common', 'UI.InPage.Pokedex', 'UI.InPage.Team', 'UI.Metadata']}>
        <TeamAnalysisClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
