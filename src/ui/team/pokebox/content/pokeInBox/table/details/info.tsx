import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex';
import {PokeInBoxMeta} from '@/components/shared/pokebox/meta';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonSleepTypeIcon} from '@/components/shared/pokemon/sleepType/icon';
import {PokemonSpecialtyIcon} from '@/components/shared/pokemon/specialty/icon';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokeInBoxLevel} from '@/ui/team/pokebox/content/pokeInBox/common/level';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';


export const PokeInBoxTableDetails = (props: PokeInBoxTableDetailsProps) => {
  const {
    pokeInBox,
    pokemon,
    isLevelPreview,
  } = props;

  const {
    sleepType,
    specialty,
    berry,
  } = pokemon;

  return (
    <>
      <PokeInBoxLevel viewType="table" level={pokeInBox.level} isLevelPreview={isLevelPreview}/>
      <div className="w-64">
        <PokeInBoxMeta {...props}/>
      </div>
      <PokemonSleepTypeIcon sleepType={sleepType} dimension="h-4 w-4"/>
      <PokemonSpecialtyIcon specialty={specialty} dimension="h-4 w-4"/>
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
    </>
  );
};
