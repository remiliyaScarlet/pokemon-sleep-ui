import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex';
import {PokemonIconListDuplicable} from '@/components/shared/pokemon/iconListDuplicable';
import {imageIconSizes, imageSmallIconSizes} from '@/styles/image';
import {MapCommonProps, MapInputInclusionKey, MapPageFilter} from '@/ui/map/page/type';
import {getPossibleRanks} from '@/ui/map/page/utils';
import {classNames} from '@/utils/react';


type Props = Pick<MapCommonProps, 'sleepStyles'> & {
  filter: MapPageFilter,
  isIncluded: FilterInclusionMap<MapInputInclusionKey>,
};

export const MapUnlockTable = ({sleepStyles, isIncluded, filter}: Props) => {
  const {showEmptyRank} = filter;

  const t = useTranslations('UI.Common');
  const t2 = useTranslations('Game');
  const t3 = useTranslations('UI.InPage.Map');

  let stylesAccumulated = 0;

  return (
    <table className="w-full md:w-3/4">
      <thead className="sticky top-12 z-10">
        <tr className="bg-slate-400/90 dark:bg-slate-700/90">
          <td className="p-1">{t('Rank')}</td>
          <td/>
          <td className="p-1">
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
          const matchingStyles = sleepStyles
            .filter(({pokemonId, style}) => (
              isIncluded[`${pokemonId}-${style.style}`] &&
              style.rank.title === title && style.rank.number === number
            ));

          const toHide = !showEmptyRank && !matchingStyles.length;

          stylesAccumulated += matchingStyles.length;

          return (
            <tr
              key={titleName}
              className={classNames(toHide ? 'hidden' : 'border-b border-b-gray-700 last:border-b-0')}
            >
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
                  <PokemonIconListDuplicable
                    dataWithPokemonId={matchingStyles}
                    getPokemonId={({pokemonId}) => pokemonId}
                    getInfo={({style}) => {
                      if (style.style === 'onSnorlax') {
                        return (
                          <div className="relative h-3.5 w-3.5">
                            <Image
                              src="/images/generic/flash.png" alt={style.style} fill
                              sizes={imageSmallIconSizes} className="invert-icon"
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
                {stylesAccumulated}{matchingStyles.length ? ` (+${matchingStyles.length})` : ''}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
