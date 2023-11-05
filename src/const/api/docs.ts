import {createGetRequester} from '@/handler/common/request/get';
import {DocsMetadata} from '@/types/mongo/docs';


export const getDocsRelatedFromApi = createGetRequester<DocsMetadata[]>({
  apiPath: '/api/docs/related',
});
