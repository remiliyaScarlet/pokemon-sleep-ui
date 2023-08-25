import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {GenericBerryIcon} from '@/components/shared/icon/berry';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {sortTypeToI18nId} from '@/components/shared/pokemon/sorter/const';
import {AnalysisStatsContinuousUI} from '@/ui/analysis/page/result/continuous';
import {AnalysisMarkThreshold} from '@/ui/analysis/page/result/type';
import {AnalysisStatsLayout} from '@/ui/analysis/page/stats/layout';
import {AnalysisStatsUiProps} from '@/ui/analysis/page/stats/type';
import {formatFloat} from '@/utils/number';


export const AnalysisStatsOfProducingRate = ({stats, pokemon}: AnalysisStatsUiProps) => {
  const {berry} = pokemon;
  const {producingRate} = stats;

  const t = useTranslations('UI.InPage.Pokedex');
  const percentileThreshold: AnalysisMarkThreshold = {superRare: 93, rare: 85, ordinary: 10};

  const textBerryCount = t(sortTypeToI18nId.berryCount);
  const textBerryEnergy = t(sortTypeToI18nId.berryEnergy);
  const textIngredientCount = t(sortTypeToI18nId.ingredientCount);
  const textIngredientEnergy = t(sortTypeToI18nId.ingredientEnergy);
  const textTotalEnergy = t(sortTypeToI18nId.totalEnergy);

  return (
    <AnalysisStatsLayout>
      <AnalysisStatsContinuousUI
        stats={producingRate.berry.count}
        title={
          <Flex direction="row" center className="gap-1.5">
            <PokemonBerryIcon dimension="h-6 w-6" id={berry.id}/>
            <div>{textBerryCount}</div>
          </Flex>
        }
        threshold={percentileThreshold}
        renderData={({data}) => (
          <Flex direction="row" center className="gap-1">
            <GenericBerryIcon alt={textBerryCount}/>
            <div>{formatFloat(data)}</div>
          </Flex>
        )}
      >
        <div className="text-2xl">
          {formatFloat(producingRate.berry.count.current)}
        </div>
      </AnalysisStatsContinuousUI>
      <AnalysisStatsContinuousUI
        stats={producingRate.berry.energy}
        title={
          <Flex direction="row" center className="gap-1.5">
            <PokemonBerryIcon dimension="h-6 w-6" id={berry.id}/>
            <ColoredEnergyIcon alt={textBerryEnergy}/>
            <div>{textBerryEnergy}</div>
          </Flex>
        }
        threshold={percentileThreshold}
        renderData={({data}) => (
          <Flex direction="row" center className="gap-1 text-sm">
            <ColoredEnergyIcon dimension="h-4 w-4" alt={textBerryEnergy}/>
            <div>{formatFloat(data)}</div>
          </Flex>
        )}
      >
        <div className="text-2xl">
          {formatFloat(producingRate.berry.energy.current)}
        </div>
      </AnalysisStatsContinuousUI>
      {producingRate.ingredient.individual.map((rate) => (
        <React.Fragment key={rate.itemId}>
          <AnalysisStatsContinuousUI
            stats={rate.count}
            linkedIconKey={({data, pokemonId}) => (
              `${pokemonId}-${data.productions.map(({id, qty}) => `${id}x${qty}`).join('-')}`
            )}
            title={
              <Flex direction="row" center className="gap-1.5">
                <PokemonIngredientIcon dimension="h-6 w-6" id={rate.itemId}/>
                <div>{textIngredientCount}</div>
              </Flex>
            }
            threshold={percentileThreshold}
            renderData={({data}) => (
              <Flex direction="col" center>
                <PokemonIngredientIcons ingredients={[data.productions]}/>
                <Flex direction="row" center className="gap-1">
                  <GenericIngredientIcon alt={textIngredientCount}/>
                  <div>{formatFloat(data.value)}</div>
                </Flex>
              </Flex>
            )}
          >
            <div className="text-2xl">
              {formatFloat(rate.count.current)}
            </div>
          </AnalysisStatsContinuousUI>
          <AnalysisStatsContinuousUI
            stats={rate.energy}
            linkedIconKey={({data, pokemonId}) => (
              `${pokemonId}-${data.productions.map(({id, qty}) => `${id}x${qty}`).join('-')}`
            )}
            title={
              <Flex direction="row" center className="gap-1.5">
                <PokemonIngredientIcon dimension="h-6 w-6" id={rate.itemId}/>
                <ColoredEnergyIcon alt={textIngredientEnergy}/>
                {textIngredientEnergy}
              </Flex>
            }
            threshold={percentileThreshold}
            renderData={({data}) => (
              <Flex direction="col" center>
                <PokemonIngredientIcons ingredients={[data.productions]}/>
                <Flex direction="row" center className="gap-1 text-sm">
                  <ColoredEnergyIcon alt={textIngredientEnergy}/>
                  <div>{formatFloat(data.value)}</div>
                </Flex>
              </Flex>
            )}
          >
            <div className="text-2xl">
              {formatFloat(rate.energy.current)}
            </div>
          </AnalysisStatsContinuousUI>
        </React.Fragment>))}
      <AnalysisStatsContinuousUI
        stats={producingRate.ingredient.overall}
        title={
          <Flex direction="row" center className="gap-1.5">
            <ColoredEnergyIcon alt={textIngredientEnergy}/>
            {textIngredientEnergy}
          </Flex>
        }
        threshold={percentileThreshold}
        renderData={({data}) => (
          <Flex direction="row" center className="gap-1 text-sm">
            <ColoredEnergyIcon alt={textIngredientEnergy}/>
            <div>{formatFloat(data)}</div>
          </Flex>
        )}
      >
        <div className="text-2xl">
          {formatFloat(producingRate.ingredient.overall.current)}
        </div>
      </AnalysisStatsContinuousUI>
      <AnalysisStatsContinuousUI
        stats={producingRate.total}
        title={
          <Flex direction="row" center className="gap-1.5">
            <ColoredEnergyIcon alt={textTotalEnergy}/>
            {textTotalEnergy}
          </Flex>
        }
        threshold={percentileThreshold}
        renderData={({data}) => (
          <Flex direction="row" center className="gap-1 text-sm">
            <ColoredEnergyIcon alt={textTotalEnergy}/>
            <div>{formatFloat(data)}</div>
          </Flex>
        )}
      >
        <div className="text-2xl">
          {formatFloat(producingRate.total.current)}
        </div>
      </AnalysisStatsContinuousUI>
    </AnalysisStatsLayout>
  );
};
