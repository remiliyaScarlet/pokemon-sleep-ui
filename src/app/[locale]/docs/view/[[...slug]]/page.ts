import {getDocBySlug, getDocsMetadataList} from '@/controller/docs';
import {LocaleLayoutProps} from '@/types/next/layout';
import {GenerateMetadata} from '@/types/next/metadata';
import {DocsPageParams} from '@/types/next/page/docs';
import {GenerateStaticParamsFunc} from '@/types/next/static';
import {DocsView} from '@/ui/docs/view/main';
import {generatePageMeta} from '@/utils/meta';


export const generateStaticParams: GenerateStaticParamsFunc<DocsPageParams> = async ({params}: LocaleLayoutProps) => {
  const {locale} = params;

  return (await getDocsMetadataList(locale)).map(({path}) => ({slug: path.split('/')}));
};

export const generateMetadata: GenerateMetadata<DocsPageParams> = async ({params}) => {
  const doc = await getDocBySlug({...params, count: false});

  if (!doc) {
    return generatePageMeta({key: 'NotFound.Title'})({params});
  }

  return generatePageMeta({key: 'Docs.View.Title', values: {name: doc.title}})({params});
};

export default DocsView;
