import React from 'react';

import {MealPageParams} from '@/app/[locale]/meal/[id]/page';
import {AdsUnit} from '@/components/ads/main';
import {Failed} from '@/components/icons/failed';
import {Flex} from '@/components/layout/flex';
import {getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getSingleMeal} from '@/controller/meal';
import {getPokemonAsMap, getPokemonByIngredients} from '@/controller/pokemon';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {MealMeta} from '@/ui/meal/page/meta';
import {MealPokemonOfIngredient} from '@/ui/meal/page/pokemon';
import {MealCommonProps} from '@/ui/meal/page/type';


type Props = {
  params: MealPageParams,
};

export const MealPage = ({params}: Props) => {
  const idNumber = Number(params.id);
  const meal = React.use(getSingleMeal(idNumber));
  const pokemonByIngredients = React.use(getPokemonByIngredients(meal?.ingredients.map(({id}) => id) ?? []));
  const ingredientMap = React.use(getAllIngredients());
  const pokedex = React.use(getPokemonAsMap());
  const pokemonMaxLevel = React.use(getPokemonMaxLevelByBerry());

  if (!meal) {
    return <Failed text="Meal"/>;
  }

  const props: MealCommonProps = {meal, ingredientMap, pokedex, pokemonMaxLevel};

  return (
    <PublicPageLayout>
      <Flex direction="col" center className="gap-1.5">
        <MealMeta {...props}/>
        <AdsUnit/>
        <MealPokemonOfIngredient pokemonByIngredients={pokemonByIngredients} {...props}/>
      </Flex>
    </PublicPageLayout>
  );
};
