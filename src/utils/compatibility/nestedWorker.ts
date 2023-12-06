export const isNestedWorkerSupported = (): boolean => {
  let supports = false;

  try {
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

    new Worker('data:,', testerParent).terminate();
  } catch (e) {
    return false;
  }

  return supports;
};
