import React from 'react';

import clsx from 'clsx';

import {LayoutProps} from '@/components/layout/type';
import {getLayoutClassNames} from '@/components/layout/util';


type Props = LayoutProps & {
  onClick: () => void,
  direction?: 'row' | 'col',
  wrap?: boolean,
  disabled?: boolean,
};

export const FlexButton = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<Props>>(({
  onClick,
  direction = 'row',
  wrap,
  disabled,
  children,
  noFullWidth = true,
  ...props
}, ref) => {
  return (
    <button ref={ref} onClick={onClick} disabled={disabled} className={clsx(
      'flex',
      direction === 'row' ? 'flex-row' : 'flex-col',
      wrap && 'flex-wrap',
      getLayoutClassNames({noFullWidth, ...props}),
    )}>
      {children}
    </button>
  );
});
FlexButton.displayName = 'FlexButton';
