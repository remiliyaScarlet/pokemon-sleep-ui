import React from 'react';

import {Flex} from '@/components/layout/flex';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonIconListMarkSpecialty} from '@/components/shared/pokemon/iconListMarkSpecialty';
import {IngredientTypeIcon} from '@/components/shared/pokemon/ingredientTypeIcon';
import {specialtyIdMap} from '@/types/game/pokemon';
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
                <PokemonIconListMarkSpecialty data={obtainablePokemon[type]} specialty={specialtyIdMap.ingredient}/>
              </Flex>
            </Flex>
            {idx + 1 !== pokemonIngredientType.length && <HorizontalSplitter className="w-full"/>}
          </React.Fragment>
        );
      })}
    </Flex>
  );
};
