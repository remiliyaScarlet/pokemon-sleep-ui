import {ProducingRateOfItem} from '@/types/game/producing/rate';
import {PokeboxPokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {getBerryProducingRate} from '@/utils/game/producing/berry';
import {getIngredientProducingRates} from '@/utils/game/producing/ingredients';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';


export const getRateOfIngredients = (opts: PokeboxPokeInBoxCommonProps): ProducingRateOfItem[] => {
  const {
    pokemon,
    pokeInBox,
    ingredientMap,
    subSkillMap,
  } = opts;
  const {level, ingredients} = pokeInBox;

  const singleParams = getProducingRateSingleParams({subSkillMap, ...pokeInBox});

  return getIngredientProducingRates({
    level,
    pokemon,
    ingredients: Object.values(ingredients),
    ingredientMap,
    ...singleParams,
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
