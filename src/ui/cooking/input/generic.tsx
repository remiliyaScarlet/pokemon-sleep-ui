import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterIconInput} from '@/components/input/filter/icon';
import {FilterTextInput} from '@/components/input/filter/text';
import {getMultiSelectOnClickProps, getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import potCapacity from '@/data/potCapacity.json';
import {mealTypeActiveStyle, mealTypeBackgroundStyle} from '@/styles/classes';
import {CookingCommonProps} from '@/ui/cooking/type';
import {toUnique} from '@/utils/array';
import {classNames} from '@/utils/react';


export const CookingInputGeneral = ({mealTypes, ingredients, filter, setFilter}: CookingCommonProps) => {
  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Cooking');

  return (
    <>
      <FilterTextInput
        title={t2('MealType')}
        idToItemId={(id) => `MealType-${id.toString()}`}
        ids={mealTypes}
        idToButton={(id) => t(`MealType.${id}`)}
        getClassNames={(isActive, id) => classNames(
          'px-4 h-8 rounded-lg whitespace-nowrap',
          mealTypeBackgroundStyle[id],
          isActive ? mealTypeActiveStyle[id] : undefined,
        )}
        {...getSingleSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'type',
        })}
      />
      <FilterTextInput
        title={t2('PotCapacity')}
        idToItemId={(id) => `PotCapacity-${id.toString()}`}
        ids={toUnique(potCapacity.map(({capacity}) => capacity)).sort((a, b) => a - b)}
        idToButton={(id) => id.toString()}
        {...getSingleSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'capacity',
        })}
      />
      <FilterIconInput
        title={t2('Ingredient')}
        idToItemId={(id) => `Ingredient-${id}`}
        ids={Object.keys(ingredients).map((id) => Number(id))}
        getAlt={(id) => t(`Food.${id.toString()}`)}
        idToImageSrc={(id) => `/images/ingredient/${id}.png`}
        {...getMultiSelectOnClickProps({
          filter: filter,
          setFilter: setFilter,
          filterKey: 'ingredient',
        })}
      />
    </>
  );
};
