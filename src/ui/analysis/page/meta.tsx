import React from 'react';

import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonNameBig} from '@/components/shared/pokemon/name/big';
import {AnalysisPageCommonProps} from '@/ui/analysis/page/type';


type Props = AnalysisPageCommonProps;

export const AnalysisMeta = ({pokemon}: Props) => {
  return (
    <Flex direction="col" center className="info-section">
      <PokemonNameBig pokemon={pokemon}/>
      <div className="relative h-60 w-60">
        <PokemonImage pokemon={pokemon} image="portrait" isShiny={false}/>
        <Link
          href={`/pokedex/${pokemon.id}`}
          className="button-clickable absolute bottom-0 right-0 h-7 w-7 rounded-full"
        >
          <InformationCircleIcon/>
        </Link>
      </div>
    </Flex>
  );
};
