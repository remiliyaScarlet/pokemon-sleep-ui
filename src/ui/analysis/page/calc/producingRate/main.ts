import {IngredientId} from '@/types/game/ingredient';
import {getAnalysisStatsOfContinuous} from '@/ui/analysis/page/calc/continuous';
import {toAnalysisBerryProducingRate} from '@/ui/analysis/page/calc/producingRate/berry';
import {toAnalysisIngredientProducingRate} from '@/ui/analysis/page/calc/producingRate/ingredient';
import {ProducingRateOfIngredientsOnPokemon} from '@/ui/analysis/page/calc/producingRate/type';
import {
  getDailyEnergyOfItemRates,
  getDailyEnergyOfRate,
  isRateOfPokemonSame,
} from '@/ui/analysis/page/calc/producingRate/utils';
import {AnalysisStats, GetAnalysisStatsOpts} from '@/ui/analysis/page/calc/type';
import {defaultNeutralOpts} from '@/utils/game/producing/const';
import {
  generatePossibleIngredientProductions,
  groupIngredientProductions,
} from '@/utils/game/producing/ingredientChain';
import {getPokemonProducingRate} from '@/utils/game/producing/pokemon';


export const getAnalysisStatsOfProducingRate = ({
  pokedex,
  pokemon,
  ingredients,
  berryDataMap,
  ingredientMap,
  ingredientChainMap,
  snorlaxFavorite,
  level,
}: GetAnalysisStatsOpts): AnalysisStats['producingRate'] => {
  const currentRate = getPokemonProducingRate({
    berryData: berryDataMap[pokemon.berry.id],
    ingredients,
    ingredientMap,
    snorlaxFavorite,
    level,
    pokemon,
    ...defaultNeutralOpts,
  });

  const rateOfAllPokemon = pokedex.flatMap((pokemon) => [...generatePossibleIngredientProductions({
    level,
    chain: ingredientChainMap[pokemon.ingredientChain],
  })].map((ingredients) => ({
    pokemon,
    productions: ingredients,
    rate: getPokemonProducingRate({
      berryData: berryDataMap[pokemon.berry.id],
      ingredients,
      ingredientMap,
      snorlaxFavorite,
      level,
      pokemon,
      ...defaultNeutralOpts,
    }),
  })));

  const pokemonIdsInRates = rateOfAllPokemon.map(({pokemon}) => pokemon.id);
  // `.filter().map()` to make sure `berryRates` only have Pokémon in Pokédex
  // because `rateOfAllPokemon` contains all ingredient possibilities
  const berryRates = rateOfAllPokemon
    .filter(({pokemon}, idx) => pokemonIdsInRates.indexOf(pokemon.id) == idx)
    .map(({pokemon, rate}) => ({pokemon, rate: rate.berry}));

  const ingredientRates: {[ingredientId in IngredientId]: ProducingRateOfIngredientsOnPokemon[]} = {};
  for (const {pokemon, productions, rate} of rateOfAllPokemon) {
    for (const rateOfIngredient of Object.values(rate.ingredient)) {
      if (!(rateOfIngredient.id in ingredientRates)) {
        ingredientRates[rateOfIngredient.id] = [];
      }

      ingredientRates[rateOfIngredient.id].push({
        pokemon,
        productions,
        productionsGrouped: groupIngredientProductions(productions),
        rates: Object.values(rate.ingredient),
      });
    }
  }

  const currentDailyTotalOfIngredient = getDailyEnergyOfItemRates(Object.values(currentRate.ingredient));
  const currentDailyTotal = currentRate.berry.dailyEnergy + currentDailyTotalOfIngredient;

  return {
    berry: toAnalysisBerryProducingRate({
      itemId: pokemon.berry.id,
      pokemon,
      currentRate: currentRate.berry,
      samples: berryRates,
    }),
    ingredient: {
      individual: ingredients.map(({id}) => toAnalysisIngredientProducingRate({
        itemId: id,
        pokemon,
        samples: ingredientRates[id],
        currentRate: Object.values(currentRate.ingredient),
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
