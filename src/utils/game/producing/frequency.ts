import {NatureId} from '@/types/game/pokemon/nature';
import {SubSkillBonus} from '@/types/game/pokemon/subskill';
import {PokemonInfo} from '@/types/game/pokemon';
import {getNatureMultiplier} from '@/utils/game/nature';
import {defaultLevel} from '@/utils/game/producing/const';


export type GetBaseFrequencyOpts = {
  level: number,
  frequency: PokemonInfo['stats']['frequency'],
  natureId: NatureId | null,
  subSkillBonusRate: number,
  helperCount: number,
};

export const getBaseFrequency = ({
  level,
  frequency,
  natureId,
  subSkillBonusRate,
  helperCount,
}: GetBaseFrequencyOpts) => {
  const base = frequency * getNatureMultiplier({id: natureId, effect: 'frequencyOfBase'});

  const levelBonus = base * ((level ?? defaultLevel) - 1) * 0.002;
  const subSkillBonus = base * subSkillBonusRate;
  // 0.95 is the parameter on the helper sub-skill
  const helperBonus = base * helperCount * 0.95 * 0.05;

  return base - levelBonus - subSkillBonus - helperBonus;
};

export type GetFrequencyFromPokemonOpts = Pick<GetBaseFrequencyOpts, 'helperCount' | 'natureId'> & {
  level: number,
  subSkillBonus: SubSkillBonus,
  pokemon: PokemonInfo,
};

export const getFrequencyFromPokemon = ({
  level,
  subSkillBonus,
  pokemon,
  helperCount,
  natureId,
}: GetFrequencyFromPokemonOpts): number => {
  const {stats} = pokemon;

  return getBaseFrequency({
    level,
    frequency: stats.frequency,
    subSkillBonusRate: (subSkillBonus?.frequency ?? 0) / 100,
    helperCount,
    natureId,
  });
};
