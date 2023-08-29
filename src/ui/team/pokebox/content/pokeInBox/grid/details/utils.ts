import {ProducingRateOfItem} from '@/types/game/producing/rate';
import {PokeboxPokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {getBerryProducingRate} from '@/utils/game/producing/berry';
import {getEffectiveIngredientProductions, getIngredientProducingRates} from '@/utils/game/producing/ingredients';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';


export const getRateOfIngredients = (opts: PokeboxPokeInBoxCommonProps): ProducingRateOfItem[] => {
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
    multiplier: bonus.ingredient,
    ...getProducingRateSingleParams({subSkillMap, ...pokeInBox}),
  });
};

export const getRateOfBerry = (opts: PokeboxPokeInBoxCommonProps) => {
  const {
    pokemon,
    pokeInBox,
    berryMap,
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
    berryData: berryMap[berry.id],
    ...singleParams,
  });
};
