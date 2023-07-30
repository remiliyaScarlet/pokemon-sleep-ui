export type KeysOfType<T, KT> = {
  [K in keyof T]: T[K] extends KT ? K : never
}[keyof T];

export type Indexable = number | string | symbol;

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
