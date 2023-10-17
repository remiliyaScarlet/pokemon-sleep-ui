import {SubSkillData} from '@/types/game/pokemon/subSkill';


export const getSortedSubSkills = (subSkills: SubSkillData[]) => subSkills.sort((a, b) => {
  // Check if the rarity of both are available for sorting
  // > If not, use ID to sort
  if (!a.rarity || !b.rarity) {
    return a.id - b.id;
  }

  // Check if the rarity of both are the same
  const rarityDiff = b.rarity - a.rarity;
  if (rarityDiff) {
    return rarityDiff;
  }

  // Compare lexicographically based on the active bonus name
  const bonusA = Object.entries(a.bonus).at(0);
  const bonusB = Object.entries(b.bonus).at(0);

  if (!bonusA || !bonusB) {
    return 0;
  }

  const bonusProperty = bonusA[0].localeCompare(bonusB[0]);

  if (bonusProperty !== 0) {
    return bonusProperty;
  }

  return bonusB[1] - bonusA[1];
});
