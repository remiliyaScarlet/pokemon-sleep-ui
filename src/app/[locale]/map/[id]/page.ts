import {GenerateMetadata, GenerateMetadataParams} from '@/types/next/metadata';
import {MapPage} from '@/ui/map/page/main';
import {getI18nTranslator} from '@/utils/i18n';
import {generatePageMeta} from '@/utils/meta';


export type MapPageParams = GenerateMetadataParams & {
  id: string
};

export const generateMetadata: GenerateMetadata<MapPageParams> = async ({params}) => {
  const {id, locale} = params;
  const t = await getI18nTranslator({locale, namespace: 'Game.Field'});

  return generatePageMeta({key: 'Map.Page.Title', values: {name: t(id)}})({params});
};

export default MapPage;
