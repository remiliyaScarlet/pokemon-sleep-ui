import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex';
import {PokeInBoxMeta} from '@/components/shared/pokebox/meta';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonIngredientRate} from '@/components/shared/pokemon/production/ingredientRate';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokeInBoxLevel} from '@/ui/team/pokebox/content/pokeInBox/common/level';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';


export const PokeInBoxTableDetails = (props: PokeInBoxTableDetailsProps) => {
  const {
    pokeInBox,
    pokemon,
    pokemonProducingParamsMap,
    isLevelPreview,
  } = props;

  const {
    id,
    specialty,
    berry,
  } = pokemon;

  const producingParams = pokemonProducingParamsMap[id];

  return (
    <>
      <PokeInBoxLevel viewType="table" level={pokeInBox.level} isLevelPreview={isLevelPreview}/>
      <div className="w-72">
        <PokeInBoxMeta {...props}/>
      </div>
      <Flex
        direction="row" center noFullWidth
        className={clsx('items-center gap-1 px-1', specialty === specialtyIdMap.berry && 'bg-blink')}
      >
        <PokemonBerryIcon id={berry.id}/>
        <div>{berry.quantity}</div>
      </Flex>
      <div className={clsx(
        'rounded-lg px-2',
        specialty === specialtyIdMap.ingredient ? 'bg-blink' : 'border border-slate-500/50',
      )}>
        <PokemonIngredientIcons
          ingredients={[Object.values(pokeInBox.ingredients).map((ingredient) => ingredient)]}
        />
      </div>
      {
        producingParams &&
        <div className="w-40">
          <PokemonIngredientRate split={producingParams.ingredientSplit}/>
        </div>
      }
    </>
  );
};
