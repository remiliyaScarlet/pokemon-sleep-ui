import {getBerryDataMap} from '@/controller/berry';
import {GenerateMetadata, GenerateMetadataParams} from '@/types/next/metadata';
import {GenerateStaticParamsFunc} from '@/types/next/static';
import {BerryPage} from '@/ui/berry/page/main';
import {getI18nTranslator} from '@/utils/i18n';
import {generatePageMeta} from '@/utils/meta';


export const generateStaticParams: GenerateStaticParamsFunc<BerryPageParams> = async () => {
  return Object.values(await getBerryDataMap()).map(({id}) => ({id: id.toString()}));
};

export type BerryPageParams = GenerateMetadataParams & {
  id: string,
};

export const generateMetadata: GenerateMetadata<BerryPageParams> = async ({params}) => {
  const {id, locale} = params;
  const t = await getI18nTranslator({locale, namespace: 'Game.Berry'});

  return generatePageMeta({key: 'Berry.Page.Title', values: {name: t(id)}})({params});
};

export default BerryPage;
