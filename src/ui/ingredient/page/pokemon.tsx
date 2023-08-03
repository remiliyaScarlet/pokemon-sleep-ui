import React from 'react';

import {Flex} from '@/components/layout/flex';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonIconsWithIngredient} from '@/components/shared/pokemon/icon/listWithIngredient';
import {PokemonIngredientTypeIcon} from '@/components/shared/pokemon/ingredients/typeIcon';
import {IngredientMap} from '@/types/mongo/ingredient';
import {PokemonIngredientType, pokemonIngredientType, PokemonIngredientTypeMap} from '@/types/mongo/pokemon';


type Props = {
  obtainablePokemon: PokemonIngredientTypeMap,
  ingredientMap: IngredientMap,
};

export const IngredientObtainablePokemon = ({obtainablePokemon, ingredientMap}: Props) => {
  return (
    <Flex direction="col" className="info-section">
      {pokemonIngredientType.map((type, idx) => {
        return (
          <React.Fragment key={type}>
            <Flex direction="row" className="gap-3">
              <Flex direction="col" center noFullWidth>
                <div className="h-8 w-8">
                  <PokemonIngredientTypeIcon type={type as PokemonIngredientType}/>
                </div>
              </Flex>
              <Flex direction="col" center>
                <PokemonIconsWithIngredient data={obtainablePokemon[type]} ingredientMap={ingredientMap}/>
              </Flex>
            </Flex>
            {idx + 1 !== pokemonIngredientType.length && <HorizontalSplitter className="w-full"/>}
          </React.Fragment>
        );
      })}
    </Flex>
  );
};
