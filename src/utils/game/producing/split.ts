import {GroupedSubSkillBonus} from '@/types/game/pokemon/subskill';
import {defaultIngredientSplit} from '@/utils/game/producing/const';
import {getSubSkillBonusValue} from '@/utils/game/subSkill';


type GetProbabilitySplitOpts = {
  type: 'berry' | 'ingredient',
  subSkillBonus: GroupedSubSkillBonus | null,
};

export const getProbabilitySplit = ({type, subSkillBonus}: GetProbabilitySplitOpts): number => {
  let ingredientSplit = defaultIngredientSplit;
  for (const bonusValue of getSubSkillBonusValue(subSkillBonus, 'ingredientProbability')) {
    ingredientSplit *= (1 + bonusValue / 100);
  }

  if (type === 'berry') {
    return 1 - ingredientSplit;
  }

  if (type === 'ingredient') {
    return ingredientSplit;
  }

  throw new Error(`Unhandled split type of ${type satisfies never}`);
};
