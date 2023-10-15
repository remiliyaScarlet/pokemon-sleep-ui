import React from 'react';

import {Transition} from '@headlessui/react';
import {clsx} from 'clsx';

import {AnimatedSwitchCommonProps} from '@/components/layout/animatedSwitch/type';
import {Grid} from '@/components/layout/grid';


type Props = AnimatedSwitchCommonProps & {
  idx: number,
};

export const AnimatedSwitchContent = ({contents, idx, className}: Props) => {
  const content = contents[idx] as React.ReactNode | undefined;

  if (!content) {
    return null;
  }

  return (
    <Grid className={clsx('grid-areas-inner-div', className)}>
      {contents.map((content, contentIdx) => (
        <Transition
          key={contentIdx}
          show={contentIdx === idx}
          enter="duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-1000"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="overflow-hidden transition-opacity ease-in-out grid-in-inner-div"
        >
          {content}
        </Transition>
      ))}
    </Grid>
  );
};
