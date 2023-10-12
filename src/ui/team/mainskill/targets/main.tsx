import React from 'react';

import {clsx} from 'clsx';

import {AdsUnit} from '@/components/ads/main';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {PokemonCollapsiblePicker} from '@/components/shared/pokemon/predefined/picker';
import {PokemonInfo} from '@/types/game/pokemon';
import {useSkillTriggerAnalysisTargets} from '@/ui/team/mainskill/targets/hook';
import {SkillTriggerAnalysisTarget} from '@/ui/team/mainskill/targets/target';
import {SkillTriggerAnalysisCommonProps} from '@/ui/team/mainskill/targets/type';
import {SkillTriggerAnalysisState} from '@/ui/team/mainskill/type';


type Props = SkillTriggerAnalysisCommonProps & {
  initial: SkillTriggerAnalysisState,
  selectedPokemon: PokemonInfo,
};

export const SkillTriggerAnalysisTargets = (props: Props) => {
  const {
    pokedexMap,
    ingredientChainMap,
    pokemonList,
    selectedPokemon,
  } = props;

  const {
    targetBottomRef,
    state,
    createUnit,
    updateUnit,
    deleteUnit,
    copyUnit,
  } = useSkillTriggerAnalysisTargets(props);
  const collapsiblePicker = useCollapsible();

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
      <Grid className={clsx(
        'grid-cols-1 gap-1.5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
      )}>
        {Object.entries(state.targets).map(([id, target]) => {
          const {pokemonId} = target;
          const pokemon = pokedexMap[pokemonId];

          if (!pokemon) {
            return null;
          }

          return (
            <SkillTriggerAnalysisTarget
              {...props}
              key={id}
              pokemon={pokemon}
              unit={target}
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
