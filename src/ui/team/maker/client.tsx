'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {useUserSettings} from '@/hooks/userData/settings';
import {useTeamMaker} from '@/ui/team/maker/hook';
import {TeamMakerInputUI} from '@/ui/team/maker/input';
import {TeamMakerResults} from '@/ui/team/maker/result/main';
import {TeamMakerDataProps, TeamMakerInput} from '@/ui/team/maker/type';


export const TeamMakerClient = (props: TeamMakerDataProps) => {
  const {preloaded} = props;

  const {data} = useSession();
  const settings = useUserSettings({
    server: preloaded.settings,
    client: data?.user.preloaded.settings,
  });
  const [input, setInput] = React.useState<TeamMakerInput>({
    snorlaxFavorite: {},
    mealType: preloaded.cooking.mealType,
    recipeLevel: preloaded.cooking.recipeLevel,
    ingredientCount: preloaded.cooking.ingredientCount,
    target: preloaded.cooking.target,
    showInsufficientIngredients: true,
  });
  const {state, calculateTeam, resultsRef} = useTeamMaker();

  return (
    <Flex className="gap-1.5">
      <TeamMakerInputUI
        {...props}
        input={input}
        setInput={setInput}
        onRun={() => calculateTeam({...props, input, settings})}
      />
      <AdsUnit/>
      <LazyLoad loading={state.loading}>
        <TeamMakerResults
          ref={resultsRef}
          results={state.results}
          {...props}
        />
      </LazyLoad>
    </Flex>
  );
};
