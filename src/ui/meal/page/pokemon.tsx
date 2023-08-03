import React from 'react';

import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonIconsWithIngredient} from '@/components/shared/pokemon/icon/listWithIngredient';
import {PokemonIngredientTypeIcon} from '@/components/shared/pokemon/ingredients/typeIcon';
import {imageIconSizes} from '@/styles/image';
import {PokedexMap, PokemonIngredientData, PokemonIngredientType} from '@/types/mongo/pokemon';
import {MealCommonProps} from '@/ui/meal/page/type';
import {toUnique} from '@/utils/array';
import {isNotNullish} from '@/utils/type';


type Props = MealCommonProps & {
  pokedex: PokedexMap,
  pokemonByIngredients: PokemonIngredientData,
};

export const MealIngredientByPokemon = ({meal, ingredientMap, pokedex, pokemonByIngredients}: Props) => {
  const t = useTranslations('Game.Food');

  return (
    <>
      {Object.entries(pokemonByIngredients.ingredient).map(([type, pokeIngredientMap]) => (
        <Flex key={type} direction="col" center className="info-section">
          <div className="h-8 w-8">
            <PokemonIngredientTypeIcon type={type as PokemonIngredientType}/>
          </div>
          {meal.ingredients.map(({id, quantity}) => (
            <Flex key={id} direction="row" className="gap-2">
              <Link href={`/ingredient/${id}`} className="button-clickable-bg">
                <Flex direction="col" center className="h-full">
                  <div className="relative h-12 w-12">
                    <NextImage src={`/images/ingredient/${id}.png`} alt={t(id.toString())} sizes={imageIconSizes}/>
                  </div>
                  <div>{quantity}</div>
                </Flex>
              </Link>
              <Flex
                direction="col" center
                className="border-button-clickable rounded-r-lg border-y-2 border-r-2 py-2 pr-2"
              >
                <PokemonIconsWithIngredient
                  data={toUnique(pokeIngredientMap[id] ?? []).map((id) => pokedex[id]).filter(isNotNullish)}
                  ingredientMap={ingredientMap}
                />
              </Flex>
            </Flex>
          ))}
        </Flex>
      ))}
    </>
  );
};
