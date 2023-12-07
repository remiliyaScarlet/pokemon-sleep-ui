import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputRow} from '@/components/input/filter/row';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {ButtonToStartTheSorcery} from '@/components/shared/common/button/sorcery';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {IngredientInventoryInput} from '@/components/shared/input/ingredient/inventory';
import {MealTypeInput} from '@/components/shared/input/mealType';
import {MealPlanner} from '@/components/shared/meal/planner/main';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {usePossibleMealTypes} from '@/hooks/meal';
import {textFilterButtonStyle} from '@/styles/input';
import {TeamMakerDataProps, TeamMakerInput} from '@/ui/team/maker/type';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {isNotNullish} from '@/utils/type';


export type TeamMakerInputProps = TeamMakerDataProps & {
  input: TeamMakerInput,
  setInput: React.Dispatch<React.SetStateAction<TeamMakerInput>>,
  onRun: () => void,
};

export const TeamMakerInputUI = ({input, setInput, onRun, ...props}: TeamMakerInputProps) => {
  const {
    pokedexMap,
    ingredientMap,
    mealMap,
    mapMeta,
  } = props;
  const {
    target,
    recipeLevel,
    ingredientCount,
    showInsufficientIngredients,
  } = input;

  const t = useTranslations('UI.InPage.Team');
  const mealTypes = usePossibleMealTypes(Object.values(mealMap).filter(isNotNullish));

  return (
    <Flex className="gap-1.5">
      <SnorlaxFavoriteInput
        filter={input}
        setFilter={setInput}
        filterKey="snorlaxFavorite"
        pokemonList={Object.values(pokedexMap).filter(isNotNullish)}
        mapMeta={mapMeta}
      />
      <MealTypeInput
        mealTypes={mealTypes}
        isActive={(mealType) => mealType === input.mealType}
        onClick={(mealType) => setInput((original) => ({...original, mealType}))}
      />
      <MealPlanner
        target={target}
        setTarget={(updated) => setInput(({target, ...original}) => ({
          ...original,
          target: cloneMerge(target, updated),
        }))}
        recipeLevel={recipeLevel}
        setRecipeLevel={(updated) => setInput(({recipeLevel, ...original}) => ({
          ...original,
          recipeLevel: cloneMerge(recipeLevel, updated),
        }))}
        mealMap={mealMap}
        mealTypes={mealTypes}
      />
      <IngredientInventoryInput
        ingredientMap={ingredientMap}
        counter={ingredientCount}
        showIngredient={() => true}
        onValueChanged={({id}, count) => setInput(({ingredientCount, ...original}) => ({
          ...original,
          ingredientCount: {
            ...ingredientCount,
            [id]: count,
          },
        }))}
      />
      <InputRow className="justify-end">
        <ToggleButton
          active={showInsufficientIngredients}
          onClick={() => setInput(({showInsufficientIngredients, ...original}) => ({
            ...original,
            showInsufficientIngredients: !showInsufficientIngredients,
          }))}
          className={clsx('gap-1', textFilterButtonStyle)}
        >
          <div className="h-5 w-5">
            {showInsufficientIngredients ? <EyeIcon/> : <EyeSlashIcon/>}
          </div>
          <GenericIcon
            src="/images/generic/ingredientSlash.png"
            alt={t('Maker.Behavior.ToggleInsufficientIngredients')}
            dimension="h-5 w-5"
            noInvert
            isActive={showInsufficientIngredients}
          />
        </ToggleButton>
      </InputRow>
      <ButtonToStartTheSorcery onClick={onRun}/>
    </Flex>
  );
};
