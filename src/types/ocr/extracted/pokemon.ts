import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkillLevel, SubSkillId} from '@/types/game/pokemon/subSkill';
import {OcrTranslationOfLocale, OcrTranslationOfLocales} from '@/types/ocr/translation';


export type OcrTranslationsForPokemonInfoOfLocale = {
  subSkill: OcrTranslationOfLocale<SubSkillId>,
  nature: OcrTranslationOfLocale<NatureId>,
};

export type OcrTranslationsForPokemonInfo = OcrTranslationOfLocales<OcrTranslationsForPokemonInfoOfLocale>;

export type OcrExtractPokemonSubSkill = {id: SubSkillId, level: PokemonSubSkillLevel};

export type OcrExtractedPokemonInfo = {
  subSkills: OcrExtractPokemonSubSkill[],
  nature: NatureId | null,
};
