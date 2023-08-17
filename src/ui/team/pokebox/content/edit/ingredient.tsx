import React from 'react';

import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {FilterIconInput} from '@/components/input/filter/icon';
import {Flex} from '@/components/layout/flex';
import {PokemonIngredientPick} from '@/types/game/producing/ingredient';
import {ingredientProductionLimit} from '@/ui/team/pokebox/content/edit/const';
import {PokeboxPokeInBoxUpdateCommonProps} from '@/ui/team/pokebox/content/edit/type';


export const PokeboxPokeInBoxIngredientEditor = ({
  pokeInBox,
  pokemon,
  setPokeInBox,
}: PokeboxPokeInBoxUpdateCommonProps) => {
  const t = useTranslations('Game');

  const {randomIngredient} = pokeInBox;

  const updatePokebox = (updated: PokemonIngredientPick, currentLevel: number) => setPokeInBox({
    ...pokeInBox,
    randomIngredient: randomIngredient
      .filter(({level}) => level !== currentLevel)
      .concat(updated)
      .sort((a, b) => a.level - b.level),
  });

  return (
    <Flex direction="col" className="gap-1.5">
      {randomIngredient.map((current) => {
        const {level, id, quantity} = current;

        return <FilterIconInput
          key={level}
          onClick={(id) => {
            const updated: PokemonIngredientPick = {...current, id};
            updatePokebox(updated, level);
          }}
          isActive={(choiceId) => choiceId === id}
          title={<><span className="text-xs">Lv</span>&nbsp;{level}</>}
          ids={pokemon.ingredients.random ?? []}
          idToItemId={(id) => `${pokeInBox.uuid}-ingredient-${level}-${id}`}
          idToAlt={(id) => t(`Food.${id}`)}
          idToImageSrc={(id) => `/images/ingredient/${id}.png`}
          ender={
            <InputBox
              type="number"
              value={quantity.toString()}
              className="w-20 text-center"
              onChange={({target}) => {
                const quantity = parseInt(target.value || '0');

                if (isNaN(quantity)) {
                  return;
                }

                const updated: PokemonIngredientPick = {
                  ...current,
                  quantity: Math.min(quantity, ingredientProductionLimit),
                };
                updatePokebox(updated, level);
              }}
            />
          }
        />;
      })}
    </Flex>
  );
};
