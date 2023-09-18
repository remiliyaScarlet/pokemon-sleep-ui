import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {getNatureMultiplier} from '@/utils/game/nature';
import {getSubSkillBonusValue} from '@/utils/game/subSkill';


type GetProbabilitySplitOpts = {
  type: 'berry' | 'ingredient',
  pokemonProducingParams: PokemonProducingParams,
  natureId: NatureId | null,
  subSkillBonus: GroupedSubSkillBonus | null,
};

export const getProbabilitySplit = ({
  type,
  pokemonProducingParams,
  natureId,
  subSkillBonus,
}: GetProbabilitySplitOpts): number => {
  let ingredientSplit = pokemonProducingParams.ingredientSplit;

  for (const bonusValue of getSubSkillBonusValue(subSkillBonus, 'ingredientProbability')) {
    ingredientSplit *= (1 + bonusValue / 100);
  }
  ingredientSplit *= getNatureMultiplier({id: natureId, effect: 'rateOfIngredient'});

  if (type === 'berry') {
    return 1 - ingredientSplit;
  }

  if (type === 'ingredient') {
    return ingredientSplit;
  }

  throw new Error(`Unhandled split type of ${type satisfies never}`);
};
