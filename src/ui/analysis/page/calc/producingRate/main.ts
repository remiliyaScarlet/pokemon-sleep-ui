import {getAnalysisStatsOfContinuous} from '@/ui/analysis/page/calc/continuous';
import {
  getAnalysisStatsOfItemProducingRate,
  ProducingRateWithPokemon,
} from '@/ui/analysis/page/calc/producingRate/item';
import {AnalysisStats, GetAnalysisStatsOpts} from '@/ui/analysis/page/calc/type';
import {defaultNeutralOpts} from '@/utils/game/producing/const';
import {getPokemonProducingRate} from '@/utils/game/producing/pokemon';
import {isNotNullish} from '@/utils/type';


export const getAnalysisStatsOfProducingRate = ({
  pokedex,
  pokemon,
  berryDataMap,
  ingredientMap,
  snorlaxFavorite,
  level,
}: GetAnalysisStatsOpts): AnalysisStats['producingRate'] => {
  const currentRate = getPokemonProducingRate({
    berryData: berryDataMap[pokemon.berry.id],
    ingredient: pokemon.ingredients.fixed ? ingredientMap[pokemon.ingredients.fixed] : undefined,
    snorlaxFavorite,
    level,
    pokemon,
    ...defaultNeutralOpts,
  });

  const rateOfAllPokemon = pokedex.map((pokemon) => ({
    pokemon,
    rate: getPokemonProducingRate({
      berryData: berryDataMap[pokemon.berry.id],
      ingredient: pokemon.ingredients.fixed ? ingredientMap[pokemon.ingredients.fixed] : undefined,
      snorlaxFavorite,
      level,
      pokemon,
      ...defaultNeutralOpts,
    }),
  }));

  const berryRates = rateOfAllPokemon
    .map(({pokemon, rate}) => ({pokemon, rate: rate.berry}));

  const ingredientRates = rateOfAllPokemon
    .map(({pokemon, rate}) => ({pokemon, rate: rate.ingredient}))
    .filter((data): data is ProducingRateWithPokemon => isNotNullish(data.rate));

  const currentDailyTotal = currentRate.berry.dailyEnergy + (currentRate.ingredient?.dailyEnergy ?? 0);

  return {
    berry: {
      count: getAnalysisStatsOfItemProducingRate({
        samples: berryRates,
        currentRate: currentRate.berry,
        pokemon,
        getComparer: (rate) => rate.quantity,
      }),
      energy: getAnalysisStatsOfItemProducingRate({
        samples: berryRates,
        currentRate: currentRate.berry,
        pokemon,
        getComparer: (rate) => rate.dailyEnergy,
      }),
    },
    ingredient: currentRate.ingredient && {
      count: getAnalysisStatsOfItemProducingRate({
        samples: ingredientRates,
        currentRate: currentRate.ingredient,
        pokemon,
        getComparer: (rate) => rate.quantity,
      }),
      energy: getAnalysisStatsOfItemProducingRate({
        samples: ingredientRates,
        currentRate: currentRate.ingredient,
        pokemon,
        getComparer: (rate) => rate.dailyEnergy,
      }),
    },
    total: getAnalysisStatsOfContinuous({
      samples: rateOfAllPokemon
        .map(({pokemon, rate}) => ({
          pokemon,
          dailyTotal: rate.berry.dailyEnergy + (rate.ingredient?.dailyEnergy ?? 0),
        })),
      getPokemonId: ({pokemon}) => pokemon.id,
      getValue: ({dailyTotal}) => dailyTotal,
      getLinkedData: ({dailyTotal}) => dailyTotal,
      isLinked: ({dailyTotal}) => dailyTotal > currentDailyTotal,
      isCurrentRank: (sample) => sample.pokemon.id === pokemon.id,
      currentValue: currentDailyTotal,
    }),
  };
};
