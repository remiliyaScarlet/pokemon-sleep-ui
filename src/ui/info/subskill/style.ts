import {SubSkillRarity} from '@/types/game/pokemon/subskill';


export const raritySection: {[rarity in SubSkillRarity]: string} = {
  1: 'bg-slate-300 dark:bg-slate-800/90',
  2: 'bg-sky-300 dark:bg-sky-700/30',
  3: 'bg-yellow-300 dark:bg-yellow-700/40',
};

export const raritySectionUnreleased = 'border border-slate-500 text-slate-500';
