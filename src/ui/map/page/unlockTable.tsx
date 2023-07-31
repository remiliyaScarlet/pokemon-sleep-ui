import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex';
import {PokemonIconList} from '@/components/shared/pokemon/iconList';
import {imageIconSizes, imageSmallIconSizes} from '@/styles/image';
import {PokemonId} from '@/types/mongo/pokemon';
import {MapCommonProps} from '@/ui/map/page/type';
import {getPossibleRanks} from '@/ui/map/page/utils';


type Props = Pick<MapCommonProps, 'sleepStyles'> & {
  isIncluded: FilterInclusionMap<PokemonId>,
  showEmptyRank: boolean,
};

export const MapUnlockTable = ({sleepStyles, isIncluded, showEmptyRank}: Props) => {
  const t = useTranslations('UI.Common');
  const t2 = useTranslations('Game');
  const t3 = useTranslations('UI.InPage.Map');

  let pokemonCountAccumulated = 0;
  const counter: {[id in PokemonId]?: number} = {};

  return (
    <table className="w-full md:w-3/4">
      <thead className="sticky top-12 z-10">
        <tr className="bg-slate-400/90 dark:bg-slate-700/90">
          <td>{t('Rank')}</td>
          <td/>
          <td>
            <Flex direction="row" center>
              <div className="relative h-6 w-6">
                <Image
                  src="/images/generic/pokeball.png" alt={t3('Pokemon')} fill sizes={imageIconSizes}
                  className="invert-icon"
                />
              </div>
            </Flex>
          </td>
        </tr>
      </thead>
      <tbody>
        {getPossibleRanks().map(({title, number}) => {
          const titleName = `${t2(`RankTitle.${title}`)} ${number}`;
          const pokemonIds = sleepStyles
            .filter(({pokemonId}) => isIncluded[pokemonId])
            .filter(({styles}) => styles.some(({rank}) => rank.title === title && rank.number === number))
            .map(({pokemonId}) => pokemonId);

          if (!showEmptyRank && !pokemonIds.length) {
            return <React.Fragment key={titleName}/>;
          }

          pokemonCountAccumulated += pokemonIds.length;

          return (
            <tr key={titleName} className="border-b border-b-gray-700 last:border-b-0">
              <td>
                <Flex direction="row" center className="gap-1">
                  <div className="relative h-6 w-6">
                    <Image src={`/images/rank/${title}.png`} alt={titleName} fill sizes={imageSmallIconSizes}/>
                  </div>
                  <div className="whitespace-nowrap">
                    {titleName}
                  </div>
                </Flex>
              </td>
              <td>
                <Flex direction="col" center>
                  <PokemonIconList
                    pokemonIds={pokemonIds}
                    getInfo={(id) => {
                      const count = (counter[id] ?? 0) + 1;

                      counter[id] = count;

                      return `#${count}`;
                    }}
                  />
                </Flex>
              </td>
              <td className="whitespace-nowrap">
                {pokemonCountAccumulated}{pokemonIds.length ? ` (+${pokemonIds.length})` : ''}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
