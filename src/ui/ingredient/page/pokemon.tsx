import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokemonIconList} from '@/components/shared/pokemon/iconList';
import {IngredientTypeIcon} from '@/components/shared/pokemon/ingredientTypeIcon';
import {PokemonIngredientType, pokemonIngredientType, PokemonIngredientTypeMap} from '@/types/mongo/pokemon';


type Props = {
  obtainablePokemon: PokemonIngredientTypeMap,
  ingredientId: number,
};

export const IngredientObtainablePokemon = ({obtainablePokemon}: Props) => {
  return (
    <Flex direction="col" className="info-section">
      {pokemonIngredientType.map((type, idx) => {
        return (
          <React.Fragment key={type}>
            <Flex direction="row">
              <Flex direction="col" center noFullWidth>
                <div className="h-6 w-6">
                  <IngredientTypeIcon type={type as PokemonIngredientType}/>
                </div>
              </Flex>
              <Flex direction="col" center>
                <PokemonIconList pokemonIds={obtainablePokemon[type].map(({id}) => id)}/>
              </Flex>
            </Flex>
            {idx + 1 !== pokemonIngredientType.length && <hr className="w-full border-t-gray-700"/>}
          </React.Fragment>
        );
      })}
    </Flex>
  );
};
