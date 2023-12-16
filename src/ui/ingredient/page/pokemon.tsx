'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {PokemonIngredientStats} from '@/components/shared/pokemon/icon/itemStats/ingredient';
import {PokemonIndividualParamsPicker} from '@/components/shared/pokemon/predefined/individual/main';
import {PokemonIndividualParamsInput} from '@/components/shared/pokemon/predefined/individual/type';
import {defaultLevel} from '@/const/game/production';
import {useUserActivation} from '@/hooks/userData/activation';
import {useTranslatedUserSettings} from '@/hooks/userData/translated';
import {Ingredient} from '@/types/game/ingredient';
import {IngredientProductionDataProps} from '@/ui/ingredient/page/type';


type Props = IngredientProductionDataProps & {
  pokemonMaxLevel: number,
  ingredient: Ingredient,
};

export const IngredientPokemonProduction = ({
  mealMap,
  preloaded,
  pokemonMaxLevel,
  subSkillMap,
  ingredient,
  ...props
}: Props) => {
  const [input, setInput] = React.useState<PokemonIndividualParamsInput>({
    level: defaultLevel,
    subSkill: {},
    nature: null,
  });
  const {data} = useSession();
  const {isPremium} = useUserActivation(data);
  const {translatedSettings} = useTranslatedUserSettings({
    bundle: {
      server: preloaded,
      client: data?.user.preloaded,
    },
    mealMap,
  });

  return (
    <>
      <PokemonIndividualParamsPicker
        filter={input}
        setFilter={setInput}
        maxLevel={pokemonMaxLevel}
        isPremium={isPremium}
        subSkillMap={subSkillMap}
        className="info-section"
      />
      <PokemonIngredientStats
        input={input}
        ingredient={ingredient}
        translatedSettings={translatedSettings}
        subSkillMap={subSkillMap}
        {...props}
      />
    </>
  );
};
