import {RatingWorkerOpts} from '@/types/game/pokemon/rating';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredients';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {getPokemonProducingParams, getPokemonProducingRate} from '@/utils/game/producing/pokemon';
import {getDefaultRatingBasis} from '@/utils/game/rating/utils';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {toCalculatedUserSettings} from '@/utils/user/settings';


export const toRatingWorkerOpts = ({
  pokeInBox,
  pokemon,
  pokemonProducingParamsMap,
  berryDataMap,
  ingredientMap,
  ingredientChainMap,
  mainSkillMap,
  subSkillMap,
  snorlaxFavorite,
  settings,
  ratingBasis,
}: PokeInBoxCommonProps): RatingWorkerOpts => {
  const {
    level,
    ingredients,
    subSkill,
    nature,
    evolutionCount,
  } = pokeInBox;

  // Explicit to avoid passing unwanted property to worker
  return {
    pokemon,
    pokemonProducingParams: getPokemonProducingParams({
      pokemonId: pokemon.id,
      pokemonProducingParamsMap,
    }),
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    snorlaxFavorite,
    level,
    ingredients,
    subSkill,
    nature,
    evolutionCount,
    settings,
    basis: ratingBasis ?? getDefaultRatingBasis(pokemon.specialty),
    friendshipLevel: 0,
  };
};

export const getRateOfPokemon = ({
  pokeInBox,
  berryDataMap,
  mainSkillMap,
  subSkillMap,
  ...props
}: PokeInBoxCommonProps) => {
  const {
    pokemon,
    pokemonProducingParamsMap,
    settings,
  } = props;
  const {level, ingredients} = pokeInBox;
  const {id, berry, skill} = pokemon;

  const singleParams = getProducingRateSingleParams({
    subSkillMap,
    ...pokeInBox,
    helpingBonusSimulateOnSelf: true,
  });

  return getPokemonProducingRate({
    ...props,
    ...singleParams,
    ...toCalculatedUserSettings({
      settings,
      recoveryRate: toRecoveryRate(singleParams),
    }),
    level: pokeInBox.level,
    evolutionCount: pokeInBox.evolutionCount,
    pokemonProducingParams: getPokemonProducingParams({
      pokemonId: id,
      pokemonProducingParamsMap,
    }),
    berryData: berryDataMap[berry.id],
    ingredients: getEffectiveIngredientProductions({level, ingredients}),
    skillData: mainSkillMap[skill],
    noCap: true,
  });
};
