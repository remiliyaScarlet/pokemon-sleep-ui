import React from 'react';

import {useTranslations} from 'next-intl';


import {FilterIconInput} from '@/components/input/filter/icon';
import {FilterTextInput} from '@/components/input/filter/text';
import {getMultiSelectOnClickProps, getSingleSelectOnClickProps} from '@/components/input/filter/utils';
import {Flex} from '@/components/layout/flex';
import potCapacity from '@/data/potCapacity.json';
import {mealTypeDotStyle} from '@/styles/classes';
import {I18nNamespaces} from '@/types/i18n';
import {Meal} from '@/types/mongo/meal';
import {MealIndexInputProps} from '@/ui/meal/index/input/type';
import {toUnique} from '@/utils/array';
import {classNames} from '@/utils/react';


const titleI18nNamespace: I18nNamespaces = 'UI.InPage.Meal';

type Props = MealIndexInputProps & {
  data: Meal[],
};

export const MealInput = (props: Props) => {
  const {data, filter, setFilter} = props;

  const t = useTranslations('Game');
  const t2 = useTranslations('Game.MealType');

  return (
    <Flex direction="col" className="gap-1">
      <FilterTextInput
        style="highlight"
        titleI18nNamespace={titleI18nNamespace}
        titleI18nKey="Ingredient"
        idToItemId={(id) => id.toString()}
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
        titleI18nNamespace={titleI18nNamespace}
        titleI18nKey="MealType"
        idToItemId={(id) => id.toString()}
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
        titleI18nNamespace={titleI18nNamespace}
        titleI18nKey="PotCapacity"
        idToItemId={(id) => id.toString()}
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
