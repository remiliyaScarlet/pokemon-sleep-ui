import React from 'react';

import {IngredientPageParams} from '@/app/[locale]/ingredient/[id]/page';
import {Loading} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex';
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

  if (!ingredient) {
    return <Loading text="Ingredient"/>;
  }

  return (
    <PageLayout>
      <Flex direction="col" className="gap-1.5 md:flex-row">
        <IngredientMeta {...ingredient}/>
        <IngredientCookableMeals cookableMeals={cookableMeals}/>
      </Flex>
      <IngredientObtainablePokemon obtainablePokemon={obtainablePokemon} ingredientMap={ingredientMap}/>
    </PageLayout>
  );
};
