import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/text';
import {getSingleSelectOnClickProps} from '@/components/input/filter/utils';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex';
import potCapacity from '@/data/potCapacity.json';
import {mealTypeActiveStyle, mealTypeBackgroundStyle} from '@/styles/classes';
import {CookingCommonProps} from '@/ui/cooking/type';
import {toUnique} from '@/utils/array';
import {classNames} from '@/utils/react';


export const CookingInputGeneral = ({mealTypes, input, setInput}: CookingCommonProps) => {
  const t = useTranslations('Game.MealType');

  return (
    <>
      <Flex direction="row" center wrap className="gap-1.5">
        {mealTypes.map((type) => {
          const isActive = input.type === type;

          return (
            <ToggleButton
              key={type}
              id={`mealType-${type}`}
              active={isActive}
              onClick={() => setInput((original) => ({...original, type}))}
            >
              <Flex direction="col" center className={classNames(
                'px-4 h-8 rounded-lg whitespace-nowrap',
                mealTypeBackgroundStyle[type],
                isActive ? mealTypeActiveStyle[type] : undefined,
              )}>
                {t(type.toString())}
              </Flex>
            </ToggleButton>
          );
        })}
      </Flex>
      <FilterTextInput
        style="none"
        titleI18nNamespace="UI.InPage.Cooking"
        titleI18nKey="PotCapacity"
        idToItemId={(id) => id.toString()}
        ids={toUnique(potCapacity.map(({capacity}) => capacity)).sort((a, b) => a - b)}
        idToButton={(id) => id.toString()}
        {...getSingleSelectOnClickProps({
          filter: input,
          setFilter: setInput,
          filterKey: 'capacity',
        })}
      />
    </>
  );
};
