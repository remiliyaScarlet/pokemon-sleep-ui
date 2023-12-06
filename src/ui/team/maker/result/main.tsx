import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
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
  const resultsToShow = results.slice(0, teamMakerMaxResultCount);

  if (!resultsToShow.length) {
    return <UnavailableIcon dimension="h-32 w-32" className="self-center"/>;
  }

  return (
    <Flex ref={ref} className="gap-1.5">
      {resultsToShow.map((result, idx) => (
        <TeamMakerResultComp key={idx} result={result} {...props}/>
      ))}
    </Flex>
  );
};

export const TeamMakerResults = React.forwardRef(TeamMakerResultsInternal);
