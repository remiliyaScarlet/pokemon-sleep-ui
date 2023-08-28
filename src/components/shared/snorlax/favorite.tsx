import React from 'react';

import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import {useTranslations} from 'next-intl';

import {FilterIconInput} from '@/components/input/filter/icon';
import {FilterInputProps, FilterWithInclusionMap} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonMapFilter} from '@/components/shared/pokemon/input/mapFilter';
import {imageSmallIconSizes} from '@/styles/image';
import {BerryId} from '@/types/game/berry';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokemonInfo} from '@/types/game/pokemon';
import {FilterWithSnorlaxFavorite, SnorlaxFavorite} from '@/types/game/snorlax';
import {toUnique} from '@/utils/array';
import {KeysOfType} from '@/utils/type';


type Props<TFilter extends FilterWithSnorlaxFavorite> = FilterInputProps<TFilter> & {
  filterKey: KeysOfType<TFilter, SnorlaxFavorite>,
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
        idPrefix="SnorlaxFav-"
        title={
          <Flex direction="row" center className="gap-0.5">
            <div className="relative h-7 w-7">
              <NextImage
                src="/images/generic/snorlax.png" alt={t2('SnorlaxFavorite')} sizes={imageSmallIconSizes}
              />
            </div>
            <div className="h-6 w-6">
              <PlusCircleIcon/>
            </div>
            <div className="relative h-7 w-7">
              <NextImage
                src="/images/generic/map.png" alt={t2('Map')} sizes={imageSmallIconSizes}
                className="invert-on-light"
              />
            </div>
          </Flex>
        }
        mapIds={Object.keys(mapMeta).map(Number)}
        isActive={() => false}
        onClick={(mapId) => setFilter((original) => ({
          ...original,
          [filterKey]: Object.fromEntries(mapMeta[mapId]?.berry?.map((favorite) => [favorite, true]) ?? []),
        }))}
      />
    </>
  );
};
