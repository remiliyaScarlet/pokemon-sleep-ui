import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {Grid} from '@/components/layout/grid';
import {getEvolutionItemMap} from '@/controller/pokemon';
import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {EvolutionItemSingle} from '@/ui/item/evolution/item';


export const EvolutionItems = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    evolutionItemMap,
  ] = await Promise.all([
    getEvolutionItemMap(),
  ]);

  return (
    <PublicPageLayout locale={locale}>
      <Flex direction="col" center className="md:w-2/3 lg:w-1/2">
        <AdsUnit/>
        <Grid center className="grid-cols-1 gap-2 md:grid-cols-2">
          {Object.entries(evolutionItemMap).map(([itemId, pokemonList]) => (
            <EvolutionItemSingle key={itemId} itemId={Number(itemId)} pokemonList={pokemonList}/>
          ))}
        </Grid>
        <AdsUnit/>
      </Flex>
    </PublicPageLayout>
  );
};
