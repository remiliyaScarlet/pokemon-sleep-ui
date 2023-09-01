import React from 'react';

import ChevronDoubleUpIcon from '@heroicons/react/24/solid/ChevronDoubleUpIcon';

import {Flex} from '@/components/layout/flex';
import {Grid} from '@/components/layout/grid';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {MainSkillEffectUI} from '@/components/shared/pokemon/mainSkill/effect';
import {MainSkillData} from '@/types/game/pokemon/mainSkill';


type Props = {
  data: MainSkillData,
};

export const MainSkillValueTable = ({data}: Props) => {
  const {effects} = data;

  return (
    <Flex direction="col">
      <Grid center className="grid-cols-2 gap-1 self-center rounded-lg text-lg md:w-60">
        <div>
          <PokemonDataIcon src="/images/generic/lv.png" alt="Lv" invert/>
        </div>
        <div className="h-6 w-6">
          <ChevronDoubleUpIcon/>
        </div>
        {effects.map((effect) => (
          <React.Fragment key={effect.level}>
            <div>
              {effect.level}
            </div>
            <div>
              <MainSkillEffectUI effect={effect}/>
            </div>
          </React.Fragment>
        ))}
      </Grid>
    </Flex>
  );
};
