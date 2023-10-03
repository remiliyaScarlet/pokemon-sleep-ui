import React from 'react';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex/common';
import {SleepdexMap} from '@/types/game/sleepdex';
import {MapCommonProps, MapInputInclusionKey, MapPageFilter} from '@/ui/map/page/type';
import {MapUnlockTableRow} from '@/ui/map/page/unlockTable/row';
import {MapUnlockAccumulator} from '@/ui/map/page/unlockTable/type';
import {getUpdatedAccumulator} from '@/ui/map/page/unlockTable/utils';
import {getPossibleRanks} from '@/ui/map/page/utils';
import {isSameRank} from '@/utils/game/snorlax';


type Props = Pick<
  MapCommonProps,
  'mapId' | 'pokedexMap' | 'sleepStyles' | 'snorlaxRank' | 'snorlaxReward' | 'isLoggedIn'
> & {
  filter: MapPageFilter,
  isIncluded: FilterInclusionMap<MapInputInclusionKey>,
  sleepdex: SleepdexMap,
  setSleepdex: React.Dispatch<React.SetStateAction<SleepdexMap>>,
};

export const MapUnlockTable = (props: Props) => {
  const {
    pokedexMap,
    sleepStyles,
    snorlaxRank,
    filter,
    isIncluded,
    sleepdex,
  } = props;
  const {showEmptyRank} = filter;

  let accumulator: MapUnlockAccumulator = {
    unlocked: {},
    unlockable: {},
    energy: {
      previous: null,
      current: null,
    },
  };

  return (
    <Flex>
      {getPossibleRanks().map((rank) => {
        const matchingStyles = sleepStyles
          .filter(({pokemonId, style}) => (
            isIncluded[`${pokemonId}-${style.style}`] &&
            isSameRank(style.rank, rank)
          ));

        const toHide = !showEmptyRank && !matchingStyles.length;
        const key = `${rank.title}-${rank.number}`;

        // Update accumulator outside once to update energy
        // https://github.com/RaenonX-PokemonSleep/pokemon-sleep-ui/issues/258
        accumulator = getUpdatedAccumulator({
          original: accumulator,
          current: {
            rank,
            value: snorlaxRank.data.find((data) => isSameRank(data.rank, rank))?.energy ?? null,
          },
        });

        for (const data of matchingStyles) {
          const {pokemonId} = data;
          const pokemon = pokedexMap[pokemonId];

          if (!pokemon) {
            continue;
          }

          const {sleepType} = pokemon;

          accumulator = getUpdatedAccumulator({
            original: accumulator,
            sleepType,
            current: {
              rank,
              value: snorlaxRank.data.find((data) => isSameRank(data.rank, rank))?.energy ?? null,
            },
            inSleepdexOpts: {
              pokemonId: data.pokemonId,
              styleId: data.style.style,
              sleepdex,
            },
          });
        }

        // Have to be after `getUpdatedAccumulator()` or the accumulation will be wrong
        if (toHide) {
          return <React.Fragment key={key}/>;
        }

        return (
          <MapUnlockTableRow
            key={key}
            rank={rank}
            matchingStyles={matchingStyles}
            accumulator={accumulator}
            {...props}
          />
        );
      })}
    </Flex>
  );
};
