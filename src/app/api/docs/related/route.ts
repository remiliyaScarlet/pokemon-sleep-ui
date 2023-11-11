import {getRelatedDocMeta} from '@/controller/docs';
import {createRouteHandler} from '@/handler/common/handler';
import {DocsMetadata} from '@/types/mongo/docs';


export const GET = createRouteHandler<DocsMetadata[]>(async ({searchParams}) => {
  const path = searchParams.get('path');
  const locale = searchParams.get('locale');

  if (!path || !locale) {
    return [];
  }

  return getRelatedDocMeta({path, locale});
});
