import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PokemonIconList} from '@/components/shared/pokemon/iconList';
import {buttonStyle, infoSectionStyle} from '@/styles/classes';
import {PokemonIngredientData} from '@/types/mongo/pokemon';
import {classNames} from '@/utils/react';


type Props = {
  pokemonByIngredients: PokemonIngredientData,
};

export const MealIngredientByPokemon = ({pokemonByIngredients}: Props) => {
  const t = useTranslations('Game.Food');

  return (
    <Flex direction="row" className={classNames(infoSectionStyle, 'md:w-1/2')}>
      <table className="-m-4 border-separate border-spacing-4">
        <tbody>
          {Object.entries(pokemonByIngredients.ingredient).map(([ingredientId, pokemonIds]) => (
            <tr key={ingredientId}>
              <td className={classNames('rounded-lg', buttonStyle.background)}>
                <div className="relative h-16 w-16">
                  <Image
                    src={`/images/ingredient/${ingredientId}.png`} alt={t(ingredientId.toString())}
                    fill sizes="15vw"
                  />
                </div>
              </td>
              <td>
                <PokemonIconList
                  pokemonIds={pokemonIds?.map(({id}) => id)}
                  getInfo={(id) => `#${pokemonByIngredients.info[id]?.ingredients.indexOf(Number(ingredientId)) + 1}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Flex>
  );
};
