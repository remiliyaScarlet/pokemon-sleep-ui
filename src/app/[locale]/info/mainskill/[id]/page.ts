import {getAllMainSkillData} from '@/controller/mainSkill';
import {GenerateMetadata, GenerateMetadataParams} from '@/types/next/metadata';
import {MainSkillPage} from '@/ui/mainskill/page/main';
import {getI18nTranslator} from '@/utils/i18n';
import {generatePageMeta} from '@/utils/meta';
import {isNotNullish} from '@/utils/type';


export const generateStaticParams = async () => {
  return Object.values(await getAllMainSkillData()).filter(isNotNullish).map(({id}) => id);
};

export type MainSkillPageParams = GenerateMetadataParams & {
  id: string
};

export const generateMetadata: GenerateMetadata<MainSkillPageParams> = async ({params}) => {
  const {id, locale} = params;
  const t = await getI18nTranslator({locale, namespace: 'Game.MainSkill.Name'});

  return generatePageMeta({key: 'Info.MainSkill.Page.Title', values: {name: t(id)}})({params});
};

export default MainSkillPage;
