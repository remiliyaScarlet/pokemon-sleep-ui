import {getTranslator} from 'next-intl/server';

import {GenerateMetadata, GenerateMetadataParams} from '@/types/next/metadata';
import {SkillPage} from '@/ui/skill/page/main';
import {generatePageMeta} from '@/utils/meta';


export type SkillPageParams = GenerateMetadataParams & {
  id: string
};

export const generateMetadata: GenerateMetadata<SkillPageParams> = async ({params}) => {
  const {id, locale} = params;
  const t = await getTranslator(locale, 'Game.MainSkill.Name');

  return generatePageMeta({key: 'Skill.Page.Title', values: {name: t(id)}})({params});
};

export default SkillPage;
