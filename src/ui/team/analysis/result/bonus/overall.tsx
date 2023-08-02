import React from 'react';

import ChevronDoubleUpIcon from '@heroicons/react/24/solid/ChevronDoubleUpIcon';

import {TeamAnalysisBonusSlider} from '@/ui/team/analysis/result/bonus/base';
import {TeamAnalysisBonusProps} from '@/ui/team/analysis/result/bonus/type';


export const TeamAnalysisOverallBonusSlider = ({bonus, setBonus}: TeamAnalysisBonusProps) => {
  return (
    <TeamAnalysisBonusSlider bonus={bonus} setBonus={setBonus} id="ingredient-bonus" min={0} max={150}>
      <div className="h-6 w-6">
        <ChevronDoubleUpIcon/>
      </div>
    </TeamAnalysisBonusSlider>
  );
};
