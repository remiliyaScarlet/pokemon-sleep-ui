import React from 'react';

import {useUserDataActor} from '@/hooks/userData/actor/main';


export const useAdClickDetector = () => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const isHoveredRef = React.useRef(false);
  const {act} = useUserDataActor({statusNoReset: true});

  const onBlur = React.useCallback(() => {
    if (!isHoveredRef.current || !act) {
      return;
    }

    // If `contentRef` is hovered and blurred without triggering `onMouseLeave`,
    // it's likely that the user clicked into the ads
    act({
      action: 'upload',
      options: {
        type: 'admin.activation.adClick',
      },
    });
  }, []);
  const onPointerEnter = React.useCallback(() => {
    isHoveredRef.current = true;
    contentRef.current?.focus();
  }, []);
  const onMouseLeave = React.useCallback(() => {
    isHoveredRef.current = false;
  }, []);

  return {
    contentRef,
    onBlur,
    onPointerEnter,
    onMouseLeave,
  };
};
