import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterIconInput} from '@/components/input/filter/icon';
import {FilterTextInput} from '@/components/input/filter/text';
import {FilterCategoryInputProps, FilterWithInclusionMap} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps, GetMultiSelectOnClickPropsOpts} from '@/components/input/filter/utils/props';
import {PokemonFilterTitle} from '@/components/shared/pokemon/input/title';
import {PokemonInputFilterIdType, PokemonInputType} from '@/components/shared/pokemon/input/type';
import {PokemonSleepType} from '@/components/shared/pokemon/sleepType/main';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty/main';
import {PokemonInfo} from '@/types/game/pokemon';
import {toUnique} from '@/utils/array';
import {isNotNullish} from '@/utils/type';


type Props<
  TDisplayType extends PokemonInputType,
  TId extends PokemonInputFilterIdType[TDisplayType],
  TFilter extends FilterWithInclusionMap<TId>,
> = GetMultiSelectOnClickPropsOpts<TFilter, TId> & Pick<FilterCategoryInputProps<TId>, 'style'> & {
  type: TDisplayType,
  pokemon: PokemonInfo[],
  idPrefix?: string,
};

export const PokemonFilter = <
  TDisplayType extends PokemonInputType,
  TId extends PokemonInputFilterIdType[TDisplayType],
  TFilter extends FilterWithInclusionMap<TId>,
>({
  filter,
  setFilter,
  filterKey,
  style,
  type,
  pokemon,
  idPrefix,
}: Props<TDisplayType, TId, TFilter>) => {
  const t = useTranslations('Game');

  const commonProps: Pick<FilterCategoryInputProps<TId>, 'style' | 'isActive' | 'onClick' | 'title'> = {
    style,
    title: <PokemonFilterTitle type={type}/>,
    ...getMultiSelectOnClickProps({
      filter,
      setFilter,
      filterKey,
    }),
  };

  const getIds = (toId: (single: PokemonInfo) => TId | TId[] | undefined) => {
    return toUnique(pokemon.flatMap(toId))
      .filter(isNotNullish)
      .sort((a, b) => a - b);
  };

  if (type === 'pokemonType') {
    return (
      <FilterIconInput
        idToItemId={(id) => `${idPrefix}PokemonType-${id}`}
        idToAlt={(id) => t(`PokemonType.${id}`)}
        idToImageSrc={(id) => `/images/type/${id}.png`}
        ids={getIds(({type}) => type as TId)}
        {...commonProps}
      />
    );
  }

  if (type === 'specialty') {
    return (
      <FilterTextInput
        idToItemId={(id) => `${idPrefix}Specialty-${id}`}
        idToButton={(id, isActive) => <PokemonSpecialty specialty={id} active={isActive}/>}
        ids={getIds(({specialty}) => specialty as TId)}
        {...commonProps}
      />
    );
  }

  if (type === 'sleepType') {
    return (
      <FilterTextInput
        idToItemId={(id) => `${idPrefix}SleepType-${id}`}
        idToButton={(id, isActive) => <PokemonSleepType sleepType={id} active={isActive}/>}
        ids={getIds(({sleepType}) => sleepType as TId)}
        {...commonProps}
      />
    );
  }

  if (type === 'ingredientFixed') {
    return (
      <FilterIconInput
        idToItemId={(id) => `${idPrefix}IngredientFixed-${id}`}
        idToAlt={(id) => t(`Food.${id.toString()}`)}
        idToImageSrc={(id) => `/images/ingredient/${id}.png`}
        ids={getIds(({ingredients}) => ingredients.fixed as TId)}
        {...commonProps}
      />
    );
  }

  if (type === 'ingredientRandom') {
    return (
      <FilterIconInput
        idToItemId={(id) => `${idPrefix}IngredientRandom-${id}`}
        idToAlt={(id) => t(`Food.${id.toString()}`)}
        idToImageSrc={(id) => `/images/ingredient/${id}.png`}
        ids={getIds(({ingredients}) => ingredients.random as TId[])}
        {...commonProps}
      />
    );
  }

  if (type === 'berry') {
    return (
      <FilterIconInput
        idToItemId={(id) => `${idPrefix}Berry-${id}`}
        idToAlt={(id) => t(`Berry.${id.toString()}`)}
        idToImageSrc={(id) => `/images/berry/${id}.png`}
        ids={getIds(({berry}) => berry.id as TId)}
        {...commonProps}
      />
    );
  }

  if (type === 'evolutionStage') {
    return (
      <FilterTextInput
        idToItemId={(id) => `${idPrefix}EvolutionStage-${id}`}
        idToButton={(id) => <div className="mx-1">{id}</div>}
        ids={getIds(({evolution}) => evolution.stage as TId)}
        {...commonProps}
      />
    );
  }

  if (type === 'mainSkill') {
    return (
      <FilterTextInput
        idToItemId={(id) => `${idPrefix}MainSkill-${id}`}
        idToButton={(id) => t(`MainSkill.Name.${id}`)}
        ids={getIds(({skill}) => skill as TId)}
        {...commonProps}
      />
    );
  }

  throw new Error(`Unhandled pokemon filter of type ${type satisfies never}`);
};
