import React from 'react';

import {IngredientPageParams} from '@/app/[locale]/ingredient/[id]/page';
import {Failed} from '@/components/icons/failed';
import {Flex} from '@/components/layout/flex';
import {I18nProvider} from '@/contexts/i18n';
import {getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getMealByIngredient} from '@/controller/meal';
import {getPokemonByIngredient} from '@/controller/pokemon';
import {PageLayout} from '@/ui/base/layout';
import {IngredientMeta} from '@/ui/ingredient/page/meta';
import {IngredientObtainablePokemon} from '@/ui/ingredient/page/pokemon';
import {IngredientCookableMeals} from '@/ui/ingredient/page/recipe';


type Props = {
  params: IngredientPageParams,
};

export const IngredientPage = ({params}: Props) => {
  const idNumber = Number(params.id);
  const ingredientMap = React.use(getAllIngredients());
  const ingredient = ingredientMap[idNumber];
  const obtainablePokemon = React.use(getPokemonByIngredient(ingredient?.id));
  const cookableMeals = React.use(getMealByIngredient(ingredient?.id));
  const pokemonMaxLevel = React.use(getPokemonMaxLevelByBerry());

  if (!ingredient) {
    return <Failed text="Ingredient"/>;
  }

  return (
    <PageLayout>
      <Flex direction="col" className="gap-1.5 md:flex-row">
        <IngredientMeta {...ingredient}/>
        <IngredientCookableMeals cookableMeals={cookableMeals}/>
      </Flex>
      <I18nProvider namespaces={['Game', 'UI.Common', 'UI.Metadata', 'UI.InPage.Pokedex']}>
        <IngredientObtainablePokemon
          pokemonMaxLevel={pokemonMaxLevel}
          obtainablePokemon={obtainablePokemon}
          ingredientMap={ingredientMap}
        />
      </I18nProvider>
    </PageLayout>
  );
};
