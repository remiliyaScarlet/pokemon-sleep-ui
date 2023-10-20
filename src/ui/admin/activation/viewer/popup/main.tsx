import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {ActivationEditor} from '@/ui/admin/activation/editor/main';
import {ActivationUiCommonProps, ActivationUiState} from '@/ui/admin/activation/type';
import {ActivationDelete} from '@/ui/admin/activation/viewer/popup/delete';
import {ActivationReadonlyField} from '@/ui/admin/activation/viewer/popup/field/readonly';


export const ActivationPopup = ({userIdEmailMap, control}: ActivationUiCommonProps) => {
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
        <ActivationReadonlyField title="User ID" data={userId}/>
        <ActivationReadonlyField title="User Email" data={userIdEmailMap[userId] ?? '(Unknown)'}/>
        <ActivationReadonlyField title="Activation Key" data={key}/>
        <Flex className="text-end">
          {`Subscriber since ${generatedAt}`}
        </Flex>
        <HorizontalSplitter/>
        <ActivationEditor
          data={data}
          setData={(getUpdated) => setState(({popup, ...original}): ActivationUiState => ({
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
          <ActivationDelete data={data} onDelete={deleteActivation}/>
        </Flex>
      </Flex>
    </PopupCommon>
  );
};
