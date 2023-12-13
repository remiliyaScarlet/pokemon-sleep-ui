import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {teamMakerMaxResultCount} from '@/ui/team/maker/const';
import {TeamMakerResultCompUi} from '@/ui/team/maker/result/comp';
import {TeamMakerResultCommonProps} from '@/ui/team/maker/result/type';
import {TeamMakerDataProps, TeamMakerResult} from '@/ui/team/maker/type';


type Props = TeamMakerDataProps & Omit<TeamMakerResultCommonProps, 'result'> & {
  result: TeamMakerResult | null,
};

const TeamMakerResultsInternal = ({result, ...props}: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
  const compsToShow = result?.comps.slice(0, teamMakerMaxResultCount);

  if (!result || !compsToShow || !compsToShow.length) {
    return <UnavailableIcon dimension="h-32 w-32" className="self-center"/>;
  }

  return (
    <Flex ref={ref} className="gap-1.5">
      {compsToShow.map((comp, idx) => (
        <TeamMakerResultCompUi key={idx} comp={comp} result={result} {...props}/>
      ))}
    </Flex>
  );
};

export const TeamMakerResults = React.forwardRef(TeamMakerResultsInternal);
