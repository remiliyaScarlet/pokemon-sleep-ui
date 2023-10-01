import React from 'react';

import {OcrPokemonInfoImportLayout} from '@/components/ocr/importer/pokemonInfo/layout';
import {OcrPokemonInfoImportState} from '@/components/ocr/importer/pokemonInfo/type';
import {OcrPopup} from '@/components/ocr/popup';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {OcrTranslationsForPokemonInfo} from '@/types/ocr/extracted/pokemon';
import {ocrExtractPokemonInfo} from '@/utils/ocr/extract/pokemon';


type Props = {
  ocrTranslations: OcrTranslationsForPokemonInfo,
  onCompleteImport: (state: OcrPokemonInfoImportState) => void,
  subSkillMap: SubSkillMap,
  noFullWidth?: boolean,
};

export const OcrPokemonInfoImporter = ({
  ocrTranslations,
  onCompleteImport,
  subSkillMap,
  noFullWidth,
}: Props) => {
  const [showOcr, setShowOcr] = React.useState(false);

  return (
    <OcrPopup
      show={showOcr}
      setShow={setShowOcr}
      buttonText="OCR!"
      textToData={(text, locale) => ocrExtractPokemonInfo({
        ocrLocale: locale,
        text,
        translations: ocrTranslations[locale],
      })}
      renderData={(data, image) => (
        <OcrPokemonInfoImportLayout
          data={data}
          image={image}
          subSkillMap={subSkillMap}
          onCompleteImport={(state) => {
            onCompleteImport(state);
            setShowOcr(false);
          }}
        />
      )}
      noFullWidth={noFullWidth}
    />
  );
};
