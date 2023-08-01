import React from 'react';

import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonIconList} from '@/components/shared/pokemon/iconList';
import {IngredientTypeIcon} from '@/components/shared/pokemon/ingredientTypeIcon';
import {Meal} from '@/types/mongo/meal';
import {PokemonIngredientData, pokemonIngredientType, PokemonIngredientType} from '@/types/mongo/pokemon';


type Props = {
  meal: Meal,
  pokemonByIngredients: PokemonIngredientData,
};

export const MealIngredientByPokemon = ({meal, pokemonByIngredients}: Props) => {
  const t = useTranslations('Game.Food');

  return (
    <Flex direction="col" center className="info-section gap-2 md:w-1/2">
      {Object.entries(pokemonByIngredients.ingredient).map(([type, ingredientMap], idx) => (
        <React.Fragment key={type}>
          <div className="h-6 w-6">
            <IngredientTypeIcon type={type as PokemonIngredientType}/>
          </div>
          {meal.ingredients.map(({id}) => (
            <Flex key={id} direction="row">
              <Link href={`/ingredient/${id}`} className="button-clickable-bg">
                <Flex direction="col" center className="h-full">
                  <div className="relative h-12 w-12">
                    <NextImage src={`/images/ingredient/${id}.png`} alt={t(id.toString())} sizes="15vw"/>
                  </div>
                </Flex>
              </Link>
              <Flex direction="col" center>
                <PokemonIconList pokemonIds={ingredientMap[id]}/>
              </Flex>
            </Flex>
          ))}
          {idx + 1 !== pokemonIngredientType.length && <hr className="w-full border-t-gray-700"/>}
        </React.Fragment>
      ))}
    </Flex>
  );
};
