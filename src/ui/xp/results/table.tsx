import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {LevelIcon} from '@/components/shared/icon/lv';
import {defaultExpType} from '@/const/game/xp';
import {PokemonExpCalculatorTableRow} from '@/ui/xp/results/row';
import {getLevelUpRequirementsAccumulated, getLevelUpRequirementsOfEachLevel} from '@/ui/xp/results/utils';
import {PokemonExpCalculatorDataProps, PokemonExpCalculatorInput} from '@/ui/xp/type';
import {getNatureMultiplier} from '@/utils/game/nature';


type Props = PokemonExpCalculatorDataProps & {
  input: PokemonExpCalculatorInput,
  maxLevel: number,
};

export const PokemonExpCalculatorTable = ({
  pokedexMap,
  xpValueData,
  xpShardConsumption,
  input,
}: Props) => {
  const {pokemon, nature} = input;

  const t = useTranslations('UI.InPage.PokemonExp');
  const t2 = useTranslations('UI.Common');

  const dimension = 'h-8 w-8';

  const expType = (pokemon ? pokedexMap[pokemon]?.expType : defaultExpType) ?? defaultExpType;
  const levelUpRequirements = getLevelUpRequirementsOfEachLevel({
    ...input,
    xpData: xpValueData[expType]?.data ?? [],
    xpShardConsumption,
    multiplier: getNatureMultiplier({id: nature, effect: 'exp'}),
  });

  return (
    <Flex className="info-section overflow-x-auto">
      <table className="-m-1 border-separate border-spacing-0.5 text-center">
        <thead>
          <tr>
            <td>
              <Flex direction="row" center>
                <LevelIcon dimension={dimension}/>
              </Flex>
            </td>
            <td>
              <Flex direction="row" center>
                <GenericIcon alt="EXP" src="/images/generic/exp.png" dimension={dimension}/>
              </Flex>
            </td>
            <td>
              <Flex direction="row" center>
                <GenericIcon alt={t('NormalCandy')} src="/images/generic/candyWhite.png" dimension={dimension}/>
              </Flex>
            </td>
            <td>
              <Flex direction="row" center>
                <GenericIcon alt={t('HandyCandy')} src="/images/generic/candy.png" dimension={dimension} noInvert/>
                <div>S</div>
              </Flex>
            </td>
            <td>
              <Flex direction="row" center>
                <GenericIcon alt={t('HandyCandy')} src="/images/generic/candy.png" dimension={dimension} noInvert/>
                <div>M</div>
              </Flex>
            </td>
            <td>
              <Flex direction="row" center>
                <GenericIcon alt={t('HandyCandy')} src="/images/generic/candy.png" dimension={dimension} noInvert/>
                <div>L</div>
              </Flex>
            </td>
            <td>
              <Flex direction="row" center>
                <GenericIcon alt={t2('DreamShards')} src="/images/generic/shardWhite.png" dimension={dimension}/>
              </Flex>
            </td>
            <td>
              <Flex direction="row" center>
                <GenericIcon alt={t2('DreamShards')} src="/images/generic/shardWhite.png" dimension={dimension}/>
                <span>/</span>
                <GenericIcon alt="EXP" src="/images/generic/exp.png" dimension={dimension}/>
              </Flex>
            </td>
          </tr>
        </thead>
        <tbody>
          {getLevelUpRequirementsAccumulated(levelUpRequirements).map((data) => (
            <PokemonExpCalculatorTableRow
              key={data.lv}
              input={input}
              data={data}
            />
          ))}
        </tbody>
      </table>
    </Flex>
  );
};
