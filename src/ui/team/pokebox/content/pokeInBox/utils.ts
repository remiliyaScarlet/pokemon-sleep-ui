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

export const getRateOfIngredients = ({
  pokeInBox,
  subSkillMap,
  ...props
}: PokeInBoxCommonProps): ProducingRateOfItem[] => {
  const {level, ingredients} = pokeInBox;

  return getIngredientProducingRates({
    level,
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
  const {pokemon} = props;
  const {berry} = pokemon;

  const singleParams = getProducingRateSingleParams({subSkillMap, ...pokeInBox});

  return getBerryProducingRate({
    level: pokeInBox.level,
    berryData: berryDataMap[berry.id],
    ...props,
    ...singleParams,
  });
};
