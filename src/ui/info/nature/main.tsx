import React from 'react';

import groupBy from 'lodash/groupBy';

import {Flex} from '@/components/layout/flex/common';
import {natureData} from '@/data/nature';
import {natureEffectId} from '@/types/game/pokemon/nature';
import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {NatureInfoGroup} from '@/ui/info/nature/group';


export const NatureInfoPage = ({params}: DefaultPageProps) => {
  const {locale} = params;

  const groupedNatures = groupBy(natureData, ({buff}) => buff);

  return (
    <PublicPageLayout locale={locale}>
      <Flex direction="col" className="gap-2">
        <NatureInfoGroup buffEffectId={null} natures={groupedNatures['null']}/>
        {natureEffectId.map((buffEffectId) => (
          <NatureInfoGroup key={buffEffectId} buffEffectId={buffEffectId} natures={groupedNatures[buffEffectId]}/>
        ))}
      </Flex>
    </PublicPageLayout>
  );
};
