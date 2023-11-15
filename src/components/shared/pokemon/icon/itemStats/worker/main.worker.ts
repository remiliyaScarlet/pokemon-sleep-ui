import {
  PokemonItemStatsCalcResult,
  PokemonItemStatsWorkerOpts,
} from '@/components/shared/pokemon/icon/itemStats/worker/type';
import {defaultNeutralOpts} from '@/const/game/production';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredientChain';
import {getPokemonProducingParams, getPokemonProducingRate} from '@/utils/game/producing/pokemon';
import {getTotalEnergyOfPokemonProducingRate} from '@/utils/game/producing/rateReducer';
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

  const producingStats: PokemonItemStatsCalcResult[] = pokemonIngredientProduction
    .flatMap(({pokemonId, ingredientChainId}) => {
      const pokemon = pokedex[pokemonId];

      if (!pokemon) {
        return null;
      }

      const chain = ingredientChainMap[ingredientChainId];

      if (!chain) {
        return null;
      }

      return [...generatePossibleIngredientProductions({level, chain})]
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
            evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
            ...data,
          });

          return {
            pokemon,
            pokemonRate,
            identifier: ingredients.map(({id}) => id).join('-'),
            ingredients,
            dailyTotalEnergy: getTotalEnergyOfPokemonProducingRate(pokemonRate),
          };
        });
    })
    .filter(isNotNullish);

  postMessage(producingStats);
};

addEventListener('message', onMessage);
