'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {Flex} from '@/components/layout/flex';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonIconsIngredientStats} from '@/components/shared/pokemon/icon/ingredientStats';
import {PokemonIngredientStatsCommonProps} from '@/components/shared/pokemon/icon/type';
import {PokemonLevelSlider} from '@/components/shared/pokemon/levelSlider';
import {useEffectiveBonus} from '@/hooks/userData/settings';
import {Ingredient} from '@/types/game/ingredient';
import {PokedexMap, PokemonIngredientProduction, PokemonItemDropData} from '@/types/game/pokemon';
import {UserSettings} from '@/types/userData/settings';
import {toSum} from '@/utils/array';


type Props = Omit<PokemonIngredientStatsCommonProps, 'dropData'> & {
  pokedex: PokedexMap,
  pokemonMaxLevel: number,
  pokemonProduction: PokemonIngredientProduction[],
  ingredient: Ingredient,
  preloadedSettings: UserSettings,
};

export const IngredientPokemonProduction = ({
  pokemonMaxLevel,
  pokemonProduction,
  ingredient,
  preloadedSettings,
  ...props
}: Props) => {
  const [level, setLevel] = React.useState(1);
  const {data} = useSession();
  const bonus = useEffectiveBonus({
    server: preloadedSettings,
    client: data?.user.preloaded.settings,
  });

  const dropData: PokemonItemDropData[] = pokemonProduction.map(({pokemon, productions}) => {
    return {
      pokemon,
      qty: toSum(productions
        .filter((production) => level >= production.level)
        .map(({qty}) => qty)),
    };
  });

  return (
    <Flex direction="col" className="info-section">
      <PokemonLevelSlider level={level} maxLevel={pokemonMaxLevel} setLevel={setLevel}/>
      <HorizontalSplitter/>
      <PokemonIconsIngredientStats
        level={level}
        dropData={dropData}
        ingredient={ingredient}
        bonus={bonus}
        {...props}
      />
    </Flex>
  );
};
