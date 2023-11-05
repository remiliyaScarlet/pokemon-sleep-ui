import {GenerateMetadata} from '@/types/next/metadata';
import {DocsPageParams} from '@/types/next/page/docs';
import {DocsIndex} from '@/ui/docs/index/main';
import {generatePageMeta} from '@/utils/meta';


export const generateMetadata: GenerateMetadata<DocsPageParams> = async ({params}) => {
  return generatePageMeta({key: 'Docs.Index.Title'})({params});
};

export default DocsIndex;
