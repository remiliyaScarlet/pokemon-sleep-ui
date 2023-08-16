import groupBy from 'lodash/groupBy';

import {pokeInBoxIngredientLevel} from '@/types/game/pokebox';
import {PokeboxPokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {getBerryProducingRate} from '@/utils/game/producing/berry';
import {getIngredientProducingRate} from '@/utils/game/producing/ingredient';
import {GetProducingRateChangeableOpts} from '@/utils/game/producing/type';
import {getSubSkillBonus} from '@/utils/game/subSkill';
import {isNotNullish} from '@/utils/type';


const getChangeableOpts = ({
  pokeInBox,
  subSkillMap,
}: PokeboxPokeInBoxCommonProps): GetProducingRateChangeableOpts => {
  const {level, subSkill, nature} = pokeInBox;

  const subSkillBonus = getSubSkillBonus({level, pokemonSubSkill: subSkill, subSkillMap});
  return {
    helperCount: subSkillBonus.helper ? 1 : 0,
    subSkillBonus,
    natureId: nature,
  };
};

export const getRateOfIngredients = (opts: PokeboxPokeInBoxCommonProps) => {
  const {pokemon, pokeInBox, ingredientMap} = opts;
  const {ingredients} = pokemon;
  const {randomIngredient, level} = pokeInBox;

  const changeableOpts = getChangeableOpts(opts);

  const ingredientPossibilities = (
    1 + pokeInBoxIngredientLevel.filter((ingredientLevel) => level >= ingredientLevel).length
  );

  return groupBy(
    [
      getIngredientProducingRate({
        level,
        pokemon,
        ingredient: ingredients.fixed ? ingredientMap[ingredients.fixed] : undefined,
        possibilities: ingredientPossibilities,
        ...changeableOpts,
      }),
      ...Object.entries(randomIngredient).map(([lv, rate]) => {
        if (!rate || parseInt(lv) > level) {
          return null;
        }

        const {id, quantity} = rate;
        return getIngredientProducingRate({
          level,
          pokemon,
          ingredient: id ? ingredientMap[id] : undefined,
          count: quantity,
          possibilities: ingredientPossibilities,
          ...changeableOpts,
        });
      }),
    ].filter(isNotNullish),
    (item) => item.id,
  );
};

export const getRateOfBerry = (opts: PokeboxPokeInBoxCommonProps) => {
  const {pokemon, pokeInBox, berryMap} = opts;
  const {berry} = pokemon;
  const {level} = pokeInBox;

  const changeableOpts = getChangeableOpts(opts);

  return getBerryProducingRate({
    level,
    pokemon,
    isSnorlaxFavorite: false,
    berryData: berryMap[berry.id],
    ...changeableOpts,
  });
};
