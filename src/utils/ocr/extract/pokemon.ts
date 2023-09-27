import {pokemonSubSkillLevel} from '@/types/game/pokemon/subSkill';
import {OcrExtractedPokemonInfo, OcrTranslationsForPokemonInfoOfLocale} from '@/types/ocr/extracted/pokemon';
import {ocrExtractSingle} from '@/utils/ocr/extract/common';
import {OcrExtractCommonOpts} from '@/utils/ocr/extract/type';
import {isNotNullish} from '@/utils/type';


type OcrExtractPokemonInfoOpts = OcrExtractCommonOpts & {
  text: string,
  translations: OcrTranslationsForPokemonInfoOfLocale,
};

export const ocrExtractPokemonInfo = ({text, translations}: OcrExtractPokemonInfoOpts): OcrExtractedPokemonInfo => ({
  pokemonId: ocrExtractSingle({text, translations: translations.name}),
  nature: ocrExtractSingle({text, translations: translations.nature}),
  subSkills: Object.entries(translations.subSkill)
    .map(([name, id]) => {
      const index = text.indexOf(name);

      if (index < 0) {
        return null;
      }

      return {id, index};
    })
    .filter(isNotNullish)
    .sort((a, b) => a.index - b.index)
    .map(({id}, idx) => {
      const level = pokemonSubSkillLevel[idx];
      if (!level) {
        return null;
      }

      return {id, level};
    })
    .filter(isNotNullish),
});
