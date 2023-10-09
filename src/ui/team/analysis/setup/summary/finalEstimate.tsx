import React from 'react';

import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex/common';
import {EnergyIcon} from '@/components/shared/icon/energy';
import {durationOfDay} from '@/const/common';
import {ProducingRate} from '@/types/game/producing/rate';
import {TeamAnalysisSnorlaxRank} from '@/ui/team/analysis/setup/summary/rank';
import {TeamFinalEstimateInput} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {toProducingRateOfPeriod} from '@/utils/game/producing/convert';


type Props = Pick<TeamAnalysisDataProps, 'snorlaxRankData'> & {
  energyRate: ProducingRate,
};

export const TeamAnalysisFinalEstimate = ({energyRate, snorlaxRankData}: Props) => {
  const t = useTranslations('UI.InPage.Team');

  const [estimateInput, setEstimateInput] = React.useState<TeamFinalEstimateInput>(() => {
    const endsAt = new Date();

    endsAt.setDate(endsAt.getDate() + 7);

    return {
      currentEnergy: 0,
      endsAt: endsAt.toISOString().slice(0, 10),
    };
  });
  const {currentEnergy, endsAt} = estimateInput;
  const finalEnergy = (
    currentEnergy +
    (
      toProducingRateOfPeriod({rate: energyRate, period: 'daily'}).energy *
      (new Date(`${endsAt}T04:00`).getTime() - Date.now()) /
      (durationOfDay * 1000)
    )
  );
  const minDate = new Date(new Date().setDate(new Date().getDate() + 1));

  return (
    <Flex center className="gap-2">
      <Flex direction="row" center wrap className="gap-2">
        <Flex direction="row" center noFullWidth className="gap-1">
          <div className="h-6 w-6">
            <ClockIcon/>
          </div>
          <InputBox
            id="endsAt"
            type="date"
            min={minDate.toISOString().slice(0, 10)}
            className="text-center"
            value={endsAt}
            onChange={({target}) => setEstimateInput((original) => ({
              ...original,
              endsAt: target.value,
            }))}
          />
          <div>(04:00)</div>
        </Flex>
        <Flex direction="row" center noFullWidth className="gap-1">
          <EnergyIcon alt={t('CurrentEnergy')} dimension="h-6 w-6"/>
          <InputBox
            id="currentEnergy"
            type="number"
            min={0}
            className="w-20 text-center"
            value={currentEnergy.toString()}
            onChange={({target}) => setEstimateInput((original) => ({
              ...original,
              currentEnergy: Number(target.value),
            }))}
          />
        </Flex>
      </Flex>
      <TeamAnalysisSnorlaxRank energy={finalEnergy} snorlaxRankData={snorlaxRankData}/>
    </Flex>
  );
};
