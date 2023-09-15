import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonIconList} from '@/components/shared/pokemon/icon/list';
import {SnorlaxRankUI} from '@/components/shared/snorlax/rank';
import {useUpdateSleepdex} from '@/hooks/sleepdex/update';
import {imageSmallIconSizes} from '@/styles/image';
import {MapTableInfoIcon} from '@/ui/map/page/unlockTable/infoIcon';
import {MapUnlockTableRowProps} from '@/ui/map/page/unlockTable/type';
import {toSum} from '@/utils/array';
import {toSleepdexStyleId} from '@/utils/game/sleepdex';
import {isSameRank} from '@/utils/game/snorlax';
import {formatInt} from '@/utils/number';
import {isNotNullish} from '@/utils/type';


export const MapUnlockTableDataRow = ({
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

  const updateSleepdex = useUpdateSleepdex({sleepdex, setSleepdex});

  const t = useTranslations('UI.Common');
  const t2 = useTranslations('UI.InPage.Map');

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
            onClickOverride={
              markingSleepdex ?
                ({pokemonId, style}) => updateSleepdex({pokemonId, styleId: style.style}) :
                undefined
            }
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
