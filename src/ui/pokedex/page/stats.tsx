import React from 'react';

import {useTranslations} from 'next-intl';

import {PokemonDataIcon} from '@/ui/pokedex/page/dataIcon';
import {PokemonProps} from '@/ui/pokedex/page/type';


export const PokemonStats = ({pokemon}: PokemonProps) => {
  const t = useTranslations('UI.InPage.Pokedex');
  const t2 = useTranslations('UI.Common');
  const {stats} = pokemon;

  return (
    <table className="border-separate border-spacing-1">
      <tbody>
        <tr>
          <td>
            <PokemonDataIcon src="/images/generic/friendship.png" alt={t('Stats.Friendship')}/>
          </td>
          <td>
            {stats.friendshipPoints}
          </td>
        </tr>
        <tr>
          <td>
            <PokemonDataIcon src="/images/generic/clock.png" alt={t('Stats.Frequency')} invert/>
          </td>
          <td>
            {stats.frequency}
          </td>
        </tr>
        <tr>
          <td>
            <PokemonDataIcon src="/images/generic/bag.png" alt={t('Stats.MaxCarry')} invert/>
          </td>
          <td>
            {stats.maxCarry}
          </td>
        </tr>
        <tr>
          <td>
            <PokemonDataIcon src="/images/generic/pokemonbox.png" alt={t('Stats.Recruit')} invert/>
          </td>
          <td>
            <table className="mx-4 border-separate border-spacing-0.5">
              <tbody>
                <tr>
                  <td>
                    <PokemonDataIcon src="/images/generic/research.png" alt={t2('Exp')}/>
                  </td>
                  <td>
                    {stats.recruit.exp}
                  </td>
                </tr>
                <tr>
                  <td>
                    <PokemonDataIcon src="/images/generic/shard.png" alt={t2('DreamShards')}/>
                  </td>
                  <td>
                    {stats.recruit.shards}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
