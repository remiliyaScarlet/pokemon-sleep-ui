import React from 'react';

import {AnalysisPageParams} from '@/app/[locale]/analysis/[id]/page';
import {Failed} from '@/components/icons/failed';
import {I18nProvider} from '@/contexts/i18n';
import {getAllBerryData} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getAllMapMeta} from '@/controller/mapMeta';
import {getAllPokemonAsArray} from '@/controller/pokemon';
import {getPokemonSleepStyleMap} from '@/controller/sleepStyle';
import {AnalysisPageClient} from '@/ui/analysis/page/client';
import {AnalysisPageCommonProps} from '@/ui/analysis/page/type';
import {PublicPageLayout} from '@/ui/base/layout/public';


type Props = {
  params: AnalysisPageParams,
};

export const AnalysisPage = ({params}: Props) => {
  const {id, locale} = params;
  const idNumber = Number(id);
  const pokedex = React.use(getAllPokemonAsArray());
  const pokemon = pokedex.find(({id}) => id === idNumber);
  const ingredientChainMap = React.use(getIngredientChainMap());
  const ingredientMap = React.use(getAllIngredients());
  const berryDataMap = React.use(getAllBerryData());
  const sleepStyleMap = React.use(getPokemonSleepStyleMap());
  const mapMeta = React.use(getAllMapMeta());

  if (!pokemon) {
    return <Failed text="Pokemon"/>;
  }

  if (!berryDataMap) {
    return <Failed text="Berry"/>;
  }

  const props: AnalysisPageCommonProps = {
    pokedex,
    pokemon,
    ingredientMap,
    ingredientChainMap,
    berryDataMap,
    sleepStyleMap,
    mapMeta,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.InPage.Analysis',
        'UI.InPage.Pokedex',
        'UI.Metadata',
      ]}>
        <AnalysisPageClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
