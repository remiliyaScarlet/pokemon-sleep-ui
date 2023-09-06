import React from 'react';

import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Grid} from '@/components/layout/grid';
import {TeamAnalysisCompAddition} from '@/ui/team/analysis/comp/addition';
import {TeamAnalysisCompSelection} from '@/ui/team/analysis/comp/selection';
import {TeamAnalysisCompSelectorProps} from '@/ui/team/analysis/comp/type';


export const TeamAnalysisCompSelector = (props: TeamAnalysisCompSelectorProps) => {
  const {setup, onPicked, onAdded} = props;
  const {teams} = setup;

  return (
    <Grid className="grid-cols-1 gap-1.5 md:grid-cols-2 lg:grid-cols-3">
      {Object.values(teams).map((team) => (
        <AnimatedCollapseQuick key={team.uuid} show appear>
          <TeamAnalysisCompSelection team={team} onClick={() => onPicked(team.uuid)} {...props}/>
        </AnimatedCollapseQuick>
      ))}
      <TeamAnalysisCompAddition onAdded={onAdded}/>
    </Grid>
  );
};
