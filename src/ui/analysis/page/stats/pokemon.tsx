import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {PokemonFilterTitle} from '@/components/shared/pokemon/input/title';
import {PokemonSleepType} from '@/components/shared/pokemon/sleepType';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty';
import {imageIconSizes} from '@/styles/image';
import {AnalysisStatsGroupedUI} from '@/ui/analysis/page/result/group';
import {AnalysisStatsUiProps} from '@/ui/analysis/page/stats/type';


export const AnalysisStatsOfPokemonMeta = ({stats, pokemon}: AnalysisStatsUiProps) => {
  const {
    type,
    specialty,
    sleepType,
    ingredients,
    berry,
    skill,
  } = pokemon;
  const t = useTranslations('Game');

  return (
    <>
      <AnalysisStatsGroupedUI
        stats={stats.pokemon.type}
        title={<PokemonFilterTitle type="pokemonType"/>}
      >
        <div className="relative h-10 w-10">
          <NextImage src={`/images/type/${type}.png`} alt={t(`PokemonType.${type}`)} sizes={imageIconSizes}/>
        </div>
      </AnalysisStatsGroupedUI>
      {
        specialty &&
        <AnalysisStatsGroupedUI
          stats={stats.pokemon.specialty}
          title={<PokemonFilterTitle type="specialty"/>}
        >
          <div className="text-2xl">
            <PokemonSpecialty dimension="h-8 w-8" specialty={specialty}/>
          </div>
        </AnalysisStatsGroupedUI>
      }
      <AnalysisStatsGroupedUI stats={stats.pokemon.sleepType} title={<PokemonFilterTitle type="sleepType"/>}>
        <div className="text-2xl">
          <PokemonSleepType dimension="h-8 w-8" sleepType={sleepType}/>
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
          {t(`MainSkill.Name.${skill}`)}
        </Flex>
      </AnalysisStatsGroupedUI>
    </>
  );
};
