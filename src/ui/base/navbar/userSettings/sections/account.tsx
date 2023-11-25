import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {Session} from 'next-auth';

import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Flex} from '@/components/layout/flex/common';


type Props = {
  session: Session,
};

export const UserSettingsAccountInfo = ({session}: Props) => {
  const [show, setShow] = React.useState(false);

  return (
    <Flex className="rounded-lg p-2 shadow-border shadow-slate-500 md:flex-row">
      <button className="button-clickable-bg h-8 w-8 self-center p-1" onClick={() => setShow(!show)}>
        {show ? <EyeSlashIcon/> : <EyeIcon/>}
      </button>
      <AnimatedCollapseQuick show={show}>
        <div>{session.user.email}</div>
        <code className="text-fuchsia-700 dark:text-fuchsia-400">{session.user.id}</code>
      </AnimatedCollapseQuick>
    </Flex>
  );
};
