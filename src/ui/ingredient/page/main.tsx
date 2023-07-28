import React from 'react';

import {IngredientPageParams} from '@/app/[locale]/ingredient/[id]/page';
import {Loading} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex';
import {getIngredient} from '@/controller/ingredient';
import {getPokemonByIngredient} from '@/controller/pokemonInfo';
import {PageLayout} from '@/ui/base/layout';
import {IngredientMeta} from '@/ui/ingredient/page/meta';
import {IngredientObtainablePokemon} from '@/ui/ingredient/page/pokemon';


type Props = {
  params: IngredientPageParams,
};

export const IngredientPage = ({params}: Props) => {
  const idNumber = Number(params.id);
  const ingredient = React.use(getIngredient(idNumber));
  const obtainablePokemon = React.use(getPokemonByIngredient(ingredient?.id));

  if (!ingredient) {
    return <Loading text="Ingredient"/>;
  }

  return (
    <PageLayout>
      <Flex direction="row" center wrap className="gap-1.5 p-2">
        <IngredientMeta {...ingredient}/>
        <IngredientObtainablePokemon obtainablePokemonIds={obtainablePokemon}/>
      </Flex>
    </PageLayout>
  );
};
