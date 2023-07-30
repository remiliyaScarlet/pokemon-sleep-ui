import React from 'react';

import {useTranslations} from 'next-intl';


import {FilterIconInput} from '@/components/input/filter/icon';
import {FilterTextInput} from '@/components/input/filter/text';
import {getMultiSelectOnClickProps, getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex';
import potCapacity from '@/data/potCapacity.json';
import {mealTypeDotStyle} from '@/styles/classes';
import {Meal} from '@/types/mongo/meal';
import {MealIndexInputProps} from '@/ui/meal/index/input/type';
import {toUnique} from '@/utils/array';
import {classNames} from '@/utils/react';


type Props = MealIndexInputProps & {
  data: Meal[],
};

export const MealInput = (props: Props) => {
  const {data, filter, setFilter} = props;

  const t = useTranslations('Game');
  const t2 = useTranslations('Game.MealType');
  const t3 = useTranslations('UI.InPage.Cooking');

  return (
    <Flex direction="col" className="gap-1">
      <FilterTextInput
        style="highlight"
        title={t3('Ingredient')}
        idToItemId={(id) => `Ingredient-${id}`}
        ids={toUnique(data.map(({type}) => type)).sort((a, b) => a - b)}
        idToButton={(id) => (
          <Flex direction="row" className="gap-1" center>
            <div className={classNames('h-3 w-3 rounded-full', mealTypeDotStyle[id])}/>
            <div>{t2(id.toString())}</div>
          </Flex>
        )}
        {...getMultiSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'type',
        })}
        {...props}
      />
      <FilterIconInput
        title={t3('MealType')}
        idToItemId={(id) => `MealType-${id}`}
        ids={toUnique(data.flatMap(({ingredients}) => ingredients.map(({id}) => id))).sort((a, b) => a - b)}
        getAlt={(id) => t(`Food.${id.toString()}`)}
        idToImageSrc={(id) => `/images/ingredient/${id}.png`}
        {...getMultiSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'ingredient',
        })}
        {...props}
      />
      <FilterTextInput
        title={t3('PotCapacity')}
        idToItemId={(id) => `PotCapacity-${id}`}
        ids={toUnique(potCapacity.map(({capacity}) => capacity)).sort((a, b) => a - b)}
        idToButton={(id) => id.toString()}
        {...getSingleSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'ingredientCountCap',
        })}
        {...props}
      />
    </Flex>
  );
};
