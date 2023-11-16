import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {I18nProvider} from '@/components/i18n/provider';
import {Failed} from '@/components/icons/failed';
import {getAllExpDataSorted} from '@/controller/pokemon/exp';
import {getAllExpMultiplierData} from '@/controller/pokemon/expMultiplier';
import {getPokemonAsMap} from '@/controller/pokemon/info';
import {DefaultPageProps} from '@/types/next/page/common';
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

  const maxLevel = xpData.at(-1)?.lv;

  if (!maxLevel) {
    return <Failed text="XP Data"/>;
  }

  const props: PokemonExpCalculatorDataProps = {
    pokedexMap,
    xpData,
    xpMultiplier,
    maxLevel,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
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
