import {getAnalysisStatsOfGrouped} from '@/ui/analysis/page/calc/grouped';
import {getAnalysisStatsOfSleepStyle} from '@/ui/analysis/page/calc/pokemon/sleepStyle';
import {AnalysisStats, GetAnalysisStatsOpts} from '@/ui/analysis/page/calc/type';


export const getAnalysisStatsOfPokemon = (opts: GetAnalysisStatsOpts): AnalysisStats['pokemon'] => {
  const {pokedex, pokemon} = opts;

  return {
    type: getAnalysisStatsOfGrouped({
      samples: pokedex,
      isMatched: ({type}) => type === pokemon.type,
    }),
    specialty: getAnalysisStatsOfGrouped({
      samples: pokedex,
      isMatched: ({specialty}) => specialty === pokemon.specialty,
    }),
    sleepType: getAnalysisStatsOfGrouped({
      samples: pokedex,
      isMatched: ({sleepType}) => sleepType === pokemon.sleepType,
    }),
    ingredient: {
      fixed: getAnalysisStatsOfGrouped({
        samples: pokedex,
        isMatched: ({ingredients}) => ingredients.fixed === pokemon.ingredients.fixed,
      }),
      random: pokemon.ingredients.random?.map((ingredient) => getAnalysisStatsOfGrouped({
        samples: pokedex,
        isMatched: ({ingredients}) => ingredients.random?.includes(ingredient) ?? false,
      })) ?? [],
    },
    berry: getAnalysisStatsOfGrouped({
      samples: pokedex,
      isMatched: ({berry}) => berry.id === pokemon.berry.id,
    }),
    mainSkill: getAnalysisStatsOfGrouped({
      samples: pokedex,
      isMatched: ({skill}) => skill === pokemon.skill,
    }),
    sleepStyle: getAnalysisStatsOfSleepStyle(opts),
  };
};
