'use client';
import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {useUserDataActor} from '@/hooks/userData/actor';
import {useCalculatedUserSettings} from '@/hooks/userData/settings/calculated';
import {CookingServerDataProps} from '@/ui/cooking/common/type';
import {useMealMakerFilter} from '@/ui/cooking/make/hook';
import {MealMakerInputUI} from '@/ui/cooking/make/input/main';
import {MealMakerRecipe} from '@/ui/cooking/make/recipe/main';
import {MealMakerCommonProps, MealMakerFilter} from '@/ui/cooking/make/type';
import {toCookingPreset} from '@/ui/cooking/make/utils';
import {toUnique} from '@/utils/array';
import {subtractIngredientCount} from '@/utils/game/cooking';


export const MealMakerClient = (props: CookingServerDataProps) => {
  const {
    meals,
    ingredientMap,
    preloaded,
  } = props;

  const {
    filter,
    setFilter,
    isIncluded,
  } = useMealMakerFilter(props);
  const {actAsync, session, status} = useUserDataActor();
  const {calculatedSettings} = useCalculatedUserSettings({
    server: preloaded.settings,
    client: session.data?.user.preloaded.settings,
  });

  const validMeals = React.useMemo(() => meals.filter(({id}) => isIncluded[id]), [filter]);
  const mealTypes = toUnique(meals.map(({type}) => type));

  const commonProps: MealMakerCommonProps = {
    filter,
    setFilter,
    meals: validMeals,
    mealTypes,
    ingredientMap,
    calculatedSettings,
    status,
    onCook: async (ingredientsUsed) => {
      setFilter((original) => ({
        ...original,
        inventory: subtractIngredientCount(filter.inventory, ingredientsUsed),
      } satisfies MealMakerFilter));

      if (!actAsync) {
        return;
      }

      await actAsync({
        action: 'upload',
        options: {
          type: 'cooking',
          data: toCookingPreset({preloaded: preloaded.cooking, filter}),
        },
      });
    },
    preloaded: preloaded.cooking,
  };

  return (
    <Flex className="gap-1">
      <MealMakerInputUI {...commonProps}/>
      <AdsUnit/>
      <MealMakerRecipe {...commonProps}/>
      <AdsUnit/>
    </Flex>
  );
};
