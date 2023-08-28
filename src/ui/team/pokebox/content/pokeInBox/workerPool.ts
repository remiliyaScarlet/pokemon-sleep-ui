import {Pool as initWorkerPool, spawn, Worker} from 'threads';

import {calculateRatingResultOfLevel} from '@/utils/game/rating';


export const workerPool = initWorkerPool(
  // Can't use `new URL().href` here or the worker loading will fail
  // @ts-ignore
  () => spawn<typeof calculateRatingResultOfLevel>(new Worker(new URL('./worker', import.meta.url))),
  8,
);
