import React from 'react';

import {Grid} from '@/components/layout/grid';


export const AnalysisStatsLayout = ({children}: React.PropsWithChildren) => {
  return (
    <Grid center className="relative grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {children}
    </Grid>
  );
};
