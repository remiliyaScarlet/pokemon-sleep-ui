import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {GenericBerryIcon} from '@/components/shared/icon/berry';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {AnalysisStatsContinuousUI} from '@/ui/analysis/page/result/continuous';
import {AnalysisMarkThreshold} from '@/ui/analysis/page/result/type';
import {AnalysisStatsUiProps} from '@/ui/analysis/page/stats/type';
import {sortTypeToTranslationId} from '@/ui/pokedex/index/input/const';
import {formatFloat} from '@/utils/number';


export const AnalysisStatsOfProducingRate = ({stats, pokemon}: AnalysisStatsUiProps) => {
  const {berry, ingredients} = pokemon;
  const {producingRate} = stats;

  const t = useTranslations('UI.InPage.Pokedex');
  const percentileThreshold: AnalysisMarkThreshold = {superRare: 93, rare: 85, ordinary: 10};

  const textBerryCount = t(sortTypeToTranslationId.berryCount);
  const textBerryEnergy = t(sortTypeToTranslationId.berryEnergy);
  const textIngredientCount = t(sortTypeToTranslationId.ingredientCount);
  const textIngredientEnergy = t(sortTypeToTranslationId.ingredientEnergy);
  const textTotalEnergy = t(sortTypeToTranslationId.totalEnergy);

  return (
    <>
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
      {producingRate.ingredient && ingredients.fixed &&
        <>
          <AnalysisStatsContinuousUI
            stats={producingRate.ingredient.count}
            title={
              <Flex direction="row" center className="gap-1.5">
                <PokemonIngredientIcon id={ingredients.fixed}/>
                {}
              </Flex>
            }
            threshold={percentileThreshold}
            renderData={({data}) => (
              <Flex direction="row" center className="gap-1">
                <GenericIngredientIcon alt={textIngredientCount}/>
                <div>{formatFloat(data)}</div>
              </Flex>
            )}
          >
            <div className="text-2xl">
              {formatFloat(producingRate.ingredient.count.current)}
            </div>
          </AnalysisStatsContinuousUI>
          <AnalysisStatsContinuousUI
            stats={producingRate.ingredient.energy}
            title={
              <Flex direction="row" center className="gap-1.5">
                <PokemonIngredientIcon id={ingredients.fixed}/>
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
              {formatFloat(producingRate.ingredient.energy.current)}
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
        </>}
    </>
  );
};
