import React from 'react';

import {clsx} from 'clsx';

import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {PokemonCollapsiblePicker} from '@/components/shared/pokemon/predefined/picker';
import {PokemonInfo} from '@/types/game/pokemon';
import {useSkillTriggerAnalysis} from '@/ui/team/mainskill/analysis/hook';
import {SkillTriggerAnalysisTarget} from '@/ui/team/mainskill/analysis/target';
import {SkillTriggerAnalysisCommonProps} from '@/ui/team/mainskill/analysis/type';
import {SkillTriggerComparerState} from '@/ui/team/mainskill/type';


type Props = SkillTriggerAnalysisCommonProps & {
  initial: SkillTriggerComparerState,
  selectedPokemon: PokemonInfo,
};

export const SkillTriggerAnalysis = (props: Props) => {
  const {
    pokedexMap,
    ingredientChainMap,
    pokemonList,
    selectedPokemon,
  } = props;

  const {
    analysisBottomRef,
    state,
    createUnit,
    updateUnit,
    deleteUnit,
  } = useSkillTriggerAnalysis(props);
  const collapsiblePicker = useCollapsible();

  return (
    <Flex className="gap-1.5">
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
            <AnimatedCollapseQuick key={id} show appear>
              <SkillTriggerAnalysisTarget
                {...props}
                pokemon={pokemon}
                unit={target}
                updateUnit={(update) => updateUnit(id, update)}
                deleteUnit={() => deleteUnit(id)}
              />
            </AnimatedCollapseQuick>
          );
        })}
        <div ref={analysisBottomRef}/>
      </Grid>
    </Flex>
  );
};
