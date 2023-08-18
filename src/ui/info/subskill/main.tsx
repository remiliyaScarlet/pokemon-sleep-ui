import React from 'react';

import {Flex} from '@/components/layout/flex';
import {getAllSubSkillData} from '@/controller/subSkill';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {SubSkillInfoSingle} from '@/ui/info/subskill/single';


export const SubSkillInfo = () => {
  const subSkills = React.use(getAllSubSkillData());

  const sortedSubSkills = subSkills.sort((a, b) => {
    const bonusA = Object.entries(a.bonus).at(0);
    const bonusB = Object.entries(b.bonus).at(0);

    if (!bonusA || !bonusB) {
      return 0;
    }

    const bonusProperty = bonusA[0].localeCompare(bonusB[0]);

    if (bonusProperty !== 0) {
      return bonusProperty;
    }

    return bonusB[1] - bonusA[1];
  });

  return (
    <PublicPageLayout>
      <Flex direction="row" wrap className="gap-2">
        {sortedSubSkills.map((subSkill) => (
          <SubSkillInfoSingle key={subSkill.id} data={subSkill}/>
        ))}
      </Flex>
    </PublicPageLayout>
  );
};
