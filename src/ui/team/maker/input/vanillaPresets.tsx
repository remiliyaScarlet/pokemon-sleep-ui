import React from 'react';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex/common';
import {PokemonLevelSliderRow} from '@/components/shared/pokemon/level/sliderRow';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {TeamMakerInputCommonProps} from '@/ui/team/maker/input/type';
import {TeamMakerInput} from '@/ui/team/maker/type/input';


export const TeamMakerInputVanillaPresets = ({
  subSkillMap,
  input,
  setInput,
}: TeamMakerInputCommonProps) => {
  const {
    source,
    vanillaPresets,
  } = input;
  const {
    level,
    subSkill,
    nature,
  } = vanillaPresets;

  return (
    <AnimatedCollapse show={source === 'vanilla'}>
      <Flex className="gap-1">
        <PokemonLevelSliderRow
          value={level}
          setValue={(level) => setInput(({vanillaPresets, ...original}) => ({
            ...original,
            vanillaPresets: {
              ...vanillaPresets,
              level,
            },
          } satisfies TeamMakerInput))}
        />
        <Flex className="gap-1 md:flex-row">
          <PokemonSubSkillSelector
            subSkill={subSkill}
            setSubSkill={(subSkill) => setInput(({vanillaPresets, ...original}) => ({
              ...original,
              vanillaPresets: {
                ...vanillaPresets,
                subSkill,
              },
            } satisfies TeamMakerInput))}
            subSkillMap={subSkillMap}
            classNameForHeight="h-8"
          />
          <PokemonNatureSelector
            nature={nature}
            setNature={(nature) => setInput(({vanillaPresets, ...original}) => ({
              ...original,
              vanillaPresets: {
                ...vanillaPresets,
                nature,
              },
            } satisfies TeamMakerInput))}
            classNameForHeight="h-8"
          />
        </Flex>
      </Flex>
    </AnimatedCollapse>
  );
};
