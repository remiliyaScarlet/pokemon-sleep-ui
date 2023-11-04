import React from 'react';

import PencilIcon from '@heroicons/react/24/outline/PencilIcon';
import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import {Session} from 'next-auth';

import {InputRow} from '@/components/input/filter/row';
import {FlexLink} from '@/components/layout/flex/link';
import {isCmsMod} from '@/controller/user/account/common';


type Props = {
  session: Session | null,
  path: string,
};

export const DocsControl = ({session, path}: Props) => {
  if (!isCmsMod(session?.user.id)) {
    return null;
  }

  return (
    <InputRow className="justify-end">
      <FlexLink href="/docs/new" center className="button-clickable-bg relative h-8 w-14">
        <PlusCircleIcon className="h-6 w-6"/>
      </FlexLink>
      <FlexLink href={`/docs/edit/${path}`} center className="button-clickable-bg relative h-8 w-14">
        <PencilIcon className="h-6 w-6"/>
      </FlexLink>
    </InputRow>
  );
};
