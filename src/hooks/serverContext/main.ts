import {cache} from 'react';

import {CreateServerContextReturn} from '@/hooks/serverContext/type';


export const createServerContext = <T>(defaultValue: T): CreateServerContextReturn<T> => {
  const getRef = cache(() => ({current: defaultValue}));

  return {
    get: ()=> getRef().current,
    set: (value) => getRef().current = value,
  };
};
