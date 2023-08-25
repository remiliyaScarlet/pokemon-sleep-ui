'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonIconsIngredientStats} from '@/components/shared/pokemon/icon/ingredientStats';
import {PokemonLevelSlider} from '@/components/shared/pokemon/levelSlider';
import {Ingredient} from '@/types/game/ingredient';
import {PokedexMap, PokemonIngredientDropData, PokemonIngredientProduction} from '@/types/game/pokemon';
import {toSum} from '@/utils/array';


type Props = {
  pokedex: PokedexMap,
  pokemonMaxLevel: number,
  pokemonProduction: PokemonIngredientProduction[],
  ingredient: Ingredient,
};

export const IngredientPokemonProduction = ({
  pokedex,
  pokemonMaxLevel,
  pokemonProduction,
  ingredient,
}: Props) => {
  const [level, setLevel] = React.useState(1);

  const dropData: PokemonIngredientDropData[] = pokemonProduction.map(({pokemon, productions}) => {
    return {
      pokemon,
      qty: toSum(productions
        .filter((production) => level >= production.level)
        .map(({qty}) => qty)),
    };
  });

  return (
    <Flex direction="col" className="info-section">
      <PokemonLevelSlider level={level} maxLevel={pokemonMaxLevel} setLevel={setLevel}/>
      <HorizontalSplitter/>
      <PokemonIconsIngredientStats
        level={level}
        dropData={dropData}
        pokedex={pokedex}
        ingredient={ingredient}
      />
    </Flex>
  );
};
