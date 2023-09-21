import {
  PokemonItemStatsCalcResult,
  PokemonItemStatsWorkerOpts,
  PokemonItemStatsWorkerReturn,
} from '@/components/shared/pokemon/icon/itemStats/worker/type';
import {defaultNeutralOpts} from '@/const/game/production';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredientChain';
import {getPokemonProducingParams, getPokemonProducingRate} from '@/utils/game/producing/pokemon';
import {getDailyEnergyOfRate} from '@/utils/game/producing/rate';
import {isNotNullish} from '@/utils/type';


const onMessage = ({data}: MessageEvent<PokemonItemStatsWorkerOpts>) => {
  const {
    pokedex,
    pokemonProducingParamsMap,
    pokemonIngredientProduction,
    berryDataMap,
    ingredientChainMap,
    level,
  } = data;

  const producingStats: PokemonItemStatsWorkerReturn = pokemonIngredientProduction
    .flatMap(({pokemonId, ingredientChainId}) => {
      const pokemon = pokedex[pokemonId];

      if (!pokemon) {
        return null;
      }

      const chain = ingredientChainMap[ingredientChainId];

      if (!chain) {
        return null;
      }

      const productions = [...generatePossibleIngredientProductions({level, chain})];

      return productions
        .map((ingredients): PokemonItemStatsCalcResult => {
          const pokemonRate = getPokemonProducingRate({
            pokemon,
            pokemonProducingParams: getPokemonProducingParams({
              pokemonId: pokemon.id,
              pokemonProducingParamsMap,
            }),
            snorlaxFavorite: {},
            ...defaultNeutralOpts,
            berryData: berryDataMap[pokemon.berry.id],
            ingredients,
            ...data,
          });

          return {
            pokemon,
            pokemonRate,
            identifier: ingredients.map(({id}) => id).join('-'),
            ingredients,
            dailyTotalEnergy: getDailyEnergyOfRate(pokemonRate),
          };
        });
    })
    .filter(isNotNullish)
    .sort((a, b) => (
      (b.dailyTotalEnergy ?? 0) - (a.dailyTotalEnergy ?? 0)
    ));

  postMessage(producingStats);
};

addEventListener('message', onMessage);
