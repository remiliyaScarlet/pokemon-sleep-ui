import {NextRequest} from 'next/server';

import {RouteHandler, RouteHandlerPathParams, RouteHandlerPathProps} from '@/types/next/routeHandler';


export const createRouteHandler = <TResponse = never, TParams extends RouteHandlerPathParams = never>(
  handler: RouteHandler<TResponse, TParams>,
) => async (
  request: NextRequest,
  pathProps: RouteHandlerPathProps<TParams>,
): Promise<Response> => {
  const {searchParams} = new URL(request.url);

  return Response.json(await handler({request, searchParams, pathProps}));
};
