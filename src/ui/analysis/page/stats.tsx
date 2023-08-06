import React from 'react';

import {useTranslations} from 'next-intl';

import {LoadingIcon} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {ColoredEnergyIcon} from '@/components/shared/pokemon/energy/colored';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {PokemonFilterTitle} from '@/components/shared/pokemon/input/title';
import {PokemonSleepType} from '@/components/shared/pokemon/sleepType';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty';
import {imageIconSizes} from '@/styles/image';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {AnalysisStats} from '@/ui/analysis/page/calc/type';
import {AnalysisStatsContinuousUI} from '@/ui/analysis/page/result/continuous';
import {AnalysisStatsGroupedUI} from '@/ui/analysis/page/result/group';
import {AnalysisMarkThreshold} from '@/ui/analysis/page/result/type';
import {sortTypeToTranslationId} from '@/ui/pokedex/index/input/const';


type Props = {
  pokemon: PokemonInfo,
  stats: AnalysisStats | null,
  loading: boolean,
};

export const AnalysisStatsUI = ({pokemon, stats, loading}: Props) => {
  const {
    type,
    specialty,
    sleepType,
    ingredients,
    berry,
    skill,
  } = pokemon;

  const t = useTranslations('UI.InPage.Pokedex');
  const t2 = useTranslations('Game');

  if (!stats) {
    return (
      <Flex direction="col" center className="py-5">
        <LoadingIcon/>
      </Flex>
    );
  }

  const percentileThreshold: AnalysisMarkThreshold = {superRare: 93, rare: 85, ordinary: 10};

  return (
    <Flex direction="row" wrap className="relative gap-1">
      {
        loading &&
        <Flex direction="col" center className="absolute z-10 h-full rounded-lg bg-slate-100/80 dark:bg-slate-800/80">
          <LoadingIcon/>
        </Flex>
      }
      <AnalysisStatsGroupedUI stats={stats.pokemon.type} title={<PokemonFilterTitle type="pokemonType"/>}>
        <div className="relative h-10 w-10">
          <NextImage src={`/images/type/${type}.png`} alt={t2(`PokemonType.${type}`)} sizes={imageIconSizes}/>
        </div>
      </AnalysisStatsGroupedUI>
      {
        specialty &&
        <AnalysisStatsGroupedUI stats={stats.pokemon.specialty} title={<PokemonFilterTitle type="specialty"/>}>
          <div className="text-2xl">
            <PokemonSpecialty dimension="h-5 w-5" specialty={specialty}/>
          </div>
        </AnalysisStatsGroupedUI>
      }
      <AnalysisStatsGroupedUI stats={stats.pokemon.sleepType} title={<PokemonFilterTitle type="sleepType"/>}>
        <div className="text-2xl">
          <PokemonSleepType dimension="h-5 w-5" sleepType={sleepType}/>
        </div>
      </AnalysisStatsGroupedUI>
      {
        ingredients.fixed &&
        <AnalysisStatsGroupedUI
          stats={stats.pokemon.ingredient.fixed}
          title={<PokemonFilterTitle type="ingredientFixed"/>}
          threshold={{superRare: 20, rare: 15, ordinary: 5}}
        >
          <PokemonIngredientIcon dimension="h-12 w-12" id={ingredients.fixed}/>
        </AnalysisStatsGroupedUI>
      }
      {
        ingredients.random?.map((random, idx) => (
          <AnalysisStatsGroupedUI
            key={`random-${random}`}
            stats={stats.pokemon.ingredient.random[idx]}
            threshold={{superRare: 9, rare: 7, ordinary: 3.5}}
            title={
              <Flex direction="row" className="gap-1">
                <PokemonFilterTitle type="ingredientRandom"/>
                <div>#{idx + 1}</div>
              </Flex>
            }
          >
            <PokemonIngredientIcon dimension="h-12 w-12" id={random}/>
          </AnalysisStatsGroupedUI>
        ))
      }
      <AnalysisStatsGroupedUI stats={stats.pokemon.berry} title={<PokemonFilterTitle type="berry"/>}>
        <PokemonBerryIcon dimension="h-12 w-12" id={berry.id}/>
      </AnalysisStatsGroupedUI>
      <AnalysisStatsGroupedUI stats={stats.pokemon.mainSkill} title={<PokemonFilterTitle type="mainSkill"/>}>
        <Flex direction="col" center className="h-12 text-2xl">
          {t2(`MainSkill.Name.${skill}`)}
        </Flex>
      </AnalysisStatsGroupedUI>
      <AnalysisStatsContinuousUI
        stats={stats.producingRate.berry.count}
        title={t(sortTypeToTranslationId['berryCount'])}
        threshold={percentileThreshold}
      >
        <PokemonBerryIcon dimension="h-12 w-12" id={berry.id}/>
      </AnalysisStatsContinuousUI>
      <AnalysisStatsContinuousUI
        stats={stats.producingRate.berry.energy}
        title={t(sortTypeToTranslationId['berryEnergy'])}
        threshold={percentileThreshold}
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
          >
            <PokemonIngredientIcon dimension="h-12 w-12" id={ingredients.fixed}/>
          </AnalysisStatsContinuousUI>
          <AnalysisStatsContinuousUI
            stats={stats.producingRate.ingredient.energy}
            title={t(sortTypeToTranslationId['ingredientEnergy'])}
            threshold={percentileThreshold}
          >
            <Flex direction="row" center>
              <PokemonIngredientIcon dimension="h-12 w-12" id={ingredients.fixed}/>
              <ColoredEnergyIcon dimension="h-10 w-10" alt={t('Stats.Energy.Name')}/>
            </Flex>
          </AnalysisStatsContinuousUI>
        </>}
    </Flex>
  );
};
