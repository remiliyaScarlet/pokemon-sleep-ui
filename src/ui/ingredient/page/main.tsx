import React from 'react';

import {IngredientPageParams} from '@/app/[locale]/ingredient/[id]/page';
import {Loading} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex';
import {getIngredient} from '@/controller/ingredient';
import {getMealByIngredient} from '@/controller/meal';
import {getPokemonByIngredient} from '@/controller/pokemonInfo';
import {PageLayout} from '@/ui/base/layout';
import {IngredientMeta} from '@/ui/ingredient/page/meta';
import {IngredientObtainablePokemon} from '@/ui/ingredient/page/pokemon';
import {IngredientCookableMeals} from '@/ui/ingredient/page/recipe';


type Props = {
  params: IngredientPageParams,
};

export const IngredientPage = ({params}: Props) => {
  const idNumber = Number(params.id);
  const ingredient = React.use(getIngredient(idNumber));
  const obtainablePokemon = React.use(getPokemonByIngredient(ingredient?.id));
  const cookableMeals = React.use(getMealByIngredient(ingredient?.id));

  if (!ingredient) {
    return <Loading text="Ingredient"/>;
  }

  return (
    <PageLayout>
      <Flex direction="col" center className="gap-1.5 p-2 md:flex-row">
        <IngredientMeta {...ingredient}/>
        <Flex direction="col" center className="gap-1.5">
          <IngredientCookableMeals cookableMeals={cookableMeals}/>
          <IngredientObtainablePokemon obtainablePokemonIds={obtainablePokemon}/>
        </Flex>
      </Flex>
    </PageLayout>
  );
};
