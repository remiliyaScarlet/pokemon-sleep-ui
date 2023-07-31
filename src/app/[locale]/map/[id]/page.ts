import {getTranslator} from 'next-intl/server';

import {GenerateMetadata, GenerateMetadataParams} from '@/types/next/metadata';
import {MapPage} from '@/ui/map/page/main';
import {generatePageMeta} from '@/utils/meta';


export type MapPageParams = GenerateMetadataParams & {
  id: string
};

export const generateMetadata: GenerateMetadata<MapPageParams> = async ({params}) => {
  const {id, locale} = params;
  const t = await getTranslator(locale, 'Game.Field');

  return generatePageMeta({key: 'Map.Page.Title', values: {name: t(id)}})({params});
};

export default MapPage;
