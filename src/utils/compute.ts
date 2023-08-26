export function* cartesianIterator<T>(items: T[][]): Generator<T[]> {
  const remainder = items.length > 1 ? cartesianIterator(items.slice(1)) : [[]];

  for (const r of remainder) {
    for (const h of items.at(0)!) {
      yield [h, ...r];
    }
  }
}

// https://stackoverflow.com/a/37580979/11571888
export function* permuteIterator<T>(permutation: T[]): Generator<T[]> {
  const length = permutation.length;
  const c = Array(length).fill(0);
  let i = 1; let k; let p;

  yield permutation.slice();
  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      yield permutation.slice();
    } else {
      c[i] = 0;
      ++i;
    }
  }
}

export function* combineIterator<T>(arr: T[], count: number): Generator<T[]> {
  if (count === 1) {
    for (const a of arr) {
      yield [a];
    }
    return;
  }

  for (let i = 0; i <= arr.length - count; i++) {
    for (const c of combineIterator(arr.slice(i + 1), count - 1)) {
      yield [arr[i], ...c];
    }
  }
}
