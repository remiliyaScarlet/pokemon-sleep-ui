import {RouteGetRequest} from '@/types/next/request';


type CreateGetRequesterOpts = {
  apiPath: string,
};

export const createGetRequester = <TResponse = never>({
  apiPath,
}: CreateGetRequesterOpts): RouteGetRequest<TResponse> => (
  (params) => fetch(`${apiPath}?${params ?? ''}`)
    .then((response) => response.json() as TResponse)
);
