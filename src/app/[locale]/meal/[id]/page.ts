import {getTranslator} from 'next-intl/server';

import {GenerateMetadata, GenerateMetadataParams} from '@/types/next/metadata';
import {MealPage} from '@/ui/meal/page/main';
import {generatePageMeta} from '@/utils/meta';


export type MealPageParams = GenerateMetadataParams & {
  id: string
};

export const generateMetadata: GenerateMetadata<MealPageParams> = async ({params}) => {
  const {id, locale} = params;
  const t = await getTranslator(locale, 'Game.Food');

  return generatePageMeta({key: 'Meal.Page.Title', values: {name: t(id)}})({params});
};

export default MealPage;
