import React from 'react';

import clone from 'lodash/clone';
import merge from 'lodash/merge';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {FilterIconInput} from '@/components/input/filter/icon';
import {Flex} from '@/components/layout/flex';
import {pokeInBoxIngredientLevel} from '@/types/game/pokebox';
import {ingredientProductionLimit} from '@/ui/team/pokebox/content/edit/const';
import {PokeboxPokeInBoxUpdateCommonProps} from '@/ui/team/pokebox/content/edit/type';


export const PokeboxPokeInBoxIngredientEditor = ({
  pokeInBoxUiId,
  pokeInBox,
  pokemon,
  setPokeInBox,
}: PokeboxPokeInBoxUpdateCommonProps) => {
  const t = useTranslations('Game');

  const {randomIngredient} = pokeInBox;

  return (
    <Flex direction="col" className="gap-1.5">
      {pokeInBoxIngredientLevel.map((ingredientLevel) => {
        const randomIngredientOfLevel = randomIngredient[ingredientLevel];

        if (!randomIngredientOfLevel) {
          return <React.Fragment key={ingredientLevel}/>;
        }

        return (
          <FilterIconInput
            key={ingredientLevel}
            onClick={(id) => setPokeInBox(merge(clone(pokeInBox), {randomIngredient: {[ingredientLevel]: {id}}}))}
            isActive={(id) => id === randomIngredientOfLevel.id}
            title={<><span className="text-xs">Lv</span>&nbsp;{ingredientLevel}</>}
            ids={pokemon.ingredients.random ?? []}
            idToItemId={(id) => `${pokeInBoxUiId}-ingredient-${ingredientLevel}-${id}`}
            idToAlt={(id) => t(`Food.${id}`)}
            idToImageSrc={(id) => `/images/ingredient/${id}.png`}
            ender={
              <InputBox
                type="number"
                value={randomIngredientOfLevel.quantity.toString()}
                className="w-20 text-center"
                onChange={({target}) => {
                  const quantity = parseInt(target.value || '0');

                  if (isNaN(quantity)) {
                    return;
                  }

                  setPokeInBox(merge(
                    clone(pokeInBox),
                    {randomIngredient: {[ingredientLevel]: {quantity: Math.min(quantity, ingredientProductionLimit)}}},
                  ));
                }}
              />
            }
          />
        );
      })}
    </Flex>
  );
};
