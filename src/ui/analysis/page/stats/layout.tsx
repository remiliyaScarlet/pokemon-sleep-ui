import React from 'react';

import {Grid} from '@/components/layout/grid';


export const AnalysisStatsLayout = ({children}: React.PropsWithChildren) => {
  return (
    <Grid center className="relative grid-cols-2 gap-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {children}
    </Grid>
  );
};
