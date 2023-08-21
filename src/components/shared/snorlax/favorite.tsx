import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterIconInput} from '@/components/input/filter/icon';
import {FilterInclusionMap, FilterInputProps, FilterWithInclusionMap} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonMapFilter} from '@/components/shared/pokemon/input/mapFilter';
import {imageSmallIconSizes} from '@/styles/image';
import {BerryId} from '@/types/mongo/berry';
import {FieldMetaMap} from '@/types/mongo/mapMeta';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {toUnique} from '@/utils/array';
import {KeysOfType} from '@/utils/type';


type Props<TFilter extends FilterWithInclusionMap<BerryId>> = FilterInputProps<TFilter> & {
  filterKey: KeysOfType<TFilter, FilterInclusionMap<BerryId>>
  pokemon: PokemonInfo[],
  mapMeta: FieldMetaMap,
};

export const SnorlaxFavoriteInput = <
  TFilter extends FilterWithInclusionMap<BerryId>,
>({pokemon, mapMeta, ...props}: Props<TFilter>) => {
  const {setFilter, filterKey} = props;

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.Common');

  return (
    <>
      <FilterIconInput
        title={
          <Flex direction="row" center>
            <div className="relative h-7 w-7">
              <NextImage
                src="/images/generic/snorlax.png" alt={t2('SnorlaxFavorite')} sizes={imageSmallIconSizes}
              />
            </div>
          </Flex>
        }
        idToItemId={(id) => `Snorlax-${id}`}
        idToAlt={(id) => t(`Berry.${id.toString()}`)}
        idToImageSrc={(id) => `/images/berry/${id}.png`}
        ids={toUnique(pokemon.map(({berry}) => berry.id)).sort((a, b) => a - b)}
        {...getMultiSelectOnClickProps(props)}
      />
      <PokemonMapFilter
        mapIds={Object.keys(mapMeta).map(Number)}
        isActive={() => false}
        isHidden={(id) => !mapMeta[id]?.berry?.length}
        onClick={(mapId) => {
          const snorlaxFavorite = mapMeta[mapId]?.berry;
          if (!snorlaxFavorite) {
            return;
          }

          setFilter((original) => ({
            ...original,
            [filterKey]: Object.fromEntries(snorlaxFavorite.map((favorite) => [favorite, true])),
          }));
        }}
      />
    </>
  );
};
