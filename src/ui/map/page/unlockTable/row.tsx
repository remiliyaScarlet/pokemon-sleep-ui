import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonIconList} from '@/components/shared/pokemon/icon/list';
import {SnorlaxRankUI} from '@/components/shared/snorlax/rank';
import {useUserDataActor} from '@/hooks/userData/actor';
import {imageSmallIconSizes} from '@/styles/image';
import {SnorlaxRank} from '@/types/game/rank';
import {SleepdexData, SleepdexMarkedByMap} from '@/types/game/sleepdex';
import {SleepStyleDataFlattened} from '@/types/game/sleepStyle';
import {MapCommonProps, MapPageFilter} from '@/ui/map/page/type';
import {MapTableInfoIcon} from '@/ui/map/page/unlockTable/infoIcon';
import {toSleepdexByMapId} from '@/utils/game/sleepdex';
import {isSameRank} from '@/utils/game/snorlax';
import {formatInt} from '@/utils/number';


type Props = Pick<MapCommonProps, 'mapId' | 'pokedexMap' | 'snorlaxRank' | 'snorlaxReward'> & {
  filter: MapPageFilter,
  rank: SnorlaxRank,
  matchingStyles: SleepStyleDataFlattened[],
  stylesAccumulated: number,
  sleepdex: SleepdexMarkedByMap,
  setSleepdex: React.Dispatch<React.SetStateAction<SleepdexMarkedByMap>>,
};

export const MapUnlockTableRow = ({
  mapId,
  pokedexMap,
  snorlaxReward,
  snorlaxRank,
  filter,
  rank,
  matchingStyles,
  stylesAccumulated,
  sleepdex,
  setSleepdex,
}: Props) => {
  const {displayType, markingSleepdex} = filter;

  const {act} = useUserDataActor({statusToast: true});

  const t = useTranslations('UI.Common');
  const t2 = useTranslations('UI.InPage.Map');

  const onChangeSleepdexMark = ({pokemonId, style}: SleepStyleDataFlattened) => {
    if (!act) {
      return;
    }

    const styleId = style.style;

    const sleepdexId = toSleepdexByMapId({pokemonId, styleId});
    const inSleepdex = sleepdex[sleepdexId];
    const sleepdexData: SleepdexData = {pokemonId, mapId, styleId};

    act({
      action: 'upload',
      options: {
        type: inSleepdex ? 'sleepdex.unmark' : 'sleepdex.mark',
        data: sleepdexData,
      },
    });
    setSleepdex((original) => {
      if (!inSleepdex) {
        return {...original, [sleepdexId]: sleepdexData};
      }

      const updated = {...original};
      delete updated[sleepdexId];

      return updated;
    });
  };

  return (
    <tr className="border-b border-b-gray-700 last:border-b-0">
      <td>
        <Flex direction="col" center className="gap-1">
          <SnorlaxRankUI rank={rank} hideTextBelowMd/>
          <Flex direction="row" center className="gap-1">
            <ColoredEnergyIcon alt={t2('Energy')}/>
            <div>
              {formatInt(snorlaxRank.data.find((data) => isSameRank(data.rank, rank))?.energy)}
            </div>
          </Flex>
        </Flex>
      </td>
      <td>
        <Flex direction="col" center>
          <PokemonIconList
            dataWithPokemon={matchingStyles}
            getPokemon={({pokemonId}) => pokedexMap[pokemonId]}
            getPokemonId={({pokemonId}) => pokemonId}
            getInfo={(data) => (
              <MapTableInfoIcon data={data} pokedex={pokedexMap} displayType={displayType}/>
            )}
            getClassName={({pokemonId, style}) => clsx(
              'm-0.5',
              sleepdex[toSleepdexByMapId({pokemonId, styleId: style.style})] &&
              'bg-gradient-to-br from-transparent to-slate-500/80',
            )}
            getReactKey={({pokemonId, style}) => `${pokemonId}-${style.style}`}
            onClickOverride={markingSleepdex ? onChangeSleepdexMark : undefined}
          />
        </Flex>
      </td>
      <td className="whitespace-nowrap">
        <Flex direction="col" center className="gap-1">
          <div>
            {stylesAccumulated}{matchingStyles.length ? ` (+${matchingStyles.length})` : ''}
          </div>
          <Flex direction="row" center>
            <div className="relative h-6 w-6">
              <NextImage src="/images/generic/shard.png" alt={t('DreamShards')} sizes={imageSmallIconSizes}/>
            </div>
            <div>
              {formatInt(snorlaxReward.find((reward) => isSameRank(reward.rank, rank))?.shard)}
            </div>
          </Flex>
        </Flex>
      </td>
    </tr>
  );
};
