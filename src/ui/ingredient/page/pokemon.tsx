'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {Flex} from '@/components/layout/flex';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonIconsIngredientStats} from '@/components/shared/pokemon/icon/itemStats/ingredient';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {useUserSettings} from '@/hooks/userData/settings';
import {Ingredient} from '@/types/game/ingredient';
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
  const settings = useUserSettings({
    server: preloadedSettings,
    client: data?.user.preloaded.settings,
  });

  return (
    <Flex direction="col" className="info-section">
      <PokemonLevelSlider level={level} maxLevel={pokemonMaxLevel} setLevel={setLevel}/>
      <HorizontalSplitter/>
      <PokemonIconsIngredientStats
        level={level}
        ingredient={ingredient}
        {...settings}
        {...props}
      />
    </Flex>
  );
};
