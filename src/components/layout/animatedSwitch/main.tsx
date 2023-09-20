import React from 'react';

import {Transition} from '@headlessui/react';
import {clsx} from 'clsx';

import {Grid} from '@/components/layout/grid';


type Props = {
  contents: React.ReactNode[],
  className?: string,
};

export const AnimatedSwitch = ({contents, className}: Props) => {
  const [showingIdx, setShowingIdx] = React.useState(0);

  const content = contents[showingIdx] as React.ReactNode | undefined;

  React.useEffect(() => {
    const intervalId = setInterval(
      () => {
        setShowingIdx((showingIdx) => (showingIdx + 1) % contents.length);
      },
      5000,
    );

    return () => clearInterval(intervalId);
  }, []);

  if (!content) {
    setShowingIdx(0);
    return <></>;
  }

  return (
    <Grid className={clsx('grid-areas-inner-div', className)}>
      {contents.map((content, contentIdx) => (
        <Transition
          key={contentIdx}
          show={contentIdx === showingIdx}
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
