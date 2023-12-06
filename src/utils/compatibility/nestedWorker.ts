export const isNestedWorkerSupported = (): boolean => {
  let supports = false;

  const testerNested = {
    get name() {
      supports = true;
      return 'nested';
    },
  };

  const testerParent = {
    get name() {
      new Worker('data:,', testerNested).terminate();
      return 'parent';
    },
  };

  try {
    new Worker('data:,', testerParent).terminate();
  } finally {}

  return supports;
};
