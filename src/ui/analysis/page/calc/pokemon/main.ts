import {ingredientLevels, IngredientProduction} from '@/types/game/pokemon/ingredient';
import {getAnalysisStatsOfGrouped} from '@/ui/analysis/page/calc/grouped';
import {getAnalysisStatsOfSleepStyle} from '@/ui/analysis/page/calc/pokemon/sleepStyle';
import {AnalysisStats, AnalysisStatsGrouped, GetAnalysisStatsOpts} from '@/ui/analysis/page/calc/type';


export const getAnalysisStatsOfPokemon = (opts: GetAnalysisStatsOpts): AnalysisStats['pokemon'] => {
  const {
    pokedex,
    pokemon,
    ingredientChainMap,
  } = opts;

  const currentChain = ingredientChainMap[pokemon.ingredientChain];

  return {
    type: getAnalysisStatsOfGrouped({
      samples: pokedex,
      isMatched: ({type}) => type === pokemon.type,
      getLinkedData: ({type}) => type,
    }),
    specialty: getAnalysisStatsOfGrouped({
      samples: pokedex,
      isMatched: ({specialty}) => specialty === pokemon.specialty,
      getLinkedData: ({specialty}) => specialty,
    }),
    sleepType: getAnalysisStatsOfGrouped({
      samples: pokedex,
      isMatched: ({sleepType}) => sleepType === pokemon.sleepType,
      getLinkedData: ({sleepType}) => sleepType,
    }),
    ingredient: Object.fromEntries(ingredientLevels.map((ingredientLevel) => [
      ingredientLevel,
      currentChain.ingredients[ingredientLevel].map((production) => getAnalysisStatsOfGrouped({
        samples: pokedex,
        isMatched: ({ingredientChain}) => ingredientChainMap[ingredientChain].ingredients[ingredientLevel]
          .some(({id}) => id === production.id),
        getLinkedData: () => production,
      })) satisfies AnalysisStatsGrouped<IngredientProduction>[],
    ])) as AnalysisStats['pokemon']['ingredient'],
    berry: getAnalysisStatsOfGrouped({
      samples: pokedex,
      isMatched: ({berry}) => berry.id === pokemon.berry.id,
      getLinkedData: ({berry}) => berry.id,
    }),
    mainSkill: getAnalysisStatsOfGrouped({
      samples: pokedex,
      isMatched: ({skill}) => skill === pokemon.skill,
      getLinkedData: ({skill}) => skill,
    }),
    sleepStyle: getAnalysisStatsOfSleepStyle(opts),
  };
};
