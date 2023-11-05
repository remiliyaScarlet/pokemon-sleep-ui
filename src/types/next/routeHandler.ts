import {NextRequest} from 'next/server';


export type RouteHandlerPathParams = Record<string, string>;

export type RouteHandlerPathProps<T extends RouteHandlerPathParams> = {
  params: Partial<T> | undefined,
};

export type RouteHandlerOpts<TParams extends RouteHandlerPathParams> = {
  request: NextRequest,
  searchParams: URLSearchParams,
  pathProps: RouteHandlerPathProps<TParams>,
};

export type RouteHandler<
  TResponse,
  TParams extends RouteHandlerPathParams,
> = (opts: RouteHandlerOpts<TParams>) => Promise<TResponse>;
