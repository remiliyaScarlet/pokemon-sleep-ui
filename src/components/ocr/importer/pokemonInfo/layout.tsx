import React from 'react';

import {Flex} from '@/components/layout/flex';
import {OcrImporterControls} from '@/components/ocr/importer/controls/main';
import {
  OcrPokemonInfoImportCommonProps,
  OcrPokemonInfoImportState,
} from '@/components/ocr/importer/pokemonInfo/type';
import {toPokemonSubSkill} from '@/components/ocr/importer/pokemonInfo/utils';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {OcrExtractedPokemonInfo} from '@/types/ocr/extracted/pokemon';


type Props = OcrPokemonInfoImportCommonProps & {
  data: OcrExtractedPokemonInfo,
  image: string | null,
};

export const OcrPokemonInfoImportLayout = ({subSkillMap, onCompleteImport, data, image, pokemonIdOverride}: Props) => {
  const [state, setState] = React.useState<OcrPokemonInfoImportState>({
    subSkill: toPokemonSubSkill(data.subSkills),
    ...data,
  });
  const {subSkill, nature} = state;
  const pokemonId = state.pokemonId ?? pokemonIdOverride ?? null;

  return (
    <Flex direction="col" className="gap-1.5 p-10">
      <div className="relative h-20 w-20 self-center">
        <PokemonImage pokemonId={pokemonId} image="icon" isShiny={false}/>
      </div>
      <Flex direction="col" className="gap-1.5 md:flex-row">
        <Flex direction="col" className="h-8">
          <PokemonSubSkillSelector
            subSkill={subSkill}
            setSubSkill={(subSkill) => setState((original) => ({
              ...original,
              subSkill,
            }))}
            subSkillMap={subSkillMap}
          />
        </Flex>
        <Flex direction="col" className="h-8">
          <PokemonNatureSelector
            nature={nature}
            setNature={(nature) => setState((original) => ({
              ...original,
              nature,
            }))}
          />
        </Flex>
      </Flex>
      <OcrImporterControls
        image={image}
        onConfirm={() => pokemonId && onCompleteImport(pokemonId, state)}
        disableConfirm={!pokemonId}
      />
    </Flex>
  );
};
