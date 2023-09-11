import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {I18nProvider} from '@/contexts/i18n';
import {getPokemonAsMap} from '@/controller/pokemon';
import {getAllExpDataSorted} from '@/controller/pokemonExp';
import {getAllExpMultiplierData} from '@/controller/pokemonExpMultiplier';
import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {PokemonExpCalculatorClient} from '@/ui/xp/client';
import {PokemonExpCalculatorDataProps} from '@/ui/xp/type';


export const PokemonExpCalculator = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  const [
    pokedexMap,
    xpData,
    xpMultiplier,
  ] = await Promise.all([
    getPokemonAsMap(),
    getAllExpDataSorted(),
    getAllExpMultiplierData(),
  ]);

  const props: PokemonExpCalculatorDataProps = {
    pokedexMap,
    xpData,
    xpMultiplier,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.InPage.Pokedex.Info',
        'UI.InPage.PokemonExp',
      ]}>
        <AdsUnit/>
        <PokemonExpCalculatorClient {...props}/>
        <AdsUnit/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
