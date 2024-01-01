import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {PokemonIndividualParamsPicker} from '@/components/shared/pokemon/predefined/individual/main';
import {defaultPokemonIndividualParams} from '@/const/game/pokemon';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
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
  const [input, setInput] = React.useState<PokemonIndividualParams>(
    defaultPokemonIndividualParams,
  );

  const {level} = input;
  const ingredientLevel = React.useMemo(() => getIngredientLevel(level), [level]);

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
