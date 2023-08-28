import {GenerateMetadata, GenerateMetadataParams} from '@/types/next/metadata';
import {MealPage} from '@/ui/meal/page/main';
import {getI18nTranslator} from '@/utils/i18n';
import {generatePageMeta} from '@/utils/meta';


export type MealPageParams = GenerateMetadataParams & {
  id: string
};

export const generateMetadata: GenerateMetadata<MealPageParams> = async ({params}) => {
  const {id, locale} = params;
  const t = await getI18nTranslator({locale, namespace: 'Game.Food'});

  return generatePageMeta({key: 'Meal.Page.Title', values: {name: t(id)}})({params});
};

export default MealPage;
