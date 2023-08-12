import {getTranslator} from 'next-intl/server';

import {GenerateMetadata, GenerateMetadataParams} from '@/types/next/metadata';
import {BerryPage} from '@/ui/berry/page/main';
import {generatePageMeta} from '@/utils/meta';


export type BerryPageParams = GenerateMetadataParams & {
  id: string
};

export const generateMetadata: GenerateMetadata<BerryPageParams> = async ({params}) => {
  const {id, locale} = params;
  const t = await getTranslator(locale, 'Game.Berry');

  return generatePageMeta({key: 'Berry.Page.Title', values: {name: t(id)}})({params});
};

export default BerryPage;
