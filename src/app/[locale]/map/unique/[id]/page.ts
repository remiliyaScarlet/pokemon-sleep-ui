import {getAllMapMeta} from '@/controller/mapMeta';
import {GenerateMetadata, GenerateMetadataParams} from '@/types/next/metadata';
import {GenerateStaticParamsFunc} from '@/types/next/static';
import {MapUniquePage} from '@/ui/sleepStyle/mapUnique/page';
import {getI18nTranslator} from '@/utils/i18n';
import {generatePageMeta} from '@/utils/meta';
import {isNotNullish} from '@/utils/type';


export const generateStaticParams: GenerateStaticParamsFunc<UniqueMapParams> = async () => {
  return Object.values(await getAllMapMeta())
    .filter(isNotNullish)
    .map(({mapId}) => ({id: mapId.toString()}));
};

export type UniqueMapParams = GenerateMetadataParams & {
  id: string,
};

export const generateMetadata: GenerateMetadata<UniqueMapParams> = async ({params}) => {
  const {id, locale} = params;
  const t = await getI18nTranslator({locale, namespace: 'Game.Field'});

  return generatePageMeta({key: 'SleepStyle.UniqueMap.Page.Title', values: {name: t(id)}})({params});
};

export default MapUniquePage;
