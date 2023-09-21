import {RatingWorkerOpts} from '@/types/game/pokemon/rating';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredients';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {getPokemonProducingParams, getPokemonProducingRate} from '@/utils/game/producing/pokemon';


export const toRatingWorkerOpts = ({
  pokeInBox,
  pokemon,
  pokemonProducingParamsMap,
  berryDataMap,
  ingredientMap,
  ingredientChainMap,
  subSkillMap,
  snorlaxFavorite,
  calculatedSettings,
}: PokeInBoxCommonProps): RatingWorkerOpts => {
  const {
    level,
    ingredients,
    subSkill,
    nature,
  } = pokeInBox;

  // Explicit to avoid passing unwanted property to worker
  return {
    ...calculatedSettings,
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

export const getRateOfPokemon = ({
  pokeInBox,
  berryDataMap,
  subSkillMap,
  ...props
}: PokeInBoxCommonProps) => {
  const {pokemon, pokemonProducingParamsMap, calculatedSettings} = props;
  const {level, ingredients} = pokeInBox;
  const {id, berry} = pokemon;

  const singleParams = getProducingRateSingleParams({subSkillMap, ...pokeInBox});

  return getPokemonProducingRate({
    ...props,
    ...singleParams,
    ...calculatedSettings,
    level: pokeInBox.level,
    pokemonProducingParams: getPokemonProducingParams({
      pokemonId: id,
      pokemonProducingParamsMap,
    }),
    berryData: berryDataMap[berry.id],
    ingredients: getEffectiveIngredientProductions({level, ingredients}),
  });
};
