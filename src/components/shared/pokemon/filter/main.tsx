import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {FilterIconInput} from '@/components/input/filter/icon';
import {FilterTextInput} from '@/components/input/filter/text';
import {FilterInclusionMap, FilterWithUpdaterProps} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {PokemonFilterTitle} from '@/components/shared/pokemon/filter/title';
import {ingredientLevelToPokemonInput, PokemonInputFilter} from '@/components/shared/pokemon/filter/type';
import {getFilterIdsFromPokemon} from '@/components/shared/pokemon/filter/utils';
import {PokemonIngredientFilter} from '@/components/shared/pokemon/ingredients/filter';
import {PokemonIngredientTypeTitle} from '@/components/shared/pokemon/ingredients/typeTitle';
import {PokemonSleepType} from '@/components/shared/pokemon/sleepType/main';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty/main';
import {BerryId} from '@/types/game/berry';
import {IngredientId} from '@/types/game/ingredient';
import {PokemonInfo, PokemonSleepTypeId, PokemonSpecialtyId, PokemonTypeId} from '@/types/game/pokemon';
import {EvolutionStage} from '@/types/game/pokemon/evolution';
import {IngredientChainMap, ingredientLevels} from '@/types/game/pokemon/ingredient';
import {MainSkillId} from '@/types/game/pokemon/mainSkill';
import {KeysOfType} from '@/utils/type';


type Props<TFilter extends PokemonInputFilter> = FilterWithUpdaterProps<TFilter> & {
  pokemonList: PokemonInfo[],
  ingredientChainMap: IngredientChainMap,
  idPrefix?: string,
  className?: string,
};

export const PokemonFilter = <TFilter extends PokemonInputFilter>({
  pokemonList,
  ingredientChainMap,
  idPrefix,
  className,
  ...props
}: Props<TFilter>) => {
  const t = useTranslations('Game');

  return (
    <Flex className={clsx('gap-1', className)}>
      <FilterIconInput
        title={<PokemonFilterTitle type="pokemonType"/>}
        idToAlt={(id) => t(`PokemonType.${id}`)}
        idToImageSrc={(id) => `/images/type/${id}.png`}
        idToItemId={(id) => `${idPrefix}PokemonType${id}`}
        ids={getFilterIdsFromPokemon({
          pokemonList,
          toId: ({type}) => type,
        })}
        {...getMultiSelectOnClickProps({
          ...props,
          filterKey: 'pokemonType' as KeysOfType<TFilter, FilterInclusionMap<PokemonTypeId>>,
        })}
      />
      <FilterTextInput
        title={<PokemonFilterTitle type="specialty"/>}
        idToButton={(id, isActive) => <PokemonSpecialty specialty={id} active={isActive}/>}
        idToItemId={(id) => `${idPrefix}Specialty${id}`}
        ids={getFilterIdsFromPokemon({
          pokemonList,
          toId: ({specialty}) => specialty,
        })}
        {...getMultiSelectOnClickProps({
          ...props,
          filterKey: 'specialty' as KeysOfType<TFilter, FilterInclusionMap<PokemonSpecialtyId>>,
        })}
      />
      <FilterTextInput
        title={<PokemonFilterTitle type="sleepType"/>}
        idToButton={(id, isActive) => <PokemonSleepType sleepType={id} active={isActive}/>}
        idToItemId={(id) => `${idPrefix}SleepType${id}`}
        ids={getFilterIdsFromPokemon({
          pokemonList,
          toId: ({sleepType}) => sleepType,
        })}
        {...getMultiSelectOnClickProps({
          ...props,
          filterKey: 'sleepType' as KeysOfType<TFilter, FilterInclusionMap<PokemonSleepTypeId>>,
        })}
      />
      {ingredientLevels.map((level) => (
        <PokemonIngredientFilter
          key={level}
          title={<PokemonIngredientTypeTitle level={level} lvAsText/>}
          idPrefix={idPrefix}
          ingredientChainMap={ingredientChainMap}
          level={level}
          {...getMultiSelectOnClickProps({
            ...props,
            filterKey: ingredientLevelToPokemonInput[level] as KeysOfType<TFilter, FilterInclusionMap<IngredientId>>,
          })}
        />
      ))}
      <FilterIconInput
        title={<PokemonFilterTitle type="berry"/>}
        idToAlt={(id) => t(`Berry.${id}`)}
        idToItemId={(id) => `${idPrefix}Berry${id}`}
        idToImageSrc={(id) => `/images/berry/${id}.png`}
        ids={getFilterIdsFromPokemon({
          pokemonList,
          toId: ({berry}) => berry.id,
        })}
        {...getMultiSelectOnClickProps({
          ...props,
          filterKey: 'berry' as KeysOfType<TFilter, FilterInclusionMap<BerryId>>,
        })}
      />
      <FilterTextInput
        title={<PokemonFilterTitle type="evolutionStage"/>}
        idToButton={(id) => <div className="mx-1">{id}</div>}
        idToItemId={(id) => `${idPrefix}Evolution${id}`}
        ids={getFilterIdsFromPokemon({
          pokemonList,
          toId: ({evolution}) => evolution.stage,
        })}
        {...getMultiSelectOnClickProps({
          ...props,
          filterKey: 'evolutionStage' as KeysOfType<TFilter, FilterInclusionMap<EvolutionStage>>,
        })}
      />
      <FilterTextInput
        title={<PokemonFilterTitle type="mainSkill"/>}
        idToButton={(id) => t(`MainSkill.Name.${id}`)}
        idToItemId={(id) => `${idPrefix}MainSkill${id}`}
        ids={getFilterIdsFromPokemon({
          pokemonList,
          toId: ({skill}) => skill,
        })}
        {...getMultiSelectOnClickProps({
          ...props,
          filterKey: 'mainSkill' as KeysOfType<TFilter, FilterInclusionMap<MainSkillId>>,
        })}
      />
    </Flex>
  );
};
