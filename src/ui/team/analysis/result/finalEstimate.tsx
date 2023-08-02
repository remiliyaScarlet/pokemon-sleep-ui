import React from 'react';

import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {ProductionRate} from '@/types/game/pokemon';
import {TeamAnalysisSnorlaxRank} from '@/ui/team/analysis/result/rank';
import {TeamFinalEstimateInput} from '@/ui/team/analysis/result/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';


type Props = Pick<TeamAnalysisDataProps, 'snorlaxRankData'> & {
  energyRate: ProductionRate,
};

export const TeamFinalEstimate = ({energyRate, snorlaxRankData}: Props) => {
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
  const finalEnergy = currentEnergy + energyRate.daily * (new Date(endsAt).getTime() - Date.now()) / 86400000;

  return (
    <Flex direction="col" center className="gap-2">
      <Flex direction="row" className="gap-2">
        <Flex direction="row" center className="gap-1">
          <div className="h-6 w-6">
            <ClockIcon/>
          </div>
          <InputBox
            id="endsAt"
            type="date"
            value={endsAt}
            onChange={({target}) => setEstimateInput((original) => ({
              ...original,
              endsAt: target.value,
            }))}
          />
        </Flex>
        <Flex direction="row" center className="gap-1">
          <div className="relative h-6 w-6">
            <NextImage src="/images/generic/energy_white.png" alt={t('CurrentEnergy')} sizes={imageIconSizes}/>
          </div>
          <InputBox
            id="currentEnergy"
            type="number"
            min={0}
            className="w-24 text-center"
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
