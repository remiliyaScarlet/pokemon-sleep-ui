import {NatureId} from '@/types/game/pokemon/nature';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subskill';
import {getNatureMultiplier} from '@/utils/game/nature';
import {defaultIngredientSplit} from '@/utils/game/producing/const';
import {getSubSkillBonusValue} from '@/utils/game/subSkill';


type GetProbabilitySplitOpts = {
  type: 'berry' | 'ingredient',
  natureId: NatureId | null,
  subSkillBonus: GroupedSubSkillBonus | null,
};

export const getProbabilitySplit = ({type, natureId, subSkillBonus}: GetProbabilitySplitOpts): number => {
  let ingredientSplit = defaultIngredientSplit;
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
