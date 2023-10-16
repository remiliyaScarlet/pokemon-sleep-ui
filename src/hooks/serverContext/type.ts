export type CreateServerContextReturn<T> = {
  get: () => T,
  set: (value: T) => void,
};
