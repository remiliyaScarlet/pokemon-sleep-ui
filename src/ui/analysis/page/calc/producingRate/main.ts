import {defaultNeutralOpts} from '@/const/game/production';
import {IngredientId} from '@/types/game/ingredient';
import {getAnalysisStatsOfContinuous} from '@/ui/analysis/page/calc/continuous';
import {toAnalysisBerryProducingRate} from '@/ui/analysis/page/calc/producingRate/berry';
import {toAnalysisIngredientProducingRate} from '@/ui/analysis/page/calc/producingRate/ingredient';
import {ProducingRateOfIngredientsOnPokemon} from '@/ui/analysis/page/calc/producingRate/type';
import {isRateOfPokemonSame} from '@/ui/analysis/page/calc/producingRate/utils';
import {AnalysisStats, GetAnalysisStatsOpts} from '@/ui/analysis/page/calc/type';
import {
  generatePossibleIngredientProductions,
  groupIngredientProductions,
} from '@/utils/game/producing/ingredientChain';
import {getPokemonProducingParams, getPokemonProducingRate} from '@/utils/game/producing/pokemon';
import {getDailyEnergyOfItemRates, getDailyEnergyOfRate} from '@/utils/game/producing/rate';


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

  const currentRate = getPokemonProducingRate({
    ...opts,
    pokemonProducingParams: getPokemonProducingParams({
      pokemonId: pokemon.id,
      pokemonProducingParamsMap,
    }),
    berryData: berryDataMap[pokemon.berry.id],
    ...defaultNeutralOpts,
  });
  const currentIngredientRates = Object.values(currentRate.ingredient);

  const rateOfAllPokemon = pokemonList.flatMap((otherPokemon) => [...generatePossibleIngredientProductions({
    level,
    chain: ingredientChainMap[otherPokemon.ingredientChain],
  })].map((otherIngredients) => ({
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
      ...defaultNeutralOpts,
    }),
  })));

  const pokemonIdsInRates = rateOfAllPokemon.map(({pokemon}) => pokemon.id);
  // `.filter().map()` to make sure `berryRates` only have Pokémon in Pokédex
  // because `rateOfAllPokemon` contains all ingredient possibilities
  const berryRates = rateOfAllPokemon
    .filter(({pokemon}, idx) => pokemonIdsInRates.indexOf(pokemon.id) == idx)
    .map(({pokemon, rate}) => ({pokemon, rate: rate.berry}));

  const ingredientRates: {[ingredientId in IngredientId]?: ProducingRateOfIngredientsOnPokemon[]} = {};
  for (const {pokemon, productions, rate} of rateOfAllPokemon) {
    const ratesOfIngredients = Object.values(rate.ingredient);

    for (const rateOfIngredient of ratesOfIngredients) {
      if (!(rateOfIngredient.id in ingredientRates)) {
        ingredientRates[rateOfIngredient.id] = [];
      }

      ingredientRates[rateOfIngredient.id]?.push({
        pokemon,
        productions,
        productionsGrouped: groupIngredientProductions(productions),
        rates: ratesOfIngredients,
      });
    }
  }

  const currentDailyTotalOfIngredient = getDailyEnergyOfItemRates(currentIngredientRates);
  const currentDailyTotal = currentRate.berry.energy.equivalent + currentDailyTotalOfIngredient;

  return {
    berry: toAnalysisBerryProducingRate({
      itemId: pokemon.berry.id,
      pokemon,
      currentRate: currentRate.berry,
      samples: berryRates,
    }),
    ingredient: {
      // Using `currentIngredientRates` for getting the ingredient IDs, so it won't be duplicated
      individual: currentIngredientRates.map(({id}) => toAnalysisIngredientProducingRate({
        itemId: id,
        pokemon,
        samples: ingredientRates[id] ?? [],
        currentRate: currentIngredientRates,
        currentIngredients: ingredients,
      })),
      overall: getAnalysisStatsOfContinuous({
        samples: rateOfAllPokemon
          .map((rateOfPokemon) => ({
            ...rateOfPokemon,
            totalEnergy: getDailyEnergyOfItemRates(Object.values(rateOfPokemon.rate.ingredient)),
          })),
        getPokemonId: ({pokemon}) => pokemon.id,
        getValue: ({totalEnergy}) => totalEnergy,
        getLinkedData: ({totalEnergy}) => totalEnergy,
        isLinked: ({totalEnergy}) => totalEnergy > currentDailyTotalOfIngredient,
        isCurrentRank: (sample) => isRateOfPokemonSame(sample, {pokemon, rate: currentRate}),
        currentValue: currentDailyTotalOfIngredient,
      }),
    },
    total: getAnalysisStatsOfContinuous({
      samples: rateOfAllPokemon
        .map((rateOfPokemon) => ({
          ...rateOfPokemon,
          dailyTotal: getDailyEnergyOfRate(rateOfPokemon.rate),
        })),
      getPokemonId: ({pokemon}) => pokemon.id,
      getValue: ({dailyTotal}) => dailyTotal,
      getLinkedData: ({dailyTotal}) => dailyTotal,
      isLinked: ({dailyTotal}) => dailyTotal > currentDailyTotal,
      isCurrentRank: (sample) => isRateOfPokemonSame(sample, {pokemon, rate: currentRate}),
      currentValue: currentDailyTotal,
    }),
  };
};
