import React from 'react';

import {IngredientPageParams} from '@/app/[locale]/ingredient/[id]/page';
import {AdsUnit} from '@/components/ads/main';
import {Failed} from '@/components/icons/failed';
import {Flex} from '@/components/layout/flex';
import {I18nProvider} from '@/contexts/i18n';
import {getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getIngredientData} from '@/controller/ingredient';
import {getMealByIngredient} from '@/controller/meal';
import {getPokemonAsMap, getPokemonIngredientProduction} from '@/controller/pokemon';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {IngredientMeta} from '@/ui/ingredient/page/meta';
import {IngredientPokemonProduction} from '@/ui/ingredient/page/pokemon';
import {IngredientCookableMeals} from '@/ui/ingredient/page/recipe';


type Props = {
  params: IngredientPageParams,
};

export const IngredientPage = async ({params}: Props) => {
  const {id, locale} = params;
  const idNumber = Number(id);
  const ingredient = await getIngredientData(idNumber);

  if (!ingredient) {
    return <Failed text="Ingredient"/>;
  }

  const [
    pokemonProduction,
    pokedex,
    cookableMeals,
    pokemonMaxLevel,
  ] = await Promise.all([
    getPokemonIngredientProduction(ingredient.id),
    getPokemonAsMap(),
    getMealByIngredient(ingredient.id),
    getPokemonMaxLevelByBerry(),
  ]);

  return (
    <PublicPageLayout locale={locale}>
      <Flex direction="col" className="gap-1.5 md:flex-row">
        <IngredientMeta {...ingredient}/>
        <IngredientCookableMeals cookableMeals={cookableMeals}/>
      </Flex>
      <AdsUnit/>
      <I18nProvider locale={locale} namespaces={['Game', 'UI.Common', 'UI.Metadata', 'UI.InPage.Pokedex']}>
        <IngredientPokemonProduction
          pokedex={pokedex}
          pokemonMaxLevel={pokemonMaxLevel}
          pokemonProduction={pokemonProduction}
          ingredient={ingredient}
        />
      </I18nProvider>
      <AdsUnit/>
    </PublicPageLayout>
  );
};
