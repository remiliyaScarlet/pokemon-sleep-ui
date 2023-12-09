'use client';
import React from 'react';

import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon';
import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Flex} from '@/components/layout/flex/common';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {useUserSettings} from '@/hooks/userData/settings';
import {teamMakerCompCountWarningThreshold} from '@/ui/team/maker/const';
import {useTeamMaker} from '@/ui/team/maker/hook/main';
import {TeamMakerInputUI} from '@/ui/team/maker/input';
import {TeamMakerResults} from '@/ui/team/maker/result/main';
import {TeamMakerDataProps, TeamMakerInput} from '@/ui/team/maker/type';
import {formatInt} from '@/utils/number/format';


export const TeamMakerClient = (props: TeamMakerDataProps) => {
  const {preloaded} = props;

  const t = useTranslations('UI.InPage.Team.Maker');
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
    memberCount: 5,
    previewLevel: null,
    previewFinalEvolution: false,
    target: preloaded.cooking.target,
    showInsufficientIngredients: true,
  });
  const {
    state,
    calculateTeam,
    resultsRef,
  } = useTeamMaker();

  const {combinations} = state;

  return (
    <Flex className="gap-1.5">
      <TeamMakerInputUI
        {...props}
        input={input}
        setInput={setInput}
        onRun={() => calculateTeam({...props, input, settings})}
      />
      <AdsUnit/>
      <AnimatedCollapseQuick show={!!combinations} className="flex flex-col gap-1">
        <Flex direction="row" className="justify-end gap-1.5">
          <UserGroupIcon className="h-6 w-6"/>
          <div>{formatInt(combinations)}</div>
        </Flex>
        <AnimatedCollapse show={!!combinations && combinations > teamMakerCompCountWarningThreshold} className={clsx(
          'button-warn-bg rounded-lg p-1.5',
        )}>
          {t('CompCountWarning')}
        </AnimatedCollapse>
      </AnimatedCollapseQuick>
      <LazyLoad loading={state.loading}>
        <TeamMakerResults
          ref={resultsRef}
          results={state.results}
          input={input}
          {...props}
        />
      </LazyLoad>
    </Flex>
  );
};
