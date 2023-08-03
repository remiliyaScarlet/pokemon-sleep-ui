import React from 'react';

import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonIconListMarkSpecialty} from '@/components/shared/pokemon/iconListMarkSpecialty';
import {IngredientTypeIcon} from '@/components/shared/pokemon/ingredientTypeIcon';
import {imageIconSizes} from '@/styles/image';
import {specialtyIdMap} from '@/types/game/pokemon';
import {Meal} from '@/types/mongo/meal';
import {PokedexMap, PokemonIngredientData, PokemonIngredientType} from '@/types/mongo/pokemon';
import {toUnique} from '@/utils/array';
import {isNotNullish} from '@/utils/type';


type Props = {
  meal: Meal,
  pokedex: PokedexMap,
  pokemonByIngredients: PokemonIngredientData,
};

export const MealIngredientByPokemon = ({meal, pokedex, pokemonByIngredients}: Props) => {
  const t = useTranslations('Game.Food');

  return (
    <>
      {Object.entries(pokemonByIngredients.ingredient).map(([type, ingredientMap]) => (
        <Flex key={type} direction="col" center className="info-section gap-2 lg:m-auto lg:w-2/3">
          <div className="h-8 w-8">
            <IngredientTypeIcon type={type as PokemonIngredientType}/>
          </div>
          <HorizontalSplitter className="w-full"/>
          {meal.ingredients.map(({id}) => (
            <Flex key={id} direction="row">
              <Link href={`/ingredient/${id}`} className="button-clickable-bg">
                <Flex direction="col" center className="h-full">
                  <div className="relative h-12 w-12">
                    <NextImage src={`/images/ingredient/${id}.png`} alt={t(id.toString())} sizes={imageIconSizes}/>
                  </div>
                </Flex>
              </Link>
              <Flex direction="col" center>
                <PokemonIconListMarkSpecialty
                  data={toUnique(ingredientMap[id] ?? []).map((id) => pokedex[id]).filter(isNotNullish)}
                  specialty={specialtyIdMap.ingredient}
                />
              </Flex>
            </Flex>
          ))}
        </Flex>
      ))}
    </>
  );
};
