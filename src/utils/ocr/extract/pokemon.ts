import {pokemonSubSkillLevel} from '@/types/game/pokemon/subSkill';
import {OcrExtractedPokemonInfo, OcrTranslationsForPokemonInfoOfLocale} from '@/types/ocr/extracted/pokemon';
import {ocrExtractMulti, ocrExtractSingle, ocrPreprocessText} from '@/utils/ocr/extract/common';
import {OcrExtractCommonOpts} from '@/utils/ocr/extract/type';
import {isNotNullish} from '@/utils/type';


type OcrExtractPokemonInfoOpts = OcrExtractCommonOpts & {
  translations: OcrTranslationsForPokemonInfoOfLocale,
};

export const ocrExtractPokemonInfo = ({translations, ...opts}: OcrExtractPokemonInfoOpts): OcrExtractedPokemonInfo => {
  const {ocrLocale} = opts;
  const text = ocrPreprocessText(opts);

  return {
    pokemonId: ocrExtractSingle({
      text,
      translations: translations.name,
      offset: 0,
    })?.id ?? null,
    nature: ocrExtractSingle({
      text,
      translations: translations.nature,
      offset: 0,
    })?.id ?? null,
    subSkills: ocrExtractMulti({
      text,
      translations: translations.subSkill,
      offset: ocrLocale === 'zh' ? 1 : 0,
    })
      .sort((a, b) => a.index - b.index)
      .map(({id}, idx) => {
        const level = pokemonSubSkillLevel[idx];
        if (!level) {
          return null;
        }

        return {id, level};
      })
      .filter(isNotNullish),
  };
};
