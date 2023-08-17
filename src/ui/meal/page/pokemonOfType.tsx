'use client';
import React from 'react';

import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonIconsIngredientStats} from '@/components/shared/pokemon/icon/ingredientStats';
import {PokemonIngredientTypeIcon} from '@/components/shared/pokemon/ingredients/typeIcon';
import {PokemonLevelSlider} from '@/components/shared/pokemon/levelSlider';
import {imageIconSizes} from '@/styles/image';
import {PokemonIngredientMap, PokemonIngredientType} from '@/types/mongo/pokemon';
import {MealCommonProps} from '@/ui/meal/page/type';
import {toUnique} from '@/utils/array';
import {isNotNullish} from '@/utils/type';


type Props = MealCommonProps & {
  type: PokemonIngredientType,
  pokeIngredientMap: PokemonIngredientMap,
};

export const MealPokemonOfIngredientType = ({
  meal,
  ingredientMap,
  pokedex,
  pokemonMaxLevel,
  type,
  pokeIngredientMap,
}: Props) => {
  const t = useTranslations('Game.Food');

  const [level, setLevel] = React.useState(1);

  return (
    <Flex direction="col" center className="info-section">
      <div className="h-8 w-8">
        <PokemonIngredientTypeIcon type={type}/>
      </div>
      <PokemonLevelSlider level={level} maxLevel={pokemonMaxLevel} setLevel={setLevel}/>
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
            <PokemonIconsIngredientStats
              level={level}
              data={toUnique(pokeIngredientMap[id] ?? []).map((id) => pokedex[id]).filter(isNotNullish)}
              ingredient={ingredientMap[id]}
            />
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
