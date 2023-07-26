import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PokemonDataIcon} from '@/ui/pokedex/page/dataIcon';
import {sectionStyle} from '@/ui/pokedex/page/styles';
import {PokemonProps} from '@/ui/pokedex/page/type';


export const PokemonSleepStyles = ({pokemon, sleepStyles}: PokemonProps) => {
  const t = useTranslations('Game.Field');
  const t2 = useTranslations('Game.RankTitle');
  const t3 = useTranslations(`Game.SleepFace.${pokemon.id}`);
  const t4 = useTranslations('Game.SleepFace.onSnorlax');
  const t5 = useTranslations('UI.InPage.Pokedex.Info');
  const t6 = useTranslations('UI.Common');

  return (
    <Flex direction="col" center className={sectionStyle}>
      {sleepStyles.map(({mapId, styles}) => {
        const mapName = t(mapId.toString());

        return (
          <Flex key={mapId} direction="col" className="p-1.5">
            {/* <div className="relative h-full w-full">*/}
            {/*  <Image*/}
            {/*    src={`/images/field/${mapId}.png`} alt={mapName}*/}
            {/*    fill className="rounded-xl opacity-50 dark:opacity-25"*/}
            {/*  />*/}
            {/* </div>*/}
            <Flex direction="row" center className="p-1.5">
              <div>
                <div className="relative h-9 w-9">
                  <Image src="/images/generic/map_pin.png" alt={t5('Map')} fill sizes="7vw"/>
                </div>
              </div>
              <div className="text-lg">
                {mapName}
              </div>
            </Flex>
            <Flex direction="row" center wrap className="gap-1">
              {styles.map(({rank, style, rewards}) => {
                const rankTitle = t2(rank.title.toString());

                return (
                  <Flex key={style} direction="col" center className="gap-1 p-2.5" noFullWidth>
                    <div className="text-slate-500">
                      {style === 'onSnorlax' ? t4('Default') : t3(style.toString())}
                    </div>
                    <Flex direction="row" center className="gap-1">
                      <div className="relative h-5 w-5">
                        <Image src={`/images/rank/${rank.title}.png`} alt={t6('Rank')} fill sizes="5vw"/>
                      </div>
                      <div>{rankTitle}</div>
                      <div>{rank.number}</div>
                    </Flex>
                    <Flex direction="row" center>
                      <div>
                        <PokemonDataIcon src="/images/generic/gift.png" alt={t6('Rewards')} invert/>
                      </div>
                      <div>
                        <table className="border-separate border-spacing-0.5">
                          <tbody>
                            <tr>
                              <td><PokemonDataIcon src="/images/generic/research.png" alt={t6('Exp')}/></td>
                              <td>{rewards.exp}</td>
                            </tr>
                            <tr>
                              <td><PokemonDataIcon src="/images/generic/shard.png" alt={t6('DreamShards')}/></td>
                              <td>{rewards.shards}</td>
                            </tr>
                            <tr>
                              <td><PokemonDataIcon src="/images/generic/candy.png" alt={t6('Candy')}/></td>
                              <td>{rewards.candy}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};
