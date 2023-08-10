'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonIconsWithIngredient} from '@/components/shared/pokemon/icon/listWithIngredient';
import {PokemonIngredientTypeIcon} from '@/components/shared/pokemon/ingredients/typeIcon';
import {PokemonLevelSlider} from '@/components/shared/pokemon/levelSlider';
import {IngredientMap} from '@/types/mongo/ingredient';
import {pokemonIngredientType, PokemonIngredientTypeMap} from '@/types/mongo/pokemon';


type Props = {
  pokemonMaxLevel: number,
  obtainablePokemon: PokemonIngredientTypeMap,
  ingredientMap: IngredientMap,
};

export const IngredientObtainablePokemon = ({pokemonMaxLevel, obtainablePokemon, ingredientMap}: Props) => {
  const [level, setLevel] = React.useState(1);

  return (
    <Flex direction="col" className="info-section">
      <PokemonLevelSlider level={level} maxLevel={pokemonMaxLevel} setLevel={setLevel}/>
      <HorizontalSplitter/>
      {pokemonIngredientType.map((type, idx) => {
        return (
          <React.Fragment key={type}>
            <Flex direction="row" className="gap-3">
              <Flex direction="col" center noFullWidth>
                <div className="h-8 w-8">
                  <PokemonIngredientTypeIcon type={type}/>
                </div>
              </Flex>
              <Flex direction="col" center>
                <PokemonIconsWithIngredient
                  level={level}
                  data={obtainablePokemon[type]}
                  ingredientMap={ingredientMap}
                />
              </Flex>
            </Flex>
            {idx + 1 !== pokemonIngredientType.length && <HorizontalSplitter className="w-full"/>}
          </React.Fragment>
        );
      })}
    </Flex>
  );
};
