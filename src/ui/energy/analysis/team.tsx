import React from 'react';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonId, PokemonInfo} from '@/types/mongo/pokemon';
import {EnergyAnalysis} from '@/ui/energy/analysis/result/main';
import {EnergyAnalysisSelectablePokemon} from '@/ui/energy/analysis/selectable';
import {EnergyAnalysisDataProps, EnergyAnalysisFilter, EnergyAnalysisTeamSetup} from '@/ui/energy/analysis/type';


type Props = EnergyAnalysisDataProps & {
  pokemon: PokemonInfo[],
  pokemonSelectableInclusionMap: FilterInclusionMap<PokemonId>,
  snorlaxFavorite: EnergyAnalysisFilter['snorlaxFavorite'],
};

export const EnergyAnalysisTeam = (props: Props) => {
  const {pokemonSelectableInclusionMap, pokemon} = props;

  const [setup, setSetup] = React.useState<EnergyAnalysisTeamSetup>({
    team: {
      A: null,
      B: null,
      C: null,
      D: null,
      E: null,
    },
    bonus: {
      overall: 0,
      ingredient: 12,
    },
  });

  return (
    <>
      <div className="h-80 overflow-y-scroll md:h-60 lg:h-40">
        <EnergyAnalysisSelectablePokemon
          setSetup={setSetup}
          isIncluded={pokemonSelectableInclusionMap}
          pokemon={pokemon}
        />
      </div>
      <HorizontalSplitter/>
      <EnergyAnalysis setup={setup} setSetup={setSetup} {...props}/>
    </>
  );
};
