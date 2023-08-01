import React from 'react';

import ChevronDoubleUpIcon from '@heroicons/react/24/solid/ChevronDoubleUpIcon';

import {EnergyAnalysisBonusSlider} from '@/ui/energy/analysis/result/bonus/base';
import {EnergyAnalysisBonusProps} from '@/ui/energy/analysis/result/bonus/type';


export const EnergyAnalysisOverallBonusSlider = ({bonus, setBonus}: EnergyAnalysisBonusProps) => {
  return (
    <EnergyAnalysisBonusSlider bonus={bonus} setBonus={setBonus} id="ingredient-bonus" min={0} max={150}>
      <div className="h-6 w-6">
        <ChevronDoubleUpIcon/>
      </div>
    </EnergyAnalysisBonusSlider>
  );
};
