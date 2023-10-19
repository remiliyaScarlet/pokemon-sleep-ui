import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {UserActivationEditor} from '@/ui/admin/activation/editor/main';
import {UserActivationUiCommonProps, UserActivationUiState} from '@/ui/admin/activation/type';
import {UserActivationDelete} from '@/ui/admin/activation/viewer/popup/delete';
import {UserActivationReadonlyField} from '@/ui/admin/activation/viewer/popup/field/readonly';


export const UserActivationPopup = ({userIdEmailMap, control}: UserActivationUiCommonProps) => {
  const {
    state,
    setState,
    setPopupShow,
    status,
    updateActivation,
    deleteActivation,
  } = control;

  const data = state.popup.data;
  const {
    userId,
    key,
    generatedAt,
  } = data;

  return (
    <PopupCommon show={state.popup.show} setShow={setPopupShow}>
      <Flex className="gap-1.5">
        <UserActivationReadonlyField title="User ID" data={userId}/>
        <UserActivationReadonlyField title="User Email" data={userIdEmailMap[userId] ?? '(Unknown)'}/>
        <UserActivationReadonlyField title="Activation Key" data={key}/>
        <Flex className="text-end">
          {`Subscriber since ${generatedAt}`}
        </Flex>
        <HorizontalSplitter/>
        <UserActivationEditor
          data={data}
          setData={(getUpdated) => setState(({popup, ...original}): UserActivationUiState => ({
            ...original,
            popup: {
              ...popup,
              data: {
                ...popup.data,
                ...getUpdated(popup.data),
              },
            },
          }))}
          idPrefix="popup"
          status={status}
          onSubmit={(properties) => updateActivation({...data, ...properties})}
        />
        <HorizontalSplitter/>
        <Flex direction="row" className="justify-end">
          <UserActivationDelete data={data} onDelete={deleteActivation}/>
        </Flex>
      </Flex>
    </PopupCommon>
  );
};
