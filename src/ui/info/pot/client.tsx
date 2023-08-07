'use client';
import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {usePotInfoFilter} from '@/ui/info/pot/hook';
import {PotInfoInput} from '@/ui/info/pot/input';
import {PotInfoCommonProps} from '@/ui/info/pot/type';
import {PotRecipeUnlockTable} from '@/ui/info/pot/unlockTable';
import {toUnique} from '@/utils/array';


export const PotInfoClient = (props: PotInfoCommonProps) => {
  const {meals, ingredients} = props;
  const {filter, setFilter, isIncluded} = usePotInfoFilter(props);

  const validMeals = React.useMemo(() => meals.filter(({id}) => isIncluded[id]), [filter]);
  const mealTypes = toUnique(meals.map(({type}) => type));

  return (
    <>
      <PotInfoInput filter={filter} setFilter={setFilter} mealTypes={mealTypes} ingredients={ingredients}/>
      <AdsUnit/>
      <PotRecipeUnlockTable filter={filter} meals={validMeals}/>
      <AdsUnit/>
    </>
  );
};
