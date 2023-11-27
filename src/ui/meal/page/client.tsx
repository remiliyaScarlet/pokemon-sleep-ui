'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {useTranslatedUserSettings} from '@/hooks/userData/translated';
import {MealInfo} from '@/ui/meal/page/info';
import {MealPokemonOfIngredient} from '@/ui/meal/page/pokemon';
import {MealCommonProps, MealServerDataProps} from '@/ui/meal/page/type';


export const MealClient = (props: MealServerDataProps) => {
  const {preloaded, mealMap} = props;

  const {data} = useSession();
  const {translatedSettings} = useTranslatedUserSettings({
    bundle: {
      server: preloaded,
      client: data?.user.preloaded,
    },
    mealMap,
  });

  const commonProps: MealCommonProps = {
    ...props,
    translatedSettings,
  };

  return (
    <Flex center className="gap-1.5">
      <MealInfo {...commonProps}/>
      <AdsUnit/>
      <MealPokemonOfIngredient {...commonProps}/>
    </Flex>
  );
};
