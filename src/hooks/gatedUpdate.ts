import React from 'react';


type UseGatedUpdateStateOpts<TState> = {
  initial: TState | (() => TState),
  gateMs: number,
};

export const useGatedUpdateState = <TState = undefined>({
  initial,
  gateMs,
}: UseGatedUpdateStateOpts<TState>) => {
  const [state, setState] = React.useState<TState>(initial);
  const lastUpdated = React.useRef(Date.now());

  return {
    state,
    setState,
    setStateGated: (getUpdated: (original: TState) => TState) => {
      if (Date.now() - lastUpdated.current < gateMs) {
        return;
      }

      setState((original) => getUpdated(original));
      lastUpdated.current = Date.now();
    },
  };
};
