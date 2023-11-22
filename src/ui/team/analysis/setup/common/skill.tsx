import React from 'react';

import {MainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/main';
import {ProducingRateUI} from '@/components/shared/production/rate/main';
import {MainSkillId} from '@/types/game/pokemon/mainSkill';
import {ProducingRate} from '@/types/game/producing/rate';


type Props = {
  id: MainSkillId,
  rate: ProducingRate,
};

export const TeamAnalysisSkillRate = ({id, rate}: Props) => {
  return (
    <ProducingRateUI
      rate={rate}
      getIcon={(dimension) => <MainSkillIcon id={id} dimension={dimension}/>}
    />
  );
};
