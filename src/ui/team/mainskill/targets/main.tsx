import React from 'react';

import Bars3BottomLeftIcon from '@heroicons/react/24/solid/Bars3BottomLeftIcon';
import {clsx} from 'clsx';

import {AdsUnit} from '@/components/ads/main';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {PokemonCollapsiblePicker} from '@/components/shared/pokemon/predefined/picker';
import {PokemonInfo} from '@/types/game/pokemon';
import {UseSkillTriggerAnalysisTargetStateReturn} from '@/ui/team/mainskill/state/type';
import {useSkillTriggerAnalysisCalculated} from '@/ui/team/mainskill/targets/calc';
import {SkillTriggerAnalysisTarget} from '@/ui/team/mainskill/targets/target';
import {SkillTriggerAnalysisCommonProps} from '@/ui/team/mainskill/targets/type';


type Props = SkillTriggerAnalysisCommonProps & {
  selectedPokemon: PokemonInfo,
  stateControl: UseSkillTriggerAnalysisTargetStateReturn,
};

export const SkillTriggerAnalysisTargets = (props: Props) => {
  const {
    pokedexMap,
    ingredientChainMap,
    pokemonList,
    selectedPokemon,
    stateControl,
  } = props;

  const {
    targetBottomRef,
    state,
    createUnit,
    updateUnit,
    deleteUnit,
    copyUnit,
  } = stateControl;

  const collapsiblePicker = useCollapsible();

  const {units, sort} = useSkillTriggerAnalysisCalculated({
    ...props,
    state,
  });

  return (
    <Flex className="gap-1.5">
      <AdsUnit/>
      <PokemonCollapsiblePicker
        pokemonList={pokemonList}
        collapsibleState={collapsiblePicker}
        isIncluded={Object.fromEntries(pokemonList.map(({id, skill}) => [
          id, selectedPokemon.skill === skill,
        ]))}
        onPokemonPicked={(pokemon) => {
          const chain = ingredientChainMap[pokemon.ingredientChain];

          if (!chain) {
            return;
          }

          createUnit({pokemon, chain});
        }}
        classNameForHeight="h-80 md:h-60 lg:h-40"
      />
      <Flex className="items-end">
        <button onClick={sort} disabled={!units.length} className={clsx(
          'enabled:button-clickable-bg disabled:button-disabled h-9 w-9 p-1',
        )}>
          <Bars3BottomLeftIcon/>
        </button>
      </Flex>
      <Grid className={clsx(
        'grid-cols-1 gap-1.5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
      )}>
        {units.map((unit) => {
          const {id, pokemonId} = unit;
          const pokemon = pokedexMap[pokemonId];

          if (!pokemon) {
            return null;
          }

          return (
            <SkillTriggerAnalysisTarget
              {...props}
              key={id}
              pokemon={pokemon}
              unit={unit}
              updateUnit={(update) => updateUnit(id, update)}
              deleteUnit={() => deleteUnit(id)}
              copyUnit={() => copyUnit(id)}
            />
          );
        })}
        <div ref={targetBottomRef}/>
      </Grid>
    </Flex>
  );
};
