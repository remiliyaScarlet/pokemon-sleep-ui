import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PokemonIconList} from '@/components/shared/pokemon/iconList';
import {infoSectionStyle} from '@/styles/classes';
import {PokemonByIngredientMap} from '@/types/mongo/pokemon';
import {classNames} from '@/utils/react';


type Props = {
  pokemonByIngredients: PokemonByIngredientMap,
};

export const MealIngredientByPokemon = ({pokemonByIngredients}: Props) => {
  const t = useTranslations('Game.Food');

  return (
    <Flex direction="row" className={classNames(infoSectionStyle, 'w-full md:w-1/2')}>
      <table className="-m-4 border-separate border-spacing-4">
        <tbody>
          {Object.entries(pokemonByIngredients).map(([ingredientId, pokemonList]) => (
            <tr key={ingredientId}>
              <td className="rounded-lg bg-slate-700">
                <div className="relative h-16 w-16">
                  <Image
                    src={`/images/ingredient/${ingredientId}.png`} alt={t(ingredientId.toString())}
                    fill sizes="15vw"
                  />
                </div>
              </td>
              <td>
                <PokemonIconList pokemonIds={pokemonList?.map(({id}) => id)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Flex>
  );
};
