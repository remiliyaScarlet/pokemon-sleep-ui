import {PokemonSubSkill} from '@/types/game/pokemon/subSkill';
import {OcrExtractPokemonSubSkill} from '@/types/ocr/extracted/pokemon';


export const toPokemonSubSkill = (subSkills: OcrExtractPokemonSubSkill[]): PokemonSubSkill => (
  Object.fromEntries(subSkills.map(({id, level}) => [level, id]))
);
