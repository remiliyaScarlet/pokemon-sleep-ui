import {defaultNeutralOpts} from '@/const/game/production';
import {toAnalysisBerryProducingRate} from '@/ui/analysis/page/calc/producingRate/berry';
import {toAnalysisIngredientProducingStats} from '@/ui/analysis/page/calc/producingRate/ingredient';
import {toAnalysisSkillTriggerProducingStats} from '@/ui/analysis/page/calc/producingRate/skill';
import {toAnalysisTotalProducingStats} from '@/ui/analysis/page/calc/producingRate/total';
import {PokemonAnalysisRateInfo} from '@/ui/analysis/page/calc/producingRate/type';
import {AnalysisStats, GetAnalysisStatsOpts} from '@/ui/analysis/page/calc/type';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredientChain';
import {getPokemonProducingParams, getPokemonProducingRate} from '@/utils/game/producing/pokemon';


export const getAnalysisStatsOfProducingRate = (opts: GetAnalysisStatsOpts): AnalysisStats['producingRate'] => {
  const {
    pokemonList,
    pokemon,
    pokemonProducingParamsMap,
    level,
    ingredients,
    berryDataMap,
    ingredientChainMap,
  } = opts;

  const currentPokemonProducingParams = getPokemonProducingParams({
    pokemonId: pokemon.id,
    pokemonProducingParamsMap,
  });
  const currentRate = getPokemonProducingRate({
    ...opts,
    pokemonProducingParams: currentPokemonProducingParams,
    berryData: berryDataMap[pokemon.berry.id],
    evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
    ...defaultNeutralOpts,
  });

  const rateOfAllPokemon = pokemonList.flatMap((otherPokemon) => [...generatePossibleIngredientProductions({
    level,
    chain: ingredientChainMap[otherPokemon.ingredientChain],
  })].map((otherIngredients): PokemonAnalysisRateInfo => ({
    pokemon: otherPokemon,
    productions: otherIngredients,
    rate: getPokemonProducingRate({
      // `opts` has to be the first because `pokemon`, `berryData`, `ingredients` have to be overridden
      ...opts,
      pokemon: otherPokemon,
      pokemonProducingParams: getPokemonProducingParams({
        pokemonId: otherPokemon.id,
        pokemonProducingParamsMap,
      }),
      berryData: berryDataMap[otherPokemon.berry.id],
      ingredients: otherIngredients,
      evolutionCount: getEvolutionCountFromPokemonInfo({pokemon: otherPokemon}),
      ...defaultNeutralOpts,
    }),
  })));

  return {
    berry: toAnalysisBerryProducingRate({
      pokemon,
      currentRate: currentRate.berry,
      itemId: pokemon.berry.id,
      rateOfAllPokemon,
    }),
    ingredient: toAnalysisIngredientProducingStats({
      pokemon,
      ingredients,
      current: currentRate,
      rateOfAllPokemon,
    }),
    skillTrigger: toAnalysisSkillTriggerProducingStats({
      pokemonProducingParamsMap,
      pokemon,
      current: currentRate,
      rateOfAllPokemon,
    }),
    total: toAnalysisTotalProducingStats({
      pokemon,
      current: currentRate,
      rateOfAllPokemon,
    }),
  };
};
