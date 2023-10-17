import {
  PokemonSubSkill,
  PokemonSubSkillLevel,
  pokemonSubSkillLevel,
  SubSkillData,
  SubSkillId,
} from '@/types/game/pokemon/subSkill';
import {combineIterator} from '@/utils/compute';


type GeneratePossiblePokemonSubSkillOpts = {
  level: number,
  subSkillData: SubSkillData[],
};

export function* generatePossiblePokemonSubSkills({
  level,
  subSkillData,
}: GeneratePossiblePokemonSubSkillOpts): Generator<PokemonSubSkill> {
  const validLevels = pokemonSubSkillLevel
    .filter((subSkillLevel) => level >= subSkillLevel);

  if (!validLevels.length) {
    yield {};
    return;
  }

  for (const combination of combineIterator(subSkillData, validLevels.length)) {
    yield Object.fromEntries(
      combination.map((data, idx) => [
        validLevels[idx] satisfies PokemonSubSkillLevel,
        data.id satisfies SubSkillId,
      ]),
    );
  }
}
