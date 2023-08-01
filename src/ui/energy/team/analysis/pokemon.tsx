'use client';
import React from 'react';

import Image from 'next/image';

import {Flex} from '@/components/layout/flex';
import {imageGallerySizes} from '@/styles/image';
import {EnergyTeamAnalysisPokemonFull} from '@/ui/energy/team/analysis/pokemonFull';
import {teamSlotStyle} from '@/ui/energy/team/analysis/style';
import {EnergyAnalysisPokemonProps} from '@/ui/energy/team/analysis/type';


type Props = EnergyAnalysisPokemonProps;

export const EnergyAnalysisPokemon = (props: Props) => {
  const {slot} = props;

  if (!slot) {
    return (
      <Flex direction="row" center className={teamSlotStyle}>
        <div className="relative h-12 w-12">
          <Image src="/images/generic/pokeball_unavailable.png" alt="N/A" fill sizes={imageGallerySizes}/>
        </div>
      </Flex>
    );
  }

  return <EnergyTeamAnalysisPokemonFull {...props}/>;
};
