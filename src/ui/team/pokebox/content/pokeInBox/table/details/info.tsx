import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {PokeInBoxMeta} from '@/components/shared/pokebox/meta';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonIngredientRate} from '@/components/shared/pokemon/production/params/ingredient';
import {PokemonSleepTypeIcon} from '@/components/shared/pokemon/sleepType/icon';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokeInBoxLevel} from '@/ui/team/pokebox/content/pokeInBox/common/level';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';
import {getPokemonProducingParams} from '@/utils/game/producing/pokemon';


export const PokeInBoxTableDetails = (props: PokeInBoxTableDetailsProps) => {
  const {
    pokeInBox,
    pokemon,
    pokemonProducingParamsMap,
    isLevelPreview,
  } = props;

  const {
    id,
    sleepType,
    specialty,
    berry,
  } = pokemon;

  const producingParams = getPokemonProducingParams({
    pokemonId: id,
    pokemonProducingParamsMap,
  });

  return (
    <>
      <PokeInBoxLevel viewType="table" level={pokeInBox.level} isLevelPreview={isLevelPreview}/>
      <div className="w-60">
        <PokeInBoxMeta {...props}/>
      </div>
      <PokemonSleepTypeIcon sleepType={sleepType} dimension="h-4 w-4" className="invert-hoverable-dark"/>
      <Flex
        direction="row" center noFullWidth
        className={clsx('items-center gap-1 px-1.5', specialty === specialtyIdMap.berry && 'info-highlight')}
      >
        <PokemonBerryIcon id={berry.id}/>
        <div>{berry.quantity}</div>
      </Flex>
      <div className={clsx(
        'rounded-lg px-2',
        specialty === specialtyIdMap.ingredient && 'info-highlight',
      )}>
        <PokemonIngredientIcons
          ingredients={[Object.values(pokeInBox.ingredients).map((ingredient) => ingredient)]}
        />
      </div>
      <Flex noFullWidth center className="w-40">
        <PokemonIngredientRate params={producingParams}/>
      </Flex>
    </>
  );
};
