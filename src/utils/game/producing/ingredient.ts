import {specialtyIdMap} from '@/const/game/pokemon';
import {ProducingRateOfItem} from '@/types/game/producing/rate';
import {IngredientMap} from '@/types/mongo/ingredient';
import {getNatureMultiplier} from '@/utils/game/nature';
import {defaultHelperCount, defaultIngredientProbability} from '@/utils/game/producing/const';
import {getFrequencyFromPokemon} from '@/utils/game/producing/frequency';
import {getProducingRate} from '@/utils/game/producing/rate';
import {GetProducingRateCommonOpts} from '@/utils/game/producing/type';


export type GetIngredientProducingRateOpts = GetProducingRateCommonOpts & {
  ingredientMap: IngredientMap,
};

export const getIngredientProducingRate = ({
  level,
  pokemon,
  subSkillBonus,
  helperCount,
  natureId,
  ingredientMap,
}: GetIngredientProducingRateOpts): ProducingRateOfItem | null => {
  const id = pokemon.ingredients.fixed;

  if (!id) {
    return null;
  }

  const {ingredients} = pokemon;
  const ingredient = ingredients.fixed ? ingredientMap[ingredients.fixed] : undefined;

  if (!ingredient) {
    return null;
  }

  const baseFrequency = getFrequencyFromPokemon({
    level,
    pokemon,
    subSkillBonus: subSkillBonus ?? {},
    helperCount: helperCount ?? defaultHelperCount,
    natureId,
  });

  const probability = defaultIngredientProbability + (subSkillBonus?.ingredientProbability ?? 0);
  const ingredientNatureMultiplier = getNatureMultiplier({id: natureId, effect: 'frequencyOfIngredient'});

  return {
    id,
    ...getProducingRate({
      frequency: baseFrequency / (probability - (ingredientNatureMultiplier - 1)),
      countPerHelp: pokemon.specialty === specialtyIdMap.ingredient ? 2 : 1,
      energyPerCount: ingredient.energy,
    }),
  };
};
