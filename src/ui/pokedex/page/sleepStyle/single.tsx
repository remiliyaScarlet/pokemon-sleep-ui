import React from 'react';

import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {getToggleButtonClass} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {SnorlaxRankUI} from '@/components/shared/snorlax/rank';
import {useUpdateSleepdex} from '@/hooks/sleepdex/update';
import {SleepStyle} from '@/types/game/sleepStyle';
import {PokemonSleepStyleProps} from '@/ui/pokedex/page/sleepStyle/type';
import {isInSleepdex} from '@/utils/game/sleepdex';


type Props = PokemonSleepStyleProps & {
  sleepStyle: SleepStyle,
};

export const PokemonSingleSleepStyle = ({pokemon, sleepStyle, sleepdex, setSleepdex}: Props) => {
  const {rank, style, rewards} = sleepStyle;

  const updateSleepdex = useUpdateSleepdex({sleepdex, setSleepdex});

  const t = useTranslations('UI.Common');
  const t2 = useTranslations(`Game.SleepFace.${pokemon.id}`);
  const t3 = useTranslations('Game.SleepFace.onSnorlax');

  const pokemonId = pokemon.id;
  const styleId = sleepStyle.style;

  const className = clsx(
    'z-10 h-8 w-8 rounded-lg p-1.5',
    getToggleButtonClass(isInSleepdex({sleepdex, pokemonId, styleId}) ?? false),
  );

  return (
    <Flex key={style} direction="col" center className="gap-1.5 p-2.5" noFullWidth>
      <button className={className} onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        updateSleepdex({pokemonId, styleId});
      }}>
        <BookmarkIcon/>
      </button>
      <div className="text-sm">
        {style === 'onSnorlax' ? t3('Default') : t2(style.toString())}
      </div>
      <SnorlaxRankUI rank={rank}/>
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
