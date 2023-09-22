import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {GenericIcon} from '@/components/shared/icon/main';
import {PokemonExpCalculatorTableRow} from '@/ui/xp/results/row';
import {PokemonExpCalculatorDataProps, PokemonExpCalculatorInput} from '@/ui/xp/type';


type Props = PokemonExpCalculatorDataProps & {
  input: PokemonExpCalculatorInput,
  maxLevel: number,
};

export const PokemonExpCalculatorTable = (props: Props) => {
  const {
    xpMultiplier,
    input,
    maxLevel,
  } = props;
  const {currentLv, pokemon} = input;

  const t = useTranslations('UI.InPage.PokemonExp');

  const dimension = 'h-8 w-8';
  const multiplier = pokemon ? (xpMultiplier[pokemon]?.multiplier ?? 1) : 1;

  return (
    <Flex direction="col" className="info-section">
      <table className="-m-1 border-separate border-spacing-0.5 text-center">
        <thead>
          <tr>
            <td>
              <Flex direction="row" center>
                <GenericIcon alt="Lv." src="/images/generic/lv.png" dimension={dimension}/>
              </Flex>
            </td>
            <td>
              <Flex direction="row" center>
                <GenericIcon alt="EXP" src="/images/generic/exp.png" dimension={dimension}/>
              </Flex>
            </td>
            <td>
              <Flex direction="row" center>
                <GenericIcon alt={t('NormalCandy')} src="/images/generic/candy_white.png" dimension={dimension}/>
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
          </tr>
        </thead>
        <tbody>
          {[...new Array(maxLevel - currentLv).keys()]
            .map((lv) => lv + currentLv + 1)
            .map((lv) => (
              <PokemonExpCalculatorTableRow
                key={lv}
                {...props}
                input={input}
                targetLv={lv}
                multiplier={multiplier}
              />
            ))}
        </tbody>
      </table>
    </Flex>
  );
};
