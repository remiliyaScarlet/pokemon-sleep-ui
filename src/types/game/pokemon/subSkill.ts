export type SubSkillId = number;

export type SubSkillRarity = 1 | 2 | 3;

// This corresponds to whatever in the scraper
export type SubSkillBonus = {
  exp?: number, // 14
  helper?: number, // 5
  stamina?: number, // 1.12
  shard?: number, // 6
  research?: number, // 6
  frequency?: number, // 7 / 14 / 21?
  berryCount?: number, // 1 / 2 / 3
  inventory?: number, // 6 / 12 / 18
  skillLevel?: number, // 1 / 2
  ingredientProbability?: number, // 18 / 36 / 54?
  mainSkillProbability?: number, // 18 / 36 / 54?
};

export type SubSkillBonusCategory = keyof Required<SubSkillBonus>;

export type GroupedSubSkillBonus = {[category in SubSkillBonusCategory]?: number[]};

export type SubSkillData = {
  id: SubSkillId,
  rarity: SubSkillRarity | null,
  next: SubSkillId | null,
  bonus: SubSkillBonus,
};

export type SubSkillMap = {[id in SubSkillId]?: SubSkillData};

export const pokemonSubSkillLevel = [
  10,
  25,
  50,
  75,
  100,
] as const;

export type PokemonSubSkillLevel = typeof pokemonSubSkillLevel[number];

export type PokemonSubSkill = {[level in PokemonSubSkillLevel]?: SubSkillId};

export const friendshipLevelsOfGoldLock = [
  0,
  10,
  45,
  100,
] as const;

export type FriendshipLevelOfGoldLock = typeof friendshipLevelsOfGoldLock[number];
