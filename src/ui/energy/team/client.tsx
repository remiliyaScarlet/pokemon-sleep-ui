'use client';
import React from 'react';

import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {EnergyTeamAnalysis} from '@/ui/energy/team/analysis/main';
import {useEnergyTeamPokemonFilter} from '@/ui/energy/team/hook';
import {EnergyTeamInput} from '@/ui/energy/team/input/main';
import {EnergyTeamSelectablePokemon} from '@/ui/energy/team/selectable';
import {EnergyTeamProps, EnergyTeamInputProps} from '@/ui/energy/team/type';
import {isNotNullish} from '@/utils/type';


export const EnergyTeamClient = (props: EnergyTeamProps) => {
  const {pokedex} = props;
  const pokemon = Object.values(pokedex).filter(isNotNullish);
  const {filter, setFilter, isIncluded} = useEnergyTeamPokemonFilter({data: pokemon});

  const inputProps: EnergyTeamInputProps = {
    filter,
    setFilter,
    pokemon,
  };

  return (
    <>
      <EnergyTeamInput {...inputProps}/>
      <div className="h-80 overflow-y-scroll md:h-60 lg:h-40">
        <EnergyTeamSelectablePokemon isIncluded={isIncluded} {...inputProps}/>
      </div>
      <HorizontalSplitter/>
      <EnergyTeamAnalysis filter={filter} setFilter={setFilter} {...props}/>
    </>
  );
};
