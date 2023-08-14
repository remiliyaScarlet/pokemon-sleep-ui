import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterIconInput} from '@/components/input/filter/icon';
import {FilterInputProps} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonMapFilter} from '@/components/shared/pokemon/input/mapFilter';
import {imageSmallIconSizes} from '@/styles/image';
import {FieldMetaMap} from '@/types/mongo/mapMeta';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {TeamAnalysisFilter} from '@/ui/team/analysis/type';
import {toUnique} from '@/utils/array';


type Props = FilterInputProps<TeamAnalysisFilter> & {
  pokemon: PokemonInfo[],
  mapMeta: FieldMetaMap,
};

export const TeamAnalysisSnorlaxFavorite = ({pokemon, mapMeta, ...props}: Props) => {
  const {setFilter} = props;

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Team');

  return (
    <Flex direction="col" className="gap-1">
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
        {...getMultiSelectOnClickProps({
          ...props,
          filterKey: 'snorlaxFavorite',
        })}
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
            snorlaxFavorite: Object.fromEntries(snorlaxFavorite.map((favorite) => [favorite, true])),
          }));
        }}
      />
    </Flex>
  );
};
