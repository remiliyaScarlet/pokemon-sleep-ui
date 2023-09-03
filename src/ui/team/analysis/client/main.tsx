'use client';
import React from 'react';

import {UserDataLazyLoad} from '@/components/shared/userData/lazyLoad';
import {TeamAnalysisLoadedClient} from '@/ui/team/analysis/client/loaded';
import {TeamAnalysisServerDataProps} from '@/ui/team/analysis/type';


export const TeamAnalysisClient = (props: TeamAnalysisServerDataProps) => {
  return (
    <UserDataLazyLoad
      type="teamAnalysisSetup"
      loadingText="Team"
      content={(data, session) => (
        <TeamAnalysisLoadedClient
          preloadedSetup={data?.teamAnalysisSetup}
          settings={session.data?.user.preloaded.settings}
          {...props}
        />
      )}
    />
  );
};
