import React from 'react';

import {MealPageParams} from '@/app/[locale]/meal/[id]/page';
import {Loading} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex';
import {getSingleMeal} from '@/controller/meal';
import {getPokemonByIngredient} from '@/controller/pokemonInfo';
import {PageLayout} from '@/ui/base/layout';
import {MealMeta} from '@/ui/meal/page/meta';
import {MealIngredientByPokemon} from '@/ui/meal/page/pokemon';


type Props = {
  params: MealPageParams,
};

export const MealPage = ({params}: Props) => {
  const idNumber = Number(params.id);
  const meal = React.use(getSingleMeal(idNumber));
  const pokemonByIngredients = React.use(getPokemonByIngredient(meal?.ingredients.map(({id}) => id) ?? []));

  if (!meal) {
    return <Loading text="Meal"/>;
  }

  return (
    <PageLayout>
      <Flex direction="row" center wrap className="gap-1.5">
        <MealMeta {...meal}/>
        <MealIngredientByPokemon pokemonByIngredients={pokemonByIngredients}/>
      </Flex>
    </PageLayout>
  );
};
