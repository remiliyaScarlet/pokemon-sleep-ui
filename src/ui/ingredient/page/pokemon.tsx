'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {Flex} from '@/components/layout/flex/common';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonIngredientStats} from '@/components/shared/pokemon/icon/itemStats/ingredient';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {useTranslatedUserSettings} from '@/hooks/userData/translated';
import {Ingredient} from '@/types/game/ingredient';
import {ingredientLevels} from '@/types/game/pokemon/ingredient';
import {IngredientProductionDataProps} from '@/ui/ingredient/page/type';


type Props = IngredientProductionDataProps & {
  pokemonMaxLevel: number,
  ingredient: Ingredient,
};

export const IngredientPokemonProduction = ({
  mealMap,
  preloaded,
  pokemonMaxLevel,
  ingredient,
  ...props
}: Props) => {
  const [level, setLevel] = React.useState(1);
  const {data} = useSession();
  const {translatedSettings} = useTranslatedUserSettings({
    bundle: {
      server: preloaded,
      client: data?.user.preloaded,
    },
    mealMap,
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
        translatedSettings={translatedSettings}
        {...props}
      />
    </Flex>
  );
};
