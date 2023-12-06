import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {teamMakerMaxResultCount} from '@/ui/team/maker/const';
import {TeamMakerResultComp} from '@/ui/team/maker/result/comp';
import {TeamMakerDataProps, TeamMakerResult} from '@/ui/team/maker/type';


type Props = TeamMakerDataProps & {
  results: TeamMakerResult[],
};

const TeamMakerResultsInternal = ({
  results,
  ...props
}: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <Flex ref={ref} className="gap-1.5">
      {results
        .slice(0, teamMakerMaxResultCount)
        .map((result, idx) => (
          <TeamMakerResultComp key={idx} result={result} {...props}/>
        ))}
    </Flex>
  );
};

export const TeamMakerResults = React.forwardRef(TeamMakerResultsInternal);
