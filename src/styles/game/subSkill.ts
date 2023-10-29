import {SubSkillRarity} from '@/types/game/pokemon/subSkill';


export const subSkillRaritySectionBg: {[rarity in SubSkillRarity]: string} = {
  1: 'border border-transparent bg-slate-300 dark:bg-slate-800/90',
  2: 'border border-transparent bg-sky-400/30 dark:bg-sky-500/30',
  3: 'border border-transparent bg-amber-400/40 dark:bg-yellow-700/40',
};

export const subSkillRarityIconFilter: {[rarity in SubSkillRarity]: string} = {
  1: 'filter-subskill-slate-500',
  2: 'filter-subskill-sky-500',
  3: 'filter-subskill-yellow-500',
};

export const subSkillRarityDisabled = 'border border-slate-500 text-slate-500';
