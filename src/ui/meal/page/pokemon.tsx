import React from 'react';

import {I18nProvider} from '@/contexts/i18n';
import {PokemonIngredientData, PokemonIngredientType} from '@/types/mongo/pokemon';
import {MealPokemonOfIngredientType} from '@/ui/meal/page/pokemonOfType';
import {MealCommonProps} from '@/ui/meal/page/type';


type Props = MealCommonProps & {
  pokemonByIngredients: PokemonIngredientData,
};

export const MealPokemonOfIngredient = (props: Props) => {
  const {pokemonByIngredients} = props;

  return (
    <I18nProvider namespaces={['Game', 'UI.Common', 'UI.Metadata', 'UI.InPage.Pokedex']}>
      {Object.entries(pokemonByIngredients.ingredient).map(([type, pokeIngredientMap]) => (
        <MealPokemonOfIngredientType
          key={type} type={type as PokemonIngredientType}
          pokeIngredientMap={pokeIngredientMap} {...props}
        />
      ))}
    </I18nProvider>
  );
};
