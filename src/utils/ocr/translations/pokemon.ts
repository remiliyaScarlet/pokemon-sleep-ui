import {OcrTranslationsForPokemonInfo, OcrTranslationsForPokemonInfoOfLocale} from '@/types/ocr/extracted/pokemon';
import {ocrLocale} from '@/types/ocr/locale';
import {getMessagesOfLocales} from '@/utils/i18n';
import {kvSwapValueAsInt} from '@/utils/object/swap/valueAsInt';


export const getOcrTranslationsForPokemonInfo = async (): Promise<OcrTranslationsForPokemonInfo> => {
  const messages = await getMessagesOfLocales([...ocrLocale]);

  return Object.fromEntries(await Promise.all(ocrLocale.map((locale) => [
    locale,
    {
      name: kvSwapValueAsInt({
        source: messages[locale].Game.PokemonName,
      }),
      subSkill: kvSwapValueAsInt({
        source: messages[locale].Game.SubSkill.Name,
      }),
      nature: kvSwapValueAsInt({
        source: messages[locale].Game.Nature,
      }),
    } satisfies OcrTranslationsForPokemonInfoOfLocale,
  ])));
};
