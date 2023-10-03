import React from 'react';

import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import {v4} from 'uuid';

import {InputBox} from '@/components/input/box';
import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {TeamAnalysisSingleTeam} from '@/ui/team/analysis/type';
import {generateEmptyTeam, getTeamName} from '@/ui/team/analysis/utils';


type Props = {
  onAdded: (team: TeamAnalysisSingleTeam) => void,
};

export const TeamAnalysisCompAddition = ({onAdded}: React.PropsWithChildren<Props>) => {
  const [newTeam, setNewTeam] = React.useState(generateEmptyTeam(v4()));

  return (
    <Flex center direction="col" className="border-button-clickable rounded-lg border">
      <Flex direction="row" className="p-2">
        <InputBox
          type="text"
          value={newTeam.name}
          placeholder={getTeamName(newTeam)}
          className="w-full"
          onChange={({target}) => setNewTeam((original) => ({
            ...original,
            name: target.value,
          }))}
        />
      </Flex>
      <FlexButton noFullWidth={false} center className="button-clickable p-2" onClick={() => {
        onAdded(newTeam);
        setNewTeam(generateEmptyTeam(v4()));
      }}>
        <div className="h-12 w-12">
          <PlusCircleIcon/>
        </div>
      </FlexButton>
    </Flex>
  );
};
