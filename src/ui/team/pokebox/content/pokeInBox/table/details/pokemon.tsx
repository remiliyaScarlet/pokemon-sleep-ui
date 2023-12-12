import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientRate} from '@/components/shared/pokemon/production/params/ingredient';
import {PokemonMainSkillTriggerRate} from '@/components/shared/pokemon/production/params/skillRate';
import {PokemonSleepTypeIcon} from '@/components/shared/pokemon/sleepType/icon';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';
import {getPokemonProducingParams} from '@/utils/game/producing/params';


export const PokeInBoxTablePokemon = (props: PokeInBoxTableDetailsProps) => {
  const {
    pokemon,
    pokemonProducingParamsMap,
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
      <PokemonSleepTypeIcon sleepType={sleepType} dimension="h-4 w-4" className="invert-hoverable-dark"/>
      <Flex
        direction="row" center noFullWidth
        className={clsx('items-center gap-1 p-1', specialty === specialtyIdMap.berry && 'info-highlight')}
      >
        <PokemonBerryIcon id={berry.id}/>
      </Flex>
      <Flex noFullWidth center className="w-36 text-sm">
        <PokemonIngredientRate params={producingParams} dimension="h-5 w-5"/>
      </Flex>
      <Flex noFullWidth center className="w-36 text-sm">
        <PokemonMainSkillTriggerRate params={producingParams} dimension="h-5 w-5"/>
      </Flex>
    </>
  );
};
