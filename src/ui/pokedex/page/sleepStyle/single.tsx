import React from 'react';

import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {getToggleButtonClass} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {SnorlaxRankUI} from '@/components/shared/snorlax/rank';
import {useSleepStyleName} from '@/hooks/sleepdex/name';
import {useUpdateSleepdex} from '@/hooks/sleepdex/update';
import {SnorlaxRank} from '@/types/game/rank';
import {SleepStyleCommon} from '@/types/game/sleepStyle';
import {PokemonSleepStyleProps} from '@/ui/pokedex/page/sleepStyle/type';
import {getPokemonSleepStyleId} from '@/utils/game/pokemon';
import {isInSleepdex} from '@/utils/game/sleepdex';


type Props<TSleepStyle extends SleepStyleCommon> = PokemonSleepStyleProps & {
  sleepStyle: TSleepStyle,
  getRank?: (style: TSleepStyle) => SnorlaxRank,
};

export const PokemonSingleSleepStyle = <TSleepStyle extends SleepStyleCommon>({
  pokemon,
  pokemonBranch,
  sleepdex,
  setSleepdex,
  sleepStyle,
  getRank,
}: Props<TSleepStyle>) => {
  const {style, rewards} = sleepStyle;

  const pokemonId = pokemon.id;
  const styleId = sleepStyle.style;

  const t = useTranslations('UI.Common');
  const updateSleepdex = useUpdateSleepdex({sleepdex, setSleepdex});
  const pokemonSleepStyleId = getPokemonSleepStyleId({
    pokemonId,
    branch: pokemonBranch,
  });
  const sleepStyleName = useSleepStyleName({
    pokemonId: pokemonSleepStyleId,
    sleepStyleId: sleepStyle.style,
  });

  const className = clsx(
    'z-10 h-8 w-8 rounded-lg p-1.5',
    getToggleButtonClass(isInSleepdex({sleepdex, pokemonId, styleId}) ?? false),
  );

  return (
    <Flex key={style} center className="gap-1.5 p-2.5" noFullWidth>
      <button className={className} onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        updateSleepdex({pokemonId, styleId});
      }}>
        <BookmarkIcon/>
      </button>
      <div className="text-sm">
        {sleepStyleName}
      </div>
      {getRank && <SnorlaxRankUI rank={getRank(sleepStyle)}/>}
      <Flex direction="row" center>
        <div>
          <GenericIconLarger src="/images/generic/gift.png" alt={t('Rewards')}/>
        </div>
        <div>
          <table className="border-separate border-spacing-0.5">
            <tbody>
              <tr>
                <td><GenericIconLarger src="/images/generic/research.png" alt={t('Exp')} noInvert/></td>
                <td>{rewards.exp}</td>
              </tr>
              <tr>
                <td><GenericIconLarger src="/images/generic/shard.png" alt={t('DreamShards')} noInvert/></td>
                <td>{rewards.shards}</td>
              </tr>
              <tr>
                <td><GenericIconLarger src="/images/generic/candy.png" alt={t('Candy')} noInvert/></td>
                <td>{rewards.candy}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Flex>
    </Flex>
  );
};
