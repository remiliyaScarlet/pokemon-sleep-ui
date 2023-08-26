import {PokemonInfo} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/pokemon/nature';
import {SubSkillBonus} from '@/types/game/pokemon/subskill';
import {getNatureMultiplier} from '@/utils/game/nature';


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
  frequency *= (1 - (level - 1) * 0.002);
  frequency *= getNatureMultiplier({id: natureId, effect: 'frequencyOfBase'});
  frequency *= (1 - subSkillBonusRate);
  frequency *= 0.95 ** helperCount;

  return frequency;
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
