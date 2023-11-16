'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {Flex} from '@/components/layout/flex/common';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonIngredientStats} from '@/components/shared/pokemon/icon/itemStats/ingredient';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {useCalculatedUserSettings} from '@/hooks/userData/settings/calculated';
import {Ingredient} from '@/types/game/ingredient';
import {ingredientLevels} from '@/types/game/pokemon/ingredient';
import {UserSettings} from '@/types/userData/settings';
import {IngredientProductionDataProps} from '@/ui/ingredient/page/type';


type Props = IngredientProductionDataProps & {
  pokemonMaxLevel: number,
  ingredient: Ingredient,
  preloadedSettings: UserSettings,
};

export const IngredientPokemonProduction = ({
  pokemonMaxLevel,
  ingredient,
  preloadedSettings,
  ...props
}: Props) => {
  const [level, setLevel] = React.useState(1);
  const {data} = useSession();
  const {calculatedSettings} = useCalculatedUserSettings({
    server: preloadedSettings,
    client: data?.user.preloaded.settings,
  });

  return (
    <Flex className="info-section">
      <PokemonLevelSlider
        value={level}
        max={pokemonMaxLevel}
        setValue={setLevel}
        presetLevels={[...ingredientLevels]}
      />
      <HorizontalSplitter/>
      <PokemonIngredientStats
        level={level}
        ingredient={ingredient}
        {...calculatedSettings}
        {...props}
      />
    </Flex>
  );
};
