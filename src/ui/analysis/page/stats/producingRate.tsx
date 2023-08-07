import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {ColoredEnergyIcon} from '@/components/shared/pokemon/energy/colored';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {imageSmallIconSizes} from '@/styles/image';
import {AnalysisStatsContinuousUI} from '@/ui/analysis/page/result/continuous';
import {AnalysisMarkThreshold} from '@/ui/analysis/page/result/type';
import {AnalysisStatsUiProps} from '@/ui/analysis/page/stats/type';
import {sortTypeToTranslationId} from '@/ui/pokedex/index/input/const';
import {formatFloat, formatInt} from '@/utils/number';


export const AnalysisStatsOfProducingRate = ({stats, pokemon}: AnalysisStatsUiProps) => {
  const {berry, ingredients} = pokemon;

  const t = useTranslations('UI.InPage.Pokedex');
  const percentileThreshold: AnalysisMarkThreshold = {superRare: 93, rare: 85, ordinary: 10};

  return (
    <>
      <AnalysisStatsContinuousUI
        stats={stats.producingRate.berry.count}
        title={t(sortTypeToTranslationId['berryCount'])}
        threshold={percentileThreshold}
        renderData={({data}) => (
          <Flex direction="row" center className="gap-1">
            <div className="relative h-5 w-5">
              <NextImage
                src="/images/generic/berry.png" alt={t('Info.Berry')}
                sizes={imageSmallIconSizes} className="invert-on-light"
              />
            </div>
            <div>{formatInt(data)}</div>
          </Flex>
        )}
      >
        <PokemonBerryIcon dimension="h-12 w-12" id={berry.id}/>
      </AnalysisStatsContinuousUI>
      <AnalysisStatsContinuousUI
        stats={stats.producingRate.berry.energy}
        title={t(sortTypeToTranslationId['berryEnergy'])}
        threshold={percentileThreshold}
        renderData={({data}) => (
          <Flex direction="row" center className="gap-1 text-sm">
            <ColoredEnergyIcon dimension="h-4 w-4" alt={t('Stats.Energy.Name')}/>
            <div>{formatFloat(data)}</div>
          </Flex>
        )}
      >
        <Flex direction="row" center>
          <PokemonBerryIcon dimension="h-12 w-12" id={berry.id}/>
          <ColoredEnergyIcon dimension="h-10 w-10" alt={t('Stats.Energy.Name')}/>
        </Flex>
      </AnalysisStatsContinuousUI>
      {stats.producingRate.ingredient && ingredients.fixed &&
        <>
          <AnalysisStatsContinuousUI
            stats={stats.producingRate.ingredient.count}
            title={t(sortTypeToTranslationId['ingredientCount'])}
            threshold={percentileThreshold}
            renderData={({data}) => (
              <Flex direction="row" center className="gap-1">
                <div className="relative h-5 w-5">
                  <NextImage
                    src="/images/generic/ingredient.png" alt={t('Info.Ingredient')}
                    sizes={imageSmallIconSizes} className="invert-on-light"
                  />
                </div>
                <div>{formatInt(data)}</div>
              </Flex>
            )}
          >
            <PokemonIngredientIcon dimension="h-12 w-12" id={ingredients.fixed}/>
          </AnalysisStatsContinuousUI>
          <AnalysisStatsContinuousUI
            stats={stats.producingRate.ingredient.energy}
            title={t(sortTypeToTranslationId['ingredientEnergy'])}
            threshold={percentileThreshold}
            renderData={({data}) => (
              <Flex direction="row" center className="gap-1 text-sm">
                <ColoredEnergyIcon alt={t('Stats.Energy.Name')}/>
                <div>{formatFloat(data)}</div>
              </Flex>
            )}
          >
            <Flex direction="row" center>
              <PokemonIngredientIcon dimension="h-12 w-12" id={ingredients.fixed}/>
              <ColoredEnergyIcon dimension="h-10 w-10" alt={t('Stats.Energy.Name')}/>
            </Flex>
          </AnalysisStatsContinuousUI>
        </>}
    </>
  );
};
