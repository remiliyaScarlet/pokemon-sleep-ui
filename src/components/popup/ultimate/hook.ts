import React from 'react';

import {useDismiss, useFloating, useInteractions, useRole, useTransitionStyles} from '@floating-ui/react';

import {PopupProps} from '@/components/popup/type';


export const usePopupUltimate = ({show, setShow}: PopupProps) => {
  const data = useFloating({
    open: show,
    onOpenChange: setShow,
  });
  const {context} = data;

  const transitionStyles = useTransitionStyles(context, {
    duration: 300,
  });
  const dismiss = useDismiss(context, {outsidePressEvent: 'mousedown'});
  const role = useRole(context);

  const interactions = useInteractions([dismiss, role]);

  return React.useMemo(
    () => ({
      ...interactions,
      ...data,
      ...transitionStyles,
    }),
    [interactions, data, transitionStyles],
  );
};
