import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Grid} from '@/components/layout/grid';
import {getAllMainSkillData} from '@/controller/mainSkill';
import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {MainSkillLink} from '@/ui/mainskill/index/link';


export const MainSkillIndex = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    mainSkills,
  ] = await Promise.all([
    getAllMainSkillData(),
  ]);

  return (
    <PublicPageLayout locale={locale}>
      <AdsUnit/>
      <Grid className="grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mainSkills.map((data) => (
          <MainSkillLink key={data.id} data={data}/>
        ))}
      </Grid>
    </PublicPageLayout>
  );
};
