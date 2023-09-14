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
import {SleepdexData} from '@/types/game/sleepdex';
import {SleepStyleDataFlattened} from '@/types/game/sleepStyle';
import {MapTableInfoIcon} from '@/ui/map/page/unlockTable/infoIcon';
import {MapUnlockTableRowProps} from '@/ui/map/page/unlockTable/type';
import {isInSleepdex} from '@/ui/map/page/unlockTable/utils';
import {toSum} from '@/utils/array';
import {toSleepdexStyleId} from '@/utils/game/sleepdex';
import {isSameRank} from '@/utils/game/snorlax';
import {formatInt} from '@/utils/number';
import {isNotNullish} from '@/utils/type';


export const MapUnlockTableDataRow = ({
  mapId,
  pokedexMap,
  snorlaxReward,
  filter,
  rank,
  matchingStyles,
  accumulator,
  sleepdex,
  setSleepdex,
}: MapUnlockTableRowProps) => {
  const {displayType, markingSleepdex} = filter;
  const {energy} = accumulator;

  const {act} = useUserDataActor({statusToast: true});

  const t = useTranslations('UI.Common');
  const t2 = useTranslations('UI.InPage.Map');

  const onChangeSleepdexMark = (data: SleepStyleDataFlattened) => {
    if (!act) {
      return;
    }

    const {pokemonId, style} = data;
    const styleId = style.style;

    const sleepdexId = toSleepdexStyleId({pokemonId, styleId});
    const inSleepdex = isInSleepdex({data, sleepdex});
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
    <tr>
      <td>
        <Flex direction="col" center className="gap-1 p-1">
          <SnorlaxRankUI rank={rank} hideTextBelowMd/>
          <Flex direction="col" center className="gap-0.5 md:flex-row">
            <Flex direction="row" center noFullWidth className="gap-1">
              <ColoredEnergyIcon alt={t2('Energy')}/>
              <div>
                {formatInt(energy.current?.value)}
              </div>
            </Flex>
            {
              !!energy.current?.value && !!energy.previous?.value &&
              <div className="text-slate-500">
                (+{(energy.current.value / energy.previous.value * 100 - 100).toFixed(2)}%)
              </div>
            }
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
              sleepdex[toSleepdexStyleId({pokemonId, styleId: style.style})] &&
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
            {toSum(Object.values(accumulator.unlockable).filter(isNotNullish))}
            {matchingStyles.length ? ` (+${matchingStyles.length})` : ''}
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
