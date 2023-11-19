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
    setState: (updated: TState) => setState(updated),
    setStateGated: (updated: TState) => {
      if (Date.now() - lastUpdated.current < gateMs) {
        return;
      }

      setState(updated);
      lastUpdated.current = Date.now();
    },
  };
};
