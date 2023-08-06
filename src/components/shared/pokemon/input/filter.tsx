import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterIconInput} from '@/components/input/filter/icon';
import {FilterTextInput} from '@/components/input/filter/text';
import {FilterCategoryInputProps, FilterWithInclusionMap} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps, GetMultiSelectOnClickPropsOpts} from '@/components/input/filter/utils/props';
import {PokemonFilterTitle} from '@/components/shared/pokemon/input/title';
import {PokemonInputFilterIdType, PokemonInputType} from '@/components/shared/pokemon/input/type';
import {PokemonSleepType} from '@/components/shared/pokemon/sleepType';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {toUnique} from '@/utils/array';
import {isNotNullish} from '@/utils/type';


type Props<
  TDisplayType extends PokemonInputType,
  TId extends PokemonInputFilterIdType[TDisplayType],
  TFilter extends FilterWithInclusionMap<TId>,
> = GetMultiSelectOnClickPropsOpts<TFilter, TId> & Pick<FilterCategoryInputProps<TId>, 'style'> & {
  type: TDisplayType,
  pokemon: PokemonInfo[],
};

export const PokemonFilter = <
  TDisplayType extends PokemonInputType,
  TId extends PokemonInputFilterIdType[TDisplayType],
  TFilter extends FilterWithInclusionMap<TId>,
>({
  filter,
  setFilter,
  filterKey,
  type,
  pokemon,
  style,
}: Props<TDisplayType, TId, TFilter>) => {
  const t2 = useTranslations('Game');

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
        idToItemId={(id) => `PokemonType-${id}`}
        idToAlt={(id) => t2(`PokemonType.${id}`)}
        idToImageSrc={(id) => `/images/type/${id}.png`}
        ids={getIds(({type}) => type as TId)}
        {...commonProps}
      />
    );
  }

  if (type === 'specialty') {
    return (
      <FilterTextInput
        idToItemId={(id) => `Specialty-${id}`}
        idToButton={(id) => <PokemonSpecialty specialty={id}/>}
        ids={getIds(({specialty}) => specialty as TId)}
        {...commonProps}
      />
    );
  }

  if (type === 'sleepType') {
    return (
      <FilterTextInput
        idToItemId={(id) => `SleepType-${id}`}
        idToButton={(id) => <PokemonSleepType sleepType={id}/>}
        ids={getIds(({sleepType}) => sleepType as TId)}
        {...commonProps}
      />
    );
  }

  if (type === 'ingredientFixed') {
    return (
      <FilterIconInput
        idToItemId={(id) => `IngredientFixed-${id}`}
        idToAlt={(id) => t2(`Food.${id.toString()}`)}
        idToImageSrc={(id) => `/images/ingredient/${id}.png`}
        ids={getIds(({ingredients}) => ingredients.fixed as TId)}
        {...commonProps}
      />
    );
  }

  if (type === 'ingredientRandom') {
    return (
      <FilterIconInput
        idToItemId={(id) => `IngredientRandom-${id}`}
        idToAlt={(id) => t2(`Food.${id.toString()}`)}
        idToImageSrc={(id) => `/images/ingredient/${id}.png`}
        ids={getIds(({ingredients}) => ingredients.random as TId[])}
        {...commonProps}
      />
    );
  }

  if (type === 'berry') {
    return (
      <FilterIconInput
        idToItemId={(id) => `Berry-${id}`}
        idToAlt={(id) => t2(`Berry.${id.toString()}`)}
        idToImageSrc={(id) => `/images/berry/${id}.png`}
        ids={getIds(({berry}) => berry.id as TId)}
        {...commonProps}
      />
    );
  }

  if (type === 'mainSkill') {
    return (
      <FilterTextInput
        idToItemId={(id) => `MainSkill-${id}`}
        idToButton={(id) => t2(`MainSkill.Name.${id}`)}
        ids={getIds(({skill}) => skill as TId)}
        {...commonProps}
      />
    );
  }

  throw new Error(`Unhandled pokemon filter of type ${type}`);
};
