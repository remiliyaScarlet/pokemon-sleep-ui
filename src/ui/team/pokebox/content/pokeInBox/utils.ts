import {RatingWorkerOpts} from '@/types/game/pokemon/rating';
import {ProducingRateOfItem} from '@/types/game/producing/rate';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {getBerryProducingRate} from '@/utils/game/producing/berry';
import {getEffectiveIngredientProductions, getIngredientProducingRates} from '@/utils/game/producing/ingredients';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';


export const toRatingWorkerOpts = ({
  bonus,
  pokeInBox,
  pokemon,
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

  return {
    bonus,
    pokemon,
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

export const getRateOfIngredients = (opts: PokeInBoxCommonProps): ProducingRateOfItem[] => {
  const {
    pokemon,
    pokeInBox,
    ingredientMap,
    subSkillMap,
    bonus,
  } = opts;
  const {level, ingredients} = pokeInBox;

  return getIngredientProducingRates({
    level,
    pokemon,
    ingredients: getEffectiveIngredientProductions({level, ingredients}),
    ingredientMap,
    multiplier: 1 + bonus.ingredient / 100,
    ...getProducingRateSingleParams({subSkillMap, ...pokeInBox}),
  });
};

export const getRateOfBerry = (opts: PokeInBoxCommonProps) => {
  const {
    pokemon,
    pokeInBox,
    berryDataMap,
    subSkillMap,
    snorlaxFavorite,
  } = opts;
  const {berry} = pokemon;
  const {level} = pokeInBox;

  const singleParams = getProducingRateSingleParams({subSkillMap, ...pokeInBox});

  return getBerryProducingRate({
    level,
    pokemon,
    snorlaxFavorite,
    berryData: berryDataMap[berry.id],
    ...singleParams,
  });
};
