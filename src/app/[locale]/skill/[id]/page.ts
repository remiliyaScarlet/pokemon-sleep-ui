import {GenerateMetadata, GenerateMetadataParams} from '@/types/next/metadata';
import {SkillPage} from '@/ui/skill/page/main';
import {getI18nTranslator} from '@/utils/i18n';
import {generatePageMeta} from '@/utils/meta';


export type SkillPageParams = GenerateMetadataParams & {
  id: string
};

export const generateMetadata: GenerateMetadata<SkillPageParams> = async ({params}) => {
  const {id, locale} = params;
  const t = await getI18nTranslator({locale, namespace: 'Game.MainSkill.Name'});

  return generatePageMeta({key: 'Skill.Page.Title', values: {name: t(id)}})({params});
};

export default SkillPage;
