import React from 'react';

import {Session} from 'next-auth';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  session: Session,
};

export const UserSettingsAccountInfo = ({session}: Props) => {
  return (
    <Flex direction="col" className="rounded-lg border border-slate-500 p-2">
      {session.user.email}
    </Flex>
  );
};
