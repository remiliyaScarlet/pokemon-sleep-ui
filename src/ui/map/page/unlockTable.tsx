import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {ColoredEnergyIcon} from '@/components/shared/pokemon/energy/colored';
import {PokemonIconList} from '@/components/shared/pokemon/icon/list';
import {SnorlaxRankUI} from '@/components/shared/snorlax/rank';
import {imageIconSizes, imageSmallIconSizes} from '@/styles/image';
import {MapCommonProps, MapInputInclusionKey, MapPageFilter} from '@/ui/map/page/type';
import {getPossibleRanks} from '@/ui/map/page/utils';
import {isSameRank} from '@/utils/game/snorlax';
import {formatInt} from '@/utils/number';
import {classNames} from '@/utils/react';


type Props = Pick<MapCommonProps, 'sleepStyles' | 'snorlaxRank' | 'snorlaxReward'> & {
  filter: MapPageFilter,
  isIncluded: FilterInclusionMap<MapInputInclusionKey>,
};

export const MapUnlockTable = ({sleepStyles, snorlaxRank, snorlaxReward, filter, isIncluded}: Props) => {
  const {showEmptyRank} = filter;

  const t = useTranslations('UI.Common');
  const t2 = useTranslations('UI.InPage.Map');

  let stylesAccumulated = 0;

  return (
    <table className="table-unlock">
      <thead>
        <tr>
          <td className="p-1">{t('Rank')}</td>
          <td/>
          <td className="p-1">
            <Flex direction="row" center className="gap-1">
              <div className="relative h-6 w-6">
                <NextImage
                  src="/images/generic/pokeball.png" alt={t2('Pokemon')}
                  sizes={imageIconSizes} className="invert-on-light"
                />
              </div>
              <div>/</div>
              <div className="relative h-6 w-6">
                <NextImage
                  src="/images/generic/gift.png" alt={t('DreamShards')}
                  sizes={imageSmallIconSizes} className="invert-on-light"
                />
              </div>
            </Flex>
          </td>
        </tr>
      </thead>
      <tbody>
        {getPossibleRanks().map((rank) => {
          const matchingStyles = sleepStyles
            .filter(({pokemonId, style}) => (
              isIncluded[`${pokemonId}-${style.style}`] &&
              isSameRank(style.rank, rank)
            ));

          const toHide = !showEmptyRank && !matchingStyles.length;

          stylesAccumulated += matchingStyles.length;

          return (
            <tr
              key={`${rank.title}-${rank.number}`}
              className={classNames(toHide ? 'hidden' : 'border-b border-b-gray-700 last:border-b-0')}
            >
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
                    dataWithPokemonId={matchingStyles}
                    getPokemonId={({pokemonId}) => pokemonId}
                    getInfo={({style}) => {
                      if (style.style === 'onSnorlax') {
                        return (
                          <div className="relative h-3.5 w-3.5">
                            <NextImage
                              src="/images/generic/flash.png" alt={style.style}
                              sizes={imageSmallIconSizes} className="invert-on-light"
                            />
                          </div>
                        );
                      }

                      return `#${style.style}`;
                    }}
                    getReactKey={({pokemonId, style}) => `${pokemonId}-${style.style}`}
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
        })}
      </tbody>
    </table>
  );
};
