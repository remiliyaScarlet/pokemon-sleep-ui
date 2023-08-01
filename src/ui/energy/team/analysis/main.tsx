import React from 'react';

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon';
import Link from 'next-intl/link';

import {FilterInputProps} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex';
import {useProductionStats} from '@/ui/energy/team/analysis/hook';
import {EnergyAnalysisPokemon} from '@/ui/energy/team/analysis/pokemon';
import {EnergyTotalProductionRate} from '@/ui/energy/team/analysis/total';
import {EnergyTeamProps, EnergyTeamFilter, energyTeamSlotNames} from '@/ui/energy/team/type';
import {classNames} from '@/utils/react';


type Props = FilterInputProps<EnergyTeamFilter> & EnergyTeamProps;

export const EnergyTeamAnalysis = (props: Props) => {
  const {filter, setFilter, pokedex} = props;
  const {team} = filter;

  const productionStats = useProductionStats(props);

  return (
    <Flex direction="row" center wrap className="gap-1.5">
      {energyTeamSlotNames.map((slotName) => {
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
              <EnergyAnalysisPokemon
                key={slotName} slot={null} pokemon={undefined} productionStats={null} slotName={slotName} {...props}
              />}
          </Flex>
        );
      })}
      <EnergyTotalProductionRate stats={productionStats.total}/>
    </Flex>
  );
};
