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

  const info = state.popup.info;
  const {type, data} = info;
  const {
    key,
    generatedAt,
  } = data;

  return (
    <PopupCommon show={state.popup.show} setShow={setPopupShow}>
      <Flex className="gap-1.5">
        {
          type === 'data' &&
          <>
            <ActivationReadonlyField title="User ID" data={data.userId}/>
            <ActivationReadonlyField title="User Email" data={userIdEmailMap[data.userId] ?? '(Unknown)'}/>
          </>
        }
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
              info: {
                ...popup.info,
                ...getUpdated(popup.info.data),
              },
            },
          }))}
          idPrefix="popup"
          status={status}
          onSubmit={(properties) => updateActivation({...info, ...properties})}
        />
        {
          type === 'data' &&
          <>
            <HorizontalSplitter/>
            <Flex direction="row" className="justify-end">
              <ActivationDelete data={data} onDelete={deleteActivation}/>
            </Flex>
          </>
        }
      </Flex>
    </PopupCommon>
  );
};
