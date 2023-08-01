import React from 'react';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonId, PokemonInfo} from '@/types/mongo/pokemon';
import {EnergyAnalysisAnalysis} from '@/ui/energy/analysis/result/main';
import {EnergyAnalysisSelectablePokemon} from '@/ui/energy/analysis/selectable';
import {EnergyAnalysisDataProps, EnergyAnalysisFilter, EnergyAnalysisTeamSelection} from '@/ui/energy/analysis/type';


type Props = EnergyAnalysisDataProps & {
  pokemon: PokemonInfo[],
  pokemonSelectableInclusionMap: FilterInclusionMap<PokemonId>,
  snorlaxFavorite: EnergyAnalysisFilter['snorlaxFavorite'],
};

export const EnergyAnalysisTeam = (props: Props) => {
  const {pokemonSelectableInclusionMap, pokemon} = props;

  const [team, setTeam] = React.useState<EnergyAnalysisTeamSelection>({
    A: null,
    B: null,
    C: null,
    D: null,
    E: null,
  });

  return (
    <>
      <div className="h-80 overflow-y-scroll md:h-60 lg:h-40">
        <EnergyAnalysisSelectablePokemon
          setTeam={setTeam}
          isIncluded={pokemonSelectableInclusionMap}
          pokemon={pokemon}
        />
      </div>
      <HorizontalSplitter/>
      <EnergyAnalysisAnalysis team={team} setTeam={setTeam} {...props}/>
    </>
  );
};
