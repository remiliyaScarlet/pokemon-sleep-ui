import React from 'react';

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageGallerySizes} from '@/styles/image';
import {useProductionStats} from '@/ui/energy/analysis/result/hook';
import {EnergyAnalysisPokemon} from '@/ui/energy/analysis/result/pokemon';
import {EnergyTotalProductionRate} from '@/ui/energy/analysis/result/total';
import {
  EnergyAnalysisDataProps,
  EnergyAnalysisFilter,
  energyAnalysisSlotName,
  EnergyAnalysisTeamSetup,
} from '@/ui/energy/analysis/type';
import {classNames} from '@/utils/react';


type Props = EnergyAnalysisDataProps & {
  setup: EnergyAnalysisTeamSetup,
  setSetup: React.Dispatch<React.SetStateAction<EnergyAnalysisTeamSetup>>,
  snorlaxFavorite: EnergyAnalysisFilter['snorlaxFavorite'],
};

export const EnergyAnalysis = (props: Props) => {
  const {
    setup,
    setSetup,
    pokedex,
    berryMap,
    snorlaxRankData,
  } = props;

  const productionStats = useProductionStats(props);

  return (
    <Flex direction="row" center wrap className="gap-1.5">
      {energyAnalysisSlotName.map((slotName) => {
        const slot = setup.team[slotName];
        const pokemon = slot ? pokedex[slot.pokemonId] : undefined;
        const stats = productionStats.bySlot[slotName];

        const isAvailable = slot && pokemon && stats;

        return (
          <Flex key={slotName} direction="col" center className={classNames(
            'relative button-bg h-96 rounded-lg p-3 gap-1.5',
            'width-with-gap-sm width-with-gap-2-items md:width-with-gap-3-items lg:width-with-gap-5-items',
          )}>
            <button
              className="button-clickable disabled:button-disabled absolute right-1 top-1 h-5 w-5 rounded-full"
              disabled={!slot}
              onClick={() => setSetup((original) => ({
                ...original,
                team: {
                  ...original.team,
                  [slotName]: null,
                },
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
                key={slotName} slot={slot} productionStats={stats} slotName={slotName}
                setLevel={(newLevel: number) => setSetup((original) => ({
                  ...original,
                  team: {
                    ...original.team,
                    [slotName]: {
                      ...original.team[slotName],
                      level: newLevel,
                    },
                  },
                }))}
                pokemon={pokemon} berryMap={berryMap}
              /> :
              <div className="relative h-12 w-12">
                <NextImage src="/images/generic/pokeball_unavailable.png" alt="N/A" sizes={imageGallerySizes}/>
              </div>}
          </Flex>
        );
      })}
      <EnergyTotalProductionRate
        bonus={setup.bonus}
        setBonus={(bonus) => setSetup((original) => ({
          ...original,
          bonus,
        }))}
        stats={productionStats}
        snorlaxRankData={snorlaxRankData}
      />
    </Flex>
  );
};
