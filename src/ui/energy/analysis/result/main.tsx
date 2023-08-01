import React from 'react';

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon';
import Image from 'next/image';
import Link from 'next-intl/link';

import {FilterInputProps} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex';
import {imageGallerySizes} from '@/styles/image';
import {useProductionStats} from '@/ui/energy/analysis/result/hook';
import {EnergyAnalysisPokemon} from '@/ui/energy/analysis/result/pokemon';
import {teamSlotStyle} from '@/ui/energy/analysis/result/style';
import {EnergyTotalProductionRate} from '@/ui/energy/analysis/result/total';
import {EnergyAnalysisProps, EnergyAnalysisFilter, energyAnalysisSlotNames} from '@/ui/energy/analysis/type';
import {classNames} from '@/utils/react';


type Props = FilterInputProps<EnergyAnalysisFilter> & EnergyAnalysisProps;

export const EnergyAnalysisAnalysis = (props: Props) => {
  const {filter, setFilter, pokedex} = props;
  const {team} = filter;

  const productionStats = useProductionStats(props);

  return (
    <Flex direction="row" center wrap className="gap-1.5">
      {energyAnalysisSlotNames.map((slotName) => {
        const slot = team[slotName];
        const pokemon = slot ? pokedex[slot.pokemonId] : undefined;
        const stats = productionStats.bySlot[slotName];

        const isAvailable = slot && pokemon && stats;

        return (
          <Flex key={slotName} direction="col" className={classNames(
            'relative',
            'width-with-gap-sm width-with-gap-2-items md:width-with-gap-3-items lg:width-with-gap-5-items',
          )}>
            <button
              className="button-clickable disabled:button-disabled absolute right-1 top-1 h-5 w-5 rounded-full"
              disabled={!slot}
              onClick={() => setFilter((original) => ({
                ...original,
                team: {...original.team, [slotName]: null},
              }))}
            >
              <XMarkIcon/>
            </button>
            {isAvailable &&
              <Link
                href={`/pokedex/${pokemon?.id}`}
                className="button-clickable absolute left-1 top-1 h-5 w-5 rounded-full"
              >
                <InformationCircleIcon/>
              </Link>}
            {isAvailable ?
              <EnergyAnalysisPokemon
                key={slotName} slot={slot} pokemon={pokemon} productionStats={stats} slotName={slotName} {...props}
              /> :
              <Flex direction="row" center className={teamSlotStyle}>
                <div className="relative h-12 w-12">
                  <Image src="/images/generic/pokeball_unavailable.png" alt="N/A" fill sizes={imageGallerySizes}/>
                </div>
              </Flex>}
          </Flex>
        );
      })}
      <EnergyTotalProductionRate stats={productionStats.total}/>
    </Flex>
  );
};
