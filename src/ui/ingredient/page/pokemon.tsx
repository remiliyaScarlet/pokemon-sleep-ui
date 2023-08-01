import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonIconListDuplicable} from '@/components/shared/pokemon/iconListDuplicable';
import {IngredientTypeIcon} from '@/components/shared/pokemon/ingredientTypeIcon';
import {imageSmallIconSizes} from '@/styles/image';
import {specialtyIdMap} from '@/types/game/pokemon';
import {PokemonIngredientType, pokemonIngredientType, PokemonIngredientTypeMap} from '@/types/mongo/pokemon';


type Props = {
  obtainablePokemon: PokemonIngredientTypeMap,
  ingredientId: number,
};

export const IngredientObtainablePokemon = ({obtainablePokemon}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

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
                <PokemonIconListDuplicable
                  dataWithPokemonId={obtainablePokemon[type]}
                  getPokemonId={({id}) => id}
                  getInfo={({specialty}) => (
                    specialty === specialtyIdMap.ingredient ?
                      <div className="relative h-4 w-4">
                        <NextImage
                          src="/images/generic/flash.png" alt={t('Specialty')}
                          sizes={imageSmallIconSizes} className="invert-on-light"
                        />
                      </div> :
                      undefined
                  )}
                />
              </Flex>
            </Flex>
            {idx + 1 !== pokemonIngredientType.length && <hr className="w-full border-t-gray-700"/>}
          </React.Fragment>
        );
      })}
    </Flex>
  );
};
