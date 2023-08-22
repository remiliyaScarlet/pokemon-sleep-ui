import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {I18nProvider} from '@/contexts/i18n';
import {PokemonIngredientData, PokemonIngredientType} from '@/types/game/pokemon';
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
        <React.Fragment key={type}>
          <MealPokemonOfIngredientType
            type={type as PokemonIngredientType}
            pokeIngredientMap={pokeIngredientMap} {...props}
          />
          <AdsUnit/>
        </React.Fragment>
      ))}
    </I18nProvider>
  );
};
