import React from 'react';

import {MealPageParams} from '@/app/[locale]/meal/[id]/page';
import {Loading} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex';
import {getAllIngredients} from '@/controller/ingredient';
import {getSingleMeal} from '@/controller/meal';
import {getPokemonByIngredients} from '@/controller/pokemon';
import {PageLayout} from '@/ui/base/layout';
import {MealMeta} from '@/ui/meal/page/meta';
import {MealIngredientByPokemon} from '@/ui/meal/page/pokemon';


type Props = {
  params: MealPageParams,
};

export const MealPage = ({params}: Props) => {
  const idNumber = Number(params.id);
  const meal = React.use(getSingleMeal(idNumber));
  const pokemonByIngredients = React.use(getPokemonByIngredients(meal?.ingredients.map(({id}) => id) ?? []));
  const ingredients = React.use(getAllIngredients());

  if (!meal) {
    return <Loading text="Meal"/>;
  }

  return (
    <PageLayout>
      <Flex direction="row" center wrap className="gap-1.5">
        <MealMeta meal={meal} ingredients={ingredients}/>
        <MealIngredientByPokemon meal={meal} pokemonByIngredients={pokemonByIngredients}/>
      </Flex>
    </PageLayout>
  );
};
