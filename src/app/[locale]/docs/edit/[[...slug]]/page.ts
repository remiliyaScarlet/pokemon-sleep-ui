import {getDocBySlug} from '@/controller/docs';
import {GenerateMetadata} from '@/types/next/metadata';
import {DocsPageParams} from '@/types/next/page/docs';
import {DocsEdit} from '@/ui/docs/edit/main';
import {generatePageMeta} from '@/utils/meta';


export const generateMetadata: GenerateMetadata<DocsPageParams> = async ({params}) => {
  const doc = await getDocBySlug(params);

  if (!doc) {
    return generatePageMeta({key: 'NotFound.Title'})({params});
  }

  return generatePageMeta({key: 'Docs.New.Title', values: {name: doc.title}})({params});
};

export default DocsEdit;
