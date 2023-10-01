import {OcrExtractCommonOpts, OcrExtractOpts, OcrExtractSingleResult} from '@/utils/ocr/extract/type';


export const ocrExtractSingle = <TId>({
  text,
  translations,
}: OcrExtractOpts<TId>): OcrExtractSingleResult<TId> | null => {
  for (const [name, id] of Object.entries(translations)) {
    const index = text.indexOf(name);

    if (index < 0) {
      continue;
    }

    return {id, index};
  }

  return null;
};

export const ocrExtractMulti = <TId>({
  text,
  translations,
}: OcrExtractOpts<TId>): OcrExtractSingleResult<TId>[] => {
  const results: OcrExtractSingleResult<TId>[] = [];

  for (const [name, id] of Object.entries(translations)) {
    const index = text.indexOf(name);

    if (index < 0) {
      continue;
    }

    results.push({id, index});
  }

  return results;
};

export const ocrPreprocessText = ({ocrLocale, text}: OcrExtractCommonOpts) => {
  if (ocrLocale === 'ja') {
    return text.replaceAll(' ', '');
  }

  return text;
};
