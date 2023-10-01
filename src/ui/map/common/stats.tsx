import React from 'react';

import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon';
import QuestionMarkCircleIcon from '@heroicons/react/24/solid/QuestionMarkCircleIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {imageIconSizes, imageSmallIconSizes} from '@/styles/image';
import {MapMeta} from '@/types/game/mapMeta';
import {SleepStyleDataFlattened} from '@/types/game/sleepStyle';
import {MapSleepdexUnlockCount} from '@/ui/map/common/sleepdexUnlock';
import {MapIndexSleepdexCompletionOfMap} from '@/ui/map/common/type';
import {toUnique} from '@/utils/array';


type Props = {
  sleepStyles: SleepStyleDataFlattened[] | undefined,
  sleepdexCompletionOfMap: MapIndexSleepdexCompletionOfMap | undefined,
  meta: MapMeta | null | undefined,
  isLoggedIn: boolean,
};

export const MapStats = ({sleepStyles, sleepdexCompletionOfMap, meta, isLoggedIn}: Props) => {
  const t = useTranslations('UI.InPage.Map');
  const t2 = useTranslations('UI.Common');

  const sleepStyleCount = sleepStyles?.length ?? 0;
  const pokemonCount = toUnique(sleepStyles?.map(({pokemonId}) => pokemonId) ?? []).length;

  return (
    <Flex direction="col" className="gap-1.5">
      <Flex direction="row" center className="gap-4 text-lg">
        <Flex direction="row" center noFullWidth className="gap-1.5">
          <div className="relative h-6 w-6">
            <NextImage
              src="/images/generic/sleep.png" alt={t('SleepStyle')}
              sizes={imageIconSizes} className="invert-hoverable"
            />
          </div>
          <div>
            {sleepStyleCount}
          </div>
        </Flex>
        <Flex direction="row" center noFullWidth className="gap-1.5">
          <GenericPokeballIcon dimension="h-6 w-6" alt={t('Pokemon')}/>
          <div>
            {pokemonCount}
          </div>
        </Flex>
        {
          isLoggedIn && sleepdexCompletionOfMap &&
          <Flex direction="row" center noFullWidth className="gap-1.5">
            <div className="h-6 w-6">
              <BookmarkIcon/>
            </div>
            <div>
              <MapSleepdexUnlockCount sleepdexCompletionOfMap={sleepdexCompletionOfMap}/>
            </div>
          </Flex>
        }
      </Flex>
      <Flex direction="row" center className="gap-5">
        <div className="relative h-10 w-10">
          <NextImage
            src="/images/generic/snorlax.png" alt={t2('SnorlaxFavorite')} sizes={imageSmallIconSizes}
          />
        </div>
        <Flex direction="row" center noFullWidth className="gap-1">
          {meta?.berry ?
            meta?.berry.map((berry) => <PokemonBerryIcon key={berry} dimension="h-8 w-8" id={berry}/>) :
            <div className="relative h-8 w-8">
              <QuestionMarkCircleIcon/>
            </div>
          }
        </Flex>
      </Flex>
    </Flex>
  );
};
