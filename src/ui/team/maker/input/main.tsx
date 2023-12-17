import React from 'react';

import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {InputRow} from '@/components/input/filter/row';
import {getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {IngredientInventoryInput} from '@/components/shared/input/ingredient/inventory';
import {MealTypeInput} from '@/components/shared/input/mealType';
import {MealPlanner} from '@/components/shared/meal/planner/main';
import {PokemonPreviewLevelInput} from '@/components/shared/pokemon/level/previewInput';
import {PokemonCollapsibleFilter} from '@/components/shared/pokemon/predefined/filter';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {usePossibleMealTypes} from '@/hooks/meal';
import {textFilterButtonStyle} from '@/styles/input';
import {TeamMakerBasisOption} from '@/ui/team/maker/input/basis';
import {TeamMakerDataProps} from '@/ui/team/maker/type';
import {teamMakerMemberCount} from '@/ui/team/maker/type/common';
import {teamMakerBasis, TeamMakerInput} from '@/ui/team/maker/type/input';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {isNotNullish} from '@/utils/type';


export type TeamMakerInputProps = TeamMakerDataProps & {
  input: TeamMakerInput,
  setInput: React.Dispatch<React.SetStateAction<TeamMakerInput>>,
};

export const TeamMakerInputUI = ({input, setInput, ...props}: TeamMakerInputProps) => {
  const {
    pokedexMap,
    ingredientMap,
    mealMap,
    mapMeta,
  } = props;
  const {
    target,
    pokemon,
    recipeLevel,
    ingredientCount,
    previewFinalEvolution,
    showInsufficientIngredients,
  } = input;

  const collapsible = useCollapsible();
  const t = useTranslations('UI.InPage.Team');
  const t2 = useTranslations('UI.InPage.Pokedex.Input');
  const mealTypes = usePossibleMealTypes(Object.values(mealMap).filter(isNotNullish));

  return (
    <Flex className="gap-1">
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
      <PokemonCollapsibleFilter
        collapsibleState={collapsible}
        pokemonList={Object.values(pokedexMap).filter(isNotNullish)}
        filter={pokemon}
        setFilter={(getUpdated) => setInput(({pokemon, ...original}) => ({
          ...original,
          pokemon: getUpdated(pokemon),
        }))}
        {...props}
      />
      <FilterExpandedInput
        title={
          <Flex center>
            <UserCircleIcon className="h-6 w-6"/>
          </Flex>
        }
        ids={[...teamMakerMemberCount]}
        idToButton={(memberCount) => memberCount}
        {...getSingleSelectOnClickProps({
          filter: input,
          setFilter: setInput,
          filterKey: 'memberCount',
          allowNull: false,
        })}
      />
      <FilterExpandedInput
        title={t('Maker.Basis')}
        ids={[...teamMakerBasis]}
        idToButton={(basis) => (
          <TeamMakerBasisOption basis={basis} isActive={basis === input.basis}/>
        )}
        className={textFilterButtonStyle}
        {...getSingleSelectOnClickProps({
          filter: input,
          setFilter: setInput,
          filterKey: 'basis',
          allowNull: false,
        })}
      />
      <PokemonPreviewLevelInput
        {...getSingleSelectOnClickProps({
          filter: input,
          setFilter: setInput,
          filterKey: 'previewLevel',
          allowNull: false,
        })}
      />
      <InputRow className="justify-end">
        <ToggleButton
          active={previewFinalEvolution}
          onClick={() => setInput((original) => ({
            ...original,
            previewFinalEvolution: !original.previewFinalEvolution,
          }))}
          className={clsx('group gap-1', textFilterButtonStyle)}
        >
          {t2('FinalEvolution')}
        </ToggleButton>
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
    </Flex>
  );
};
