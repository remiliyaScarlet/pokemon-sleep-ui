import {RatingWorkerOpts} from '@/types/game/pokemon/rating';
import {ProducingRateOfItem} from '@/types/game/producing/rate';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {getBerryProducingRate} from '@/utils/game/producing/berry';
import {getEffectiveIngredientProductions, getIngredientProducingRates} from '@/utils/game/producing/ingredients';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {getPokemonProducingParams} from '@/utils/game/producing/pokemon';


export const toRatingWorkerOpts = ({
  bonus,
  noCollectDurations,
  pokeInBox,
  pokemon,
  pokemonProducingParamsMap,
  berryDataMap,
  ingredientMap,
  ingredientChainMap,
  subSkillMap,
  snorlaxFavorite,
}: PokeInBoxCommonProps): RatingWorkerOpts => {
  const {
    level,
    ingredients,
    subSkill,
    nature,
  } = pokeInBox;

  // Explicit to avoid passing unwanted property to worker
  return {
    bonus,
    noCollectDurations,
    pokemon,
    pokemonProducingParams: getPokemonProducingParams({
      pokemonId: pokemon.id,
      pokemonProducingParamsMap,
    }),
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    subSkillMap,
    snorlaxFavorite,
    level,
    ingredients,
    subSkill,
    nature,
  };
};

export const getRateOfIngredients = ({
  pokeInBox,
  subSkillMap,
  ...props
}: PokeInBoxCommonProps): ProducingRateOfItem[] => {
  const {pokemonProducingParamsMap} = props;
  const {pokemon, level, ingredients} = pokeInBox;

  return getIngredientProducingRates({
    level,
    pokemonProducingParams: getPokemonProducingParams({
      pokemonId: pokemon,
      pokemonProducingParamsMap,
    }),
    ingredients: getEffectiveIngredientProductions({level, ingredients}),
    ...props,
    ...getProducingRateSingleParams({subSkillMap, ...pokeInBox}),
  });
};

export const getRateOfBerry = ({
  pokeInBox,
  berryDataMap,
  subSkillMap,
  ...props
}: PokeInBoxCommonProps) => {
  const {pokemon, pokemonProducingParamsMap} = props;
  const {id, berry} = pokemon;

  const singleParams = getProducingRateSingleParams({subSkillMap, ...pokeInBox});

  return getBerryProducingRate({
    level: pokeInBox.level,
    pokemonProducingParams: getPokemonProducingParams({
      pokemonId: id,
      pokemonProducingParamsMap,
    }),
    berryData: berryDataMap[berry.id],
    ...props,
    ...singleParams,
  });
};
