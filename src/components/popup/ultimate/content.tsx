import React from 'react';

import {FloatingFocusManager, FloatingOverlay, FloatingPortal, useMergeRefs} from '@floating-ui/react';
import {clsx} from 'clsx';

import {popupOverlayStyle} from '@/components/popup/const';
import {PopupProps} from '@/components/popup/type';
import {usePopupUltimate} from '@/components/popup/ultimate/hook';
import {blurStyle} from '@/styles/classes';


type Props = React.HTMLProps<HTMLDivElement> & PopupProps;

const PopupUltimateContentInternal = ({
  children,
  ...props
}: Props, refExternal: React.ForwardedRef<HTMLDivElement>) => {
  const {
    context,
    refs,
    getFloatingProps,
    isMounted,
    styles,
  } = usePopupUltimate(props);
  const ref = useMergeRefs([refs.setFloating, refExternal]);

  return (
    <FloatingPortal>
      <FloatingOverlay hidden={!context.open && !isMounted} lockScroll style={styles} className={clsx(
        'z-ultimate', blurStyle,
      )}>
        <FloatingFocusManager context={context}>
          <div className={clsx('z-ultimate', popupOverlayStyle)}>
            <div ref={ref} {...getFloatingProps(props)}>
              {children}
            </div>
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
};

export const PopupUltimateContent = React.forwardRef(PopupUltimateContentInternal);
