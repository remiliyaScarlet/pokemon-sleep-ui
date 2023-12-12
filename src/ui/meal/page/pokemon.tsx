import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {PokemonIndividualParamsPicker} from '@/components/shared/pokemon/predefined/individual/main';
import {PokemonIndividualParamsInput} from '@/components/shared/pokemon/predefined/individual/type';
import {defaultLevel} from '@/const/game/production';
import {MealIngredientSection} from '@/ui/meal/page/ingredient';
import {MealCommonProps} from '@/ui/meal/page/type';
import {getIngredientLevel} from '@/utils/game/ingredient';


type Props = MealCommonProps & {
  isPremium: boolean,
};

export const MealPokemonOfIngredient = ({isPremium, ...props}: Props) => {
  const {
    meal,
    pokemonIngredientProductionMap,
    subSkillMap,
    pokemonMaxLevel,
  } = props;
  const [input, setInput] = React.useState<PokemonIndividualParamsInput>({
    level: defaultLevel,
    subSkill: {},
    nature: null,
  });

  const {level} = input;
  const ingredientLevel = React.useMemo(() => getIngredientLevel(level), [level]);

  return (
    <>
      <Flex className="info-section">
        <PokemonIndividualParamsPicker
          filter={input}
          setFilter={setInput}
          maxLevel={pokemonMaxLevel}
          isPremium={isPremium}
          subSkillMap={subSkillMap}
        />
      </Flex>
      <Flex className="gap-1.5">
        {meal.ingredients.map((ingredient) => (
          <MealIngredientSection
            key={ingredient.id}
            ingredient={ingredient}
            input={input}
            ingredientProductionMapOfLevel={pokemonIngredientProductionMap[ingredientLevel]}
            {...props}
          />
        ))}
        <AdsUnit/>
      </Flex>
    </>
  );
};
