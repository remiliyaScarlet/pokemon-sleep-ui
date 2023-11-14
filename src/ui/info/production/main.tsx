import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {I18nProvider} from '@/contexts/i18n';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getAllPokemonAsArray} from '@/controller/pokemon/info';
import {getAllPokemonProducingParams} from '@/controller/pokemon/producing';
import {getPokemonProducingParamsMeta} from '@/controller/pokemon/producingMeta';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {ProducingParamsClient} from '@/ui/info/production/client/main';
import {ProducingParamsMeta} from '@/ui/info/production/meta';
import {ProducingParamsNotice} from '@/ui/info/production/notice';
import {ProducingParamsDataProps} from '@/ui/info/production/type';


export const ProducingParams = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    pokemonList,
    producingParamsMap,
    producingParamsMeta,
    ingredientChainMap,
  ] = await Promise.all([
    getAllPokemonAsArray(),
    getAllPokemonProducingParams(),
    getPokemonProducingParamsMeta(),
    getIngredientChainMap(),
  ]);

  const props: ProducingParamsDataProps = {
    pokemonList,
    producingParamsMap,
    ingredientChainMap,
  };

  return (
    <PublicPageLayout locale={locale}>
      <Flex className="gap-2">
        <AdsUnit/>
        <ProducingParamsNotice/>
        <ProducingParamsMeta meta={producingParamsMeta}/>
        <AdsUnit/>
        <I18nProvider locale={locale} namespaces={[
          'Game',
          'UI.Metadata',
          'UI.InPage.Pokedex',
        ]}>
          <ProducingParamsClient {...props}/>
        </I18nProvider>
        <AdsUnit/>
      </Flex>
    </PublicPageLayout>
  );
};
