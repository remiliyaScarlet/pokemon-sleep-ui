import {PokemonItemStatsCalcResult} from '@/components/shared/pokemon/icon/itemStats/type';
import {PokemonItemStatsWorkerOpts} from '@/components/shared/pokemon/icon/itemStats/worker/type';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredientChain';
import {getProducingRateNeutralParams} from '@/utils/game/producing/params';
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
    mainSkillMap,
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
            berryData: berryDataMap[pokemon.berry.id],
            ingredients,
            skillData: mainSkillMap[pokemon.skill],
            ...getProducingRateNeutralParams({pokemon}),
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
