'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {useCalculatedUserSettings} from '@/hooks/userData/settings/calculated';
import {MealMeta} from '@/ui/meal/page/meta';
import {MealPokemonOfIngredient} from '@/ui/meal/page/pokemon';
import {MealCommonProps, MealServerDataProps} from '@/ui/meal/page/type';


export const MealClient = (props: MealServerDataProps) => {
  const {preloadedSettings} = props;

  const {data} = useSession();
  const {calculatedSettings} = useCalculatedUserSettings({
    server: preloadedSettings,
    client: data?.user.preloaded.settings,
  });

  const commonProps: MealCommonProps = {
    ...props,
    calculatedSettings,
  };

  return (
    <Flex center className="gap-1.5">
      <MealMeta {...commonProps}/>
      <AdsUnit/>
      <MealPokemonOfIngredient {...commonProps}/>
    </Flex>
  );
};
