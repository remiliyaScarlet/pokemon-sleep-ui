'use client';
import React from 'react';

import PencilIcon from '@heroicons/react/24/outline/PencilIcon';
import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

import {useRouter} from '@/components/i18n';
import {InputRow} from '@/components/input/filter/row';
import {Flex} from '@/components/layout/flex/common';
import {FlexLink} from '@/components/layout/flex/link';
import {PopupCommon} from '@/components/popup/common/main';
import {DocsControlDeleteButton} from '@/components/shared/docs/control/delete';
import {UserActionStatusIcon} from '@/components/shared/userData/statusIcon';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {Locale} from '@/types/next/locale';


type Props = {
  locale: Locale,
  path?: string,
  isCmsMod: boolean,
};

export const DocsControl = ({locale, path, isCmsMod}: Props) => {
  const [show, setShow] = React.useState(false);
  const {push} = useRouter();
  const {actAsync, status} = useUserDataActor();

  if (!actAsync || !isCmsMod) {
    return null;
  }

  return (
    <InputRow className="justify-end">
      {
        path &&
        <>
          <PopupCommon show={show} setShow={setShow}>
            <DocsControlDeleteButton status={status} onClick={async () => {
              const {status} = await actAsync({
                action: 'upload',
                options: {
                  type: 'cms.docs.delete',
                  data: {locale, path},
                },
              });

              if (status === 'completed') {
                push('/docs');
              }
            }}/>
          </PopupCommon>
          <button className="button-alert-bg h-8 w-14 rounded-lg" onClick={() => setShow(true)}>
            <Flex center className="h-6 w-6">
              <UserActionStatusIcon status={status} onWaitingOverride={<TrashIcon/>}/>
            </Flex>
          </button>
        </>
      }
      <FlexLink href="/docs/new" center className="button-clickable-bg h-8 w-14">
        <PlusCircleIcon className="h-6 w-6"/>
      </FlexLink>
      {
        path &&
        <FlexLink href={`/docs/edit/${path}`} center className="button-clickable-bg h-8 w-14">
          <PencilIcon className="h-6 w-6"/>
        </FlexLink>
      }
    </InputRow>
  );
};
