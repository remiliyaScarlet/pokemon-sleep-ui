import {pokemonSubSkillLevel} from '@/types/game/pokemon/subSkill';
import {OcrExtractedPokemonInfo, OcrTranslationsForPokemonInfoOfLocale} from '@/types/ocr/extracted/pokemon';
import {OcrExtractCommonOpts} from '@/utils/ocr/extract/type';
import {isNotNullish} from '@/utils/type';


type OcrExtractPokemonInfoOpts = OcrExtractCommonOpts & {
  text: string,
  translations: OcrTranslationsForPokemonInfoOfLocale,
};

export const ocrExtractPokemonInfo = ({text, translations}: OcrExtractPokemonInfoOpts): OcrExtractedPokemonInfo => {
  let nature = null;
  for (const [name, id] of Object.entries(translations.nature)) {
    const index = text.indexOf(name);

    if (index < 0) {
      continue;
    }

    nature = id;
    break;
  }

  return {
    nature,
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
  };
};
