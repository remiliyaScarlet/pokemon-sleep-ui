import React from 'react';

import {I18nProvider} from '@/contexts/i18n';
import {getAllBerryData, getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getAllPokedex} from '@/controller/pokemon';
import {getPokemonSleepStyleMap} from '@/controller/sleepStyle';
import {PageLayout} from '@/ui/base/layout';
import {PokedexClient} from '@/ui/pokedex/index/client';
import {PokedexClientCommonProps, PokedexData} from '@/ui/pokedex/index/type';


const getPokedexData = async (): Promise<PokedexData> => {
  const sleepStyleMap = await getPokemonSleepStyleMap();

  return (await getAllPokedex())
    .map((pokemon) => ({
      ...pokemon,
      sleepStyles: sleepStyleMap[pokemon.id] ?? [],
    }))
    .toArray();
};

export const Pokedex = () => {
  const pokedex = React.use(getPokedexData());
  const maxLevel = React.use(getPokemonMaxLevelByBerry());
  const ingredientMap = React.use(getAllIngredients());
  const berryMap = React.use(getAllBerryData());

  const props: PokedexClientCommonProps = {
    pokedex,
    maxLevel,
    ingredientMap,
    berryMap,
  };

  return (
    <PageLayout>
      <I18nProvider namespaces={['Game', 'UI.Common', 'UI.Metadata', 'UI.InPage.Pokedex']}>
        <PokedexClient {...props}/>
      </I18nProvider>
    </PageLayout>
  );
};
