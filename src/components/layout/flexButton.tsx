import React from 'react';

import clsx from 'clsx';

import {LayoutProps} from '@/components/layout/type';
import {getLayoutClassNames} from '@/components/layout/util';


type Props = LayoutProps & {
  direction?: 'row' | 'col',
  wrap?: boolean,
  onClick: () => void,
};

export const FlexButton = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<Props>>(({
  direction = 'row',
  wrap,
  children,
  noFullWidth = true,
  onClick,
  ...props
}, ref) => {
  return (
    <button ref={ref} onClick={onClick} className={clsx(
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
