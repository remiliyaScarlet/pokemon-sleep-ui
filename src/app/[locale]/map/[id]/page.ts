import {getAllMapMeta} from '@/controller/mapMeta';
import {GenerateMetadata, GenerateMetadataParams} from '@/types/next/metadata';
import {GenerateStaticParamsFunc} from '@/types/next/static';
import {MapPage} from '@/ui/sleepStyle/map/page/main';
import {getI18nTranslator} from '@/utils/i18n';
import {generatePageMeta} from '@/utils/meta';
import {isNotNullish} from '@/utils/type';


export const generateStaticParams: GenerateStaticParamsFunc<MapPageParams> = async () => {
  return Object.values(await getAllMapMeta())
    .filter(isNotNullish)
    .map(({mapId}) => ({id: mapId.toString()}));
};

export type MapPageParams = GenerateMetadataParams & {
  id: string,
};

export const generateMetadata: GenerateMetadata<MapPageParams> = async ({params}) => {
  const {id, locale} = params;
  const t = await getI18nTranslator({locale, namespace: 'Game.Field'});

  return generatePageMeta({key: 'SleepStyle.Map.Page.Title', values: {name: t(id)}})({params});
};

export default MapPage;
