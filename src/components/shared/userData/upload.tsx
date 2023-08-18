import React from 'react';

import {InputRow} from '@/components/input/filter/row';
import {Flex} from '@/components/layout/flex';
import {actionStatusIcon} from '@/components/shared/userData/const';
import {useUserDataActor} from '@/hooks/userData/actor';
import {UserDataUploadOpts} from '@/types/userData/upload';


type Props = {
  opts: UserDataUploadOpts,
};

export const UserDataUploadButton = ({opts}: Props) => {
  const {act, status} = useUserDataActor();

  return (
    <button
      className="enabled:button-clickable-bg disabled:button-disabled relative h-8 w-14"
      disabled={!act || status === 'processing'}
      onClick={() => act ? act({action: 'upload', options: opts}) : undefined}
    >
      <Flex direction="col" center>
        <div className="h-7 w-7">
          {actionStatusIcon[status]}
        </div>
      </Flex>
    </button>
  );
};

export const UserDataUploadControlRow = ({opts}: Props) => {
  return (
    <InputRow>
      <Flex direction="col" className="items-end">
        <UserDataUploadButton opts={opts}/>
      </Flex>
    </InputRow>
  );
};
