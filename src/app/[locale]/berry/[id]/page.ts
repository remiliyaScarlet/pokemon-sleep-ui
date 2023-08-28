import {getAllBerryData} from '@/controller/berry';
import {GenerateMetadata, GenerateMetadataParams} from '@/types/next/metadata';
import {BerryPage} from '@/ui/berry/page/main';
import {getI18nTranslator} from '@/utils/i18n';
import {generatePageMeta} from '@/utils/meta';


export const generateStaticParams = async () => {
  return Object.values(await getAllBerryData()).map(({id}) => id);
};

export type BerryPageParams = GenerateMetadataParams & {
  id: string
};

export const generateMetadata: GenerateMetadata<BerryPageParams> = async ({params}) => {
  const {id, locale} = params;
  const t = await getI18nTranslator({locale, namespace: 'Game.Berry'});

  return generatePageMeta({key: 'Berry.Page.Title', values: {name: t(id)}})({params});
};

export default BerryPage;
