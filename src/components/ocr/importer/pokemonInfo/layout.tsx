import React from 'react';

import {Flex} from '@/components/layout/flex';
import {OcrImporterControls} from '@/components/ocr/importer/controls/main';
import {OcrPokemonInfoImportState} from '@/components/ocr/importer/pokemonInfo/type';
import {toPokemonSubSkill} from '@/components/ocr/importer/pokemonInfo/utils';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {OcrExtractedPokemonInfo} from '@/types/ocr/extracted/pokemon';


type Props = {
  data: OcrExtractedPokemonInfo,
  image: string | null,
  subSkillMap: SubSkillMap,
  onCompleteImport: (state: OcrPokemonInfoImportState) => void,
};

export const OcrPokemonInfoImportLayout = ({data, image, subSkillMap, onCompleteImport}: Props) => {
  const [state, setState] = React.useState<OcrPokemonInfoImportState>({
    subSkill: toPokemonSubSkill(data.subSkills),
    nature: data.nature,
  });

  return (
    <Flex direction="col" className="gap-1.5 p-10">
      <Flex direction="col" className="gap-1.5 md:flex-row">
        <Flex direction="col" className="h-8">
          <PokemonSubSkillSelector
            subSkill={state.subSkill}
            setSubSkill={(subSkill) => setState((original) => ({
              ...original,
              subSkill,
            }))}
            subSkillMap={subSkillMap}
          />
        </Flex>
        <Flex direction="col" className="h-8">
          <PokemonNatureSelector
            nature={state.nature}
            setNature={(nature) => setState((original) => ({
              ...original,
              nature,
            }))}
          />
        </Flex>
      </Flex>
      <OcrImporterControls
        image={image}
        onConfirm={() => onCompleteImport(state)}
      />
    </Flex>
  );
};
