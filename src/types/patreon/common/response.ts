export type PatreonResponse<TData, TIncluded extends Array<any> = []> = {
  data: TData,
  included: TIncluded,
};
