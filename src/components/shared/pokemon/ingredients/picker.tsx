import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {getToggleButtonClass} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {
  IngredientChain,
  IngredientLevel,
  ingredientLevels,
  IngredientProduction,
  IngredientProductionAtLevels,
} from '@/types/game/pokemon/ingredient';


type Props = {
  chain: IngredientChain,
  ingredients: IngredientProductionAtLevels,
  onSelect: (production: IngredientProduction, level: IngredientLevel) => void,
  idPrefix: string,
};

export const PokemonIngredientPicker = ({
  chain,
  ingredients,
  onSelect,
  idPrefix,
}: Props) => {
  const t = useTranslations('Game');

  return (
    <Flex className="gap-1.5 md:flex-row">
      {ingredientLevels.map((level) => {
        const current = ingredients[level];
        const productions = chain.ingredients[level];

        return (
          <Flex key={level} direction="col" className="rounded-lg bg-slate-500/10 p-2">
            <Flex direction="row" center className="gap-1.5 md:flex-col">
              <Flex direction="row" noFullWidth center className="w-12 gap-1">
                <div>Lv</div>
                <div>{level}</div>
              </Flex>
              <Flex direction="row" className="gap-1" center wrap>
                {productions.map((production) => {
                  const {id, qty} = production;
                  const active = current.id === id;
                  const itemId = `${idPrefix}-ingredient-${level}-${id}`;

                  return (
                    <ToggleButton
                      key={itemId}
                      active={active}
                      id={itemId}
                      onClick={() => onSelect(production, level)}
                      className={clsx('rounded-lg p-1.5', getToggleButtonClass(active))}
                    >
                      <Flex direction="row" center noFullWidth className="gap-1 md:flex-col">
                        <div className="group relative h-7 w-7">
                          <NextImage
                            src={`/images/ingredient/${id}.png`}
                            alt={t(`Food.${id}`)}
                            sizes={imageIconSizes}
                          />
                        </div>
                        <Flex direction="row" center noFullWidth className="gap-1">
                          <div>&times;</div>
                          <div>{qty}</div>
                        </Flex>
                      </Flex>
                    </ToggleButton>
                  );
                })}
              </Flex>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};
