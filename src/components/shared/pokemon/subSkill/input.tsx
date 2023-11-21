import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/text';
import {FilterWithInclusionMap} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps, GetMultiSelectOnClickPropsOpts} from '@/components/input/filter/utils/props';
import {PokemonSubSkillText} from '@/components/shared/pokemon/subSkill/text';
import {SubSkillData, SubSkillId, SubSkillMap} from '@/types/game/pokemon/subSkill';


type Props<
  TFilter extends FilterWithInclusionMap<SubSkillId>,
> = GetMultiSelectOnClickPropsOpts<TFilter, SubSkillId> & {
  subSkillList: SubSkillData[],
  subSkillMap: SubSkillMap,
};

export const PokemonSubSkillFilter = <TFilter extends FilterWithInclusionMap<SubSkillId>>({
  subSkillList,
  subSkillMap,
  ...props
}: Props<TFilter>) => {
  const t = useTranslations('UI.InPage.Team');

  return (
    <FilterTextInput
      title={t('SubSkill')}
      idToButton={(id) => <PokemonSubSkillText subSkill={subSkillMap[id]}/>}
      ids={subSkillList.map(({id}) => id)}
      {...getMultiSelectOnClickProps(props)}
    />
  );
};
